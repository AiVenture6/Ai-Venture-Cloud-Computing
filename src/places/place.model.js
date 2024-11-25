const prisma = require('../db');

const createPlace = async (data) => {
  return await prisma.places.create({
    data: {
      name: data.name,
      description: data.description,
      category: data.category,
      city: data.city,
      price_range: data.price_range,
      coordinate: data.coordinate,
    },
  });
};

const getPlaceById = async (id) => {
  return await prisma.places.findUnique({
    where: {
      id: parseInt(id),
    },
    include: {
      ratings: true,
      images: true,
    },
  });
};

const updatePlace = async (id, data) => {
  return await prisma.places.update({
    where: {
      id: parseInt(id),
    },
    data: {
      name: data.name,
      description: data.description,
      category: data.category,
      city: data.city,
      price_range: data.price_range,
      coordinate: data.coordinate,
    },
  });
};

const deletePlace = async (id) => {
  return await prisma.places.delete({
    where: {
      id: parseInt(id),
    },
  });
};

const getAllPlaces = async () => {
  return await prisma.places.findMany();
};

module.exports = {
  createPlace,
  getPlaceById,
  updatePlace,
  deletePlace,
  getAllPlaces,
};
