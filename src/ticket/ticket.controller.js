const express = require("express");
const {
    getAllTickets,
    getTicketById,
    createTicket,
    deleteTicketById,
    editTicketById,
} = require("./ticket.service");

const { userAuthMiddleware } = require('../utils/auth.middleware');
const router = express.Router();
router.use(userAuthMiddleware);

router.get("/", async (req, res) => {
    const tickets = await getAllTickets();
    res.send(tickets);
});

router.get("/:id", async (req, res) => {
    try {
        const ticketId = parseInt(req.params.id);
        const ticket = await getTicketById(parseInt(ticketId));
        res.send(ticket);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

router.post("/", async (req, res) => {
    try {
        const newTicketData = req.body;
        const ticket = await createTicket(newTicketData);
        res.send({
            data: ticket,
            message: "create ticket success",
        });
    } catch (error) {
        res.status(400).send(error.message);
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const ticketId = req.params.id;
        await deleteTicketById(parseInt(ticketId));
        res.send("ticket deleted")
    } catch (error) {
        res.status(400).send(error.message);
    }
});

router.put("/:id", async (req, res) => {
    const ticketId = req.params.id;
    const ticketData = req.body;

    if (!(
        ticketData.id &&
        ticketData.user_id &&
        ticketData.place_id &&
        ticketData.quantity &&
        ticketData.checkin
    )) {
        return res.status(400).send("some fields are missing");
    }

    const ticket = await editTicketById(parseInt(ticketId), ticketData);
    res.send({
        data: ticket,
        message: "edit ticket success",
    });
});

router.patch("/:id", async (req, res) => {
    try {
        const ticketId = req.params.id;
        const ticketData = req.body;

        const ticket = await editTicketById(parseInt(ticketId), ticketData);
        res.send({
            data: ticket,
            message: "edit ticket success"
        });
    } catch (error) {
        res.status(400).send(error.message)
    }
});

module.exports = router;

