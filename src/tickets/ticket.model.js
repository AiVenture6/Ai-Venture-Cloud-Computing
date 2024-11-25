const prisma = require('../db');

const findTickets = async () => {
  return await prisma.placeTicket.findMany();
};

const findTicketById = async (id) => {
  return await prisma.placeTicket.findUnique({
    where: { id },
  });
};

const insertTicket = async ({ user_id, place_id, quantity, checkin }) => {
  const checkinDate = new Date(checkin);
  return await prisma.placeTicket.create({
    data: { user_id, place_id, quantity, checkin: checkinDate },
  });
};

const deleteTicket = async (id) => {
  return await prisma.placeTicket.delete({
    where: { id },
  });
};

const editTicket = async (id, ticketData) => {
  const checkinDate = new Date(ticketData.checkin);
  return await prisma.placeTicket.update({
    where: { id },
    data: {
      user_id: ticketData.user_id,
      place_id: ticketData.place_id,
      quantity: ticketData.quantity,
      checkin: checkinDate,
    },
  });
};

module.exports = {
  findTickets,
  findTicketById,
  insertTicket,
  deleteTicket,
  editTicket,
};
