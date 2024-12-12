const prisma = require('../db');

const findAllHotels = async () => {
  return await prisma.hotel.findMany();
};

const findHotelById = async (id) => {
  return await prisma.hotel.findUnique({
    where: { id: parseInt(id) },
  });
};

const createHotel = async (data) => {
  return await prisma.hotel.create({
    data,
  });
};

const updateHotel = async (id, data) => {
  return await prisma.hotel.update({
    where: { id: parseInt(id) },
    data,
  });
};

const deleteHotelById = async (id) => {
  return await prisma.hotel.delete({
    where: { id: parseInt(id) },
  });
};

module.exports = {
  findAllHotels,
  findHotelById,
  createHotel,
  updateHotel,
  deleteHotelById,
};
