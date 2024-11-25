const prisma = require("../db");

const findTickets = async () => {
    const tickets = await prisma.placeTicket.findMany();
    return tickets;
};

const findTicketById = async (id) => {
    const ticket = await prisma.placeTicket.findUnique({
        where: {
            id
        },
    });
    return ticket;
};

const insertTicket = async (ticketData) => {
    const ticket = await prisma.placeTicket.create({
        data: {
            id: ticketData.id,
            user_id: ticketData.user_id,
            place_id: ticketData.place_id,
            quantity: ticketData.quantity,
            checkin: ticketData.checkin,
        },
    });
    return ticket;
};

const deleteTicket = async (id) => {
   await prisma.placeTicket.delete({
    where: {
        id,
    },
   }); 
};

const editTicket = async (id, ticketData) => {
    const ticket = await prisma.placeTicket.update({
        where: {
            id: parseInt(id),
        },
        data: {
            id: ticketData.id,
            user_id: ticketData.user_id,
            place_id: ticketData.place_id,
            quantity: ticketData.quantity,
            checkin: ticketData.checkin,
        },
    });
    return ticket;
};

module.exports = {
    findTickets,
    findTicketById,
    insertTicket,
    deleteTicket,
    editTicket,

};