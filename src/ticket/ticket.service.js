const {
  findTickets,
  findTicketById,
  insertTicket,
  deleteTicket,
  editTicket,
} = require('./ticket.model');

const getAllTickets = async () => {
  return await findTickets();
};

const getTicketById = async (id) => {
  const ticket = await findTicketById(id);
  if (!ticket) {
    throw new Error('Ticket not found');
  }
  return ticket;
};

const createTicket = async (newTicketData) => {
  return await insertTicket(newTicketData);
};

const deleteTicketById = async (id) => {
  const ticket = await getTicketById(id); // Verify ticket exists
  await deleteTicket(id);
};

const editTicketById = async (id, ticketData) => {
  const ticket = await getTicketById(id); // Verify ticket exists
  return await editTicket(id, ticketData);
};

module.exports = {
  getAllTickets,
  getTicketById,
  createTicket,
  deleteTicketById,
  editTicketById,
};
