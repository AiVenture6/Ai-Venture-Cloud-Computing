const express = require('express');
const {
  getAllTickets,
  getTicketById,
  createTicket,
  deleteTicketById,
  editTicketById,
} = require('./ticket.service');

const { userAuthMiddleware } = require('../utils/auth.middleware');
const router = express.Router();
router.use(userAuthMiddleware);

router.get('/', async (req, res) => {
  try {
    const tickets = await getAllTickets();
    res.status(200).json(tickets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/:id', async (req, res) => {
  const ticketId = parseInt(req.params.id, 10); // Getting ID from params
  try {
    const ticket = await getTicketById(ticketId);
    res.status(200).json(ticket);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

router.post('/', async (req, res) => {
  const user_id = req.user.id;
  const { place_id, quantity, checkin } = req.body;
  try {
    const ticket = await createTicket({ user_id, place_id, quantity, checkin });
    res.status(201).json({
      message: 'Ticket created successfully',
      data: ticket,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  const ticketId = parseInt(req.params.id, 10);
  try {
    await deleteTicketById(ticketId);
    res.status(200).json({ message: 'Ticket deleted successfully' });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

router.put('/:id', async (req, res) => {
  const ticketId = parseInt(req.params.id, 10);
  const { user_id, place_id, quantity, checkin } = req.body;
  try {
    const updatedTicket = await editTicketById(ticketId, {
      user_id,
      place_id,
      quantity,
      checkin,
    });
    res.status(200).json({
      message: 'Ticket updated successfully',
      data: updatedTicket,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.patch('/:id', async (req, res) => {
  const ticketId = parseInt(req.params.id, 10);
  const ticketData = req.body;
  try {
    const updatedTicket = await editTicketById(ticketId, ticketData);
    res.status(200).json({
      message: 'Ticket partially updated successfully',
      data: updatedTicket,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
