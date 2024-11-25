const prisma = require('../db');

const findAllHotels = async () => {
  return await prisma.hotel.findMany();
};

const findHotelById = async (id) => {
  idparse = parseInt(id);
  return await prisma.hotel.findUnique({
    where: { id: id },
  });
};

const createHotel = async (data) => {
  return await prisma.hotel.create({
    data,
  });
};

const updateHotel = async (id, data) => {
  return await prisma.hotel.update({
    where: { id },
    data,
  });
};

const deleteHotelById = async (id) => {
  return await prisma.hotel.delete({
    where: { id },
  });
};

module.exports = {
  findAllHotels,
  findHotelById,
  createHotel,
  updateHotel,
  deleteHotelById,
};
