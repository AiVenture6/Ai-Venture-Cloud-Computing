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

const getHotelRatings = (hotelId) => {
  return prisma.hotelRating.findMany({
    where: { hotel_id: hotelId },
    include: { user: true },
  });
};

const createPlaceRating = (userId) => {
  return prisma.placeRating.create({
    data: {
      user_id: userId.userId,
      restaurant_id: userId.restaurantId,
      rating: userId.rating,
      review: userId.review,
    },
  });
};

const createRestaurantRating = (userId) => {
  return prisma.restaurantRating.create({
    data: {
      user_id: userId.userId,
      restaurant_id: userId.restaurantId,
      rating: userId.rating,
      review: userId.review,
    },
  });
};

const createHotelRating = (data) => {
  return prisma.hotelRating.create({
    data: {
      user_id: data.userId,
      hotel_id: data.hotelId,
      rating: data.rating,
      review: data.review,
    },
  });
};

const updatePlaceRating = (userId, placeId, rating, review) => {
  return prisma.placeRating.updateMany({
    where: { user_id: userId, place_id: placeId },
    data: { rating, review },
  });
};

const updateRestaurantRating = async ({
  userId,
  restaurantId,
  rating,
  review,
}) => {
  return prisma.restaurantRating.update({
    where: {
      user_id: userId.id,
      restaurant_id: restaurantId,
    },
    data: {
      rating,
      review,
    },
  });
};

const updateHotelRating = ({ userId, hotelId, rating, review }) => {
  return prisma.hotelRating.updateMany({
    where: { user_id: userId, hotel_id: hotelId },
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

const deleteHotelRating = (userId, hotelId) => {
  return prisma.hotelRating.deleteMany({
    where: { user_id: userId, hotel_id: hotelId },
  });
};

module.exports = {
  getPlaceRatings,
  getRestaurantRatings,
  getHotelRatings,
  createPlaceRating,
  createRestaurantRating,
  createHotelRating,
  updatePlaceRating,
  updateRestaurantRating,
  updateHotelRating,
  deletePlaceRating,
  deleteRestaurantRating,
  deleteHotelRating,
};
