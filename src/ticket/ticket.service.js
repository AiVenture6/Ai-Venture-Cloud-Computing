const { 
    findTickets,
    findTicketById,
    insertTicket,
    deleteTicket,
    editTicket,
 } = require("./ticket.model");

const getAllTickets = async () => {
    const tickets = await findTickets();
    return tickets;
};

const getTicketById = async (id) => {
    const ticket = await findTicketById(id);
    if (!ticket) {
        throw Error("Ticket not found");
    }
    return ticket;
};

const createTicket = async (newTicketData) => {
    const ticket = await insertTicket(newTicketData);
    return ticket;
};

const deleteTicketById = async (id) => {
    await getTicketById(id);
    await deleteTicket(id);
};

const editTicketById = async (id, ticketData) => {
    await getTicketById(id);
    const ticket = await editTicket(id, ticketData);
    return ticket;    
}

module.exports = {
    getAllTickets,
    getTicketById,
    createTicket,
    deleteTicketById,
    editTicketById,
};