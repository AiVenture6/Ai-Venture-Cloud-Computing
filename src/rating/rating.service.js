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
    throw new Error(`Error fetching place ratings: ${error.message}`);
  }
};

const getRestaurantRatingsService = async (restaurantId) => {
  try {
    return await getRestaurantRatings(restaurantId);
  } catch (error) {
    throw new Error(`Error fetching restaurant ratings: ${error.message}`);
  }
};

const createPlaceRatingService = async (userId, placeId, rating, review) => {
  try {
    const existingRating = await getPlaceRatings(placeId);
    if (existingRating) {
      throw new Error(
        'You have already rated this place.'
      );
    }
    return await createPlaceRating(userId, placeId, rating, review);
  } catch (error) {
    throw new Error(`Error creating place rating: ${error.message}`);
  }
};

const createRestaurantRatingService = async (
  userId,
  restaurantId,
  rating,
  review
) => {
  try {
    const existingRating = await getRestaurantRatingsService(restaurantId);
    if (existingRating) {
      throw new Error(
        'You have already rated this restaurant.'
      );
    }
    return await createRestaurantRating(userId, restaurantId, rating, review);
  } catch (error) {
    throw new Error(`Error creating restaurant rating: ${error.message}`);
  }
};

const updatePlaceRatingService = async (userId, placeId, rating, review) => {
  try {
    return await updatePlaceRating(userId, placeId, rating, review);
  } catch (error) {
    throw new Error(`Error updating place rating: ${error.message}`);
  }
};

const updateRestaurantRatingService = async (userId, restaurantId, rating, review) => {
  try {
    return await updateRestaurantRating(userId, restaurantId, rating, review);
  } catch (error) {
    throw new Error(`Error updating restaurant rating: ${error.message}`);
  }
};

const deletePlaceRatingService = async (userId, placeId) => {
  try {
    return await deletePlaceRating(userId, placeId);
  } catch (error) {
    throw new Error(`Error deleting place rating: ${error.message}`);
  }
};

const deleteRestaurantRatingService = async (userId, restaurantId) => {
  try {
    return await deleteRestaurantRating(userId, restaurantId);
  } catch (error) {
    throw new Error(`Error deleting restaurant rating: ${error.message}`);
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
