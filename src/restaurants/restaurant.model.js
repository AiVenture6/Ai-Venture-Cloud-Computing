const prisma = require('../db');

const findAllRestaurants = async () => {
  return await prisma.restaurant.findMany();
};

const findRestaurantById = async (id) => {
  return await prisma.restaurant.findUnique({
    where: { id },
  });
};

const createRestaurant = async (data) => {
  return await prisma.restaurant.create({
    data,
  });
};

const updateRestaurant = async (id, data) => {
  return await prisma.restaurant.update({
    where: { id },
    data,
  });
};

const deleteRestaurantById = async (id) => {
  return await prisma.restaurant.delete({
    where: { id },
  });
};

module.exports = {
  findAllRestaurants,
  findRestaurantById,
  createRestaurant,
  updateRestaurant,
  deleteRestaurantById,
};
