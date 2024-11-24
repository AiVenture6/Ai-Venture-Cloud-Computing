const {
  getPlaceRatings,
  getRestaurantRatings,
  createPlaceRating,
  createRestaurantRating,
  updatePlaceRating,
  updateRestaurantRating,
  deletePlaceRating,
  deleteRestaurantRating,
} = require('./rating.model');

const getPlaceRatingsService = async (placeId) => {
  try {
    return await getPlaceRatings(placeId);
  } catch (error) {
    throw new Error('Error fetching place ratings');
  }
};

const getRestaurantRatingsService = async (restaurantId) => {
  try {
    return await getRestaurantRatings(restaurantId);
  } catch (error) {
    throw new Error('Error fetching restaurant ratings');
  }
};

const createPlaceRatingService = async (userId, placeId, rating, review) => {
  try {
    return await createPlaceRating(userId, placeId, rating, review);
  } catch (error) {
    throw new Error('Error creating place rating');
  }
};

const createRestaurantRatingService = async (
  userId,
  restaurantId,
  rating,
  review
) => {
  try {
    return await createRestaurantRating(userId, restaurantId, rating, review);
  } catch (error) {
    throw new Error('Error creating restaurant rating');
  }
};

const updatePlaceRatingService = async (userId, placeId, rating, review) => {
  try {
    return await updatePlaceRating(userId, placeId, rating, review);
  } catch (error) {
    throw new Error('Error updating place rating');
  }
};

const updateRestaurantRatingService = async (
  userId,
  restaurantId,
  rating,
  review
) => {
  try {
    return await updateRestaurantRating(userId, restaurantId, rating, review);
  } catch (error) {
    throw new Error('Error updating restaurant rating');
  }
};

const deletePlaceRatingService = async (userId, placeId) => {
  try {
    return await deletePlaceRating(userId, placeId);
  } catch (error) {
    throw new Error('Error deleting place rating');
  }
};

const deleteRestaurantRatingService = async (userId, restaurantId) => {
  try {
    return await deleteRestaurantRating(userId, restaurantId);
  } catch (error) {
    throw new Error('Error deleting restaurant rating');
  }
};

module.exports = {
  getPlaceRatingsService,
  getRestaurantRatingsService,
  createPlaceRatingService,
  createRestaurantRatingService,
  updatePlaceRatingService,
  updateRestaurantRatingService,
  deletePlaceRatingService,
  deleteRestaurantRatingService,
};
