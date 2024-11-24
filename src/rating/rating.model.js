const prisma = require('../db');

const getPlaceRatings = (placeId) => {
  return prisma.placeRating.findMany({
    where: { place_id: placeId },
    include: { user: true },
  });
};

const getRestaurantRatings = (restaurantId) => {
  return prisma.restaurantRating.findMany({
    where: { restaurant_id: restaurantId },
    include: { user: true },
  });
};

const createPlaceRating = (userId, placeId, rating, review) => {
  return prisma.placeRating.create({
    data: { user_id: userId, place_id: placeId, rating, review },
  });
};

const createRestaurantRating = (userId, restaurantId, rating, review) => {
  return prisma.restaurantRating.create({
    data: { user_id: userId, restaurant_id: restaurantId, rating, review },
  });
};

const updatePlaceRating = (userId, placeId, rating, review) => {
  return prisma.placeRating.updateMany({
    where: { user_id: userId, place_id: placeId },
    data: { rating, review },
  });
};

const updateRestaurantRating = (userId, restaurantId, rating, review) => {
  return prisma.restaurantRating.updateMany({
    where: { user_id: userId, restaurant_id: restaurantId },
    data: { rating, review },
  });
};

const deletePlaceRating = (userId, placeId) => {
  return prisma.placeRating.deleteMany({
    where: { user_id: userId, place_id: placeId },
  });
};

const deleteRestaurantRating = (userId, restaurantId) => {
  return prisma.restaurantRating.deleteMany({
    where: { user_id: userId, restaurant_id: restaurantId },
  });
};

module.exports = {
  getPlaceRatings,
  getRestaurantRatings,
  createPlaceRating,
  createRestaurantRating,
  updatePlaceRating,
  updateRestaurantRating,
  deletePlaceRating,
  deleteRestaurantRating,
};
