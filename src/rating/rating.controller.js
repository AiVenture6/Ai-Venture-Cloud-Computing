const express = require('express');
const {
  getPlaceRatingsService,
  getRestaurantRatingsService,
  getHotelRatingsService,
  createPlaceRatingService,
  createRestaurantRatingService,
  createHotelRatingService,
  updatePlaceRatingService,
  updateRestaurantRatingService,
  updateHotelRatingService,
  deletePlaceRatingService,
  deleteRestaurantRatingService,
  deleteHotelRatingService,
} = require('./rating.service');
const { userAuthMiddleware } = require('../utils/auth.middleware');

const router = express.Router();

router.use(userAuthMiddleware);

router.get('/place/:placeId/ratings', async (req, res) => {
  const { placeId } = req.params;
  try {
    const ratings = await getPlaceRatingsService(parseInt(placeId));
    res.status(200).json(ratings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/restaurant/:restaurantId/ratings', async (req, res) => {
  const { restaurantId } = req.params;
  try {
    const ratings = await getRestaurantRatingsService(parseInt(restaurantId));
    res.status(200).json(ratings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/hotel/:hotelId/rating', async (req, res) => {
  const { hotelId } = req.params;
  try {
    const ratings = await getHotelRatingsService(parseInt(hotelId));
    res.status(200).json(ratings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/place/:placeId/rating', async (req, res) => {
  const { rating, review } = req.body;
  const userId = req.user.id;
  const { placeId } = req.params;
  try {
    const newRating = await createPlaceRatingService({
      userId,
      placeId: parseInt(placeId),
      rating,
      review,
    });
    res
      .status(201)
      .json({ message: 'Rating created successfully', rating: newRating });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/restaurant/:restaurantId/rating', async (req, res) => {
  const { rating, review } = req.body;
  const userId = req.user.id;
  const { restaurantId } = req.params;
  try {
    const newRating = await createRestaurantRatingService({
      userId,
      restaurantId: parseInt(restaurantId),
      rating,
      review,
    });
    res
      .status(201)
      .json({ message: 'Rating created successfully', rating: newRating });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/hotel/:hotelId/rating', async (req, res) => {
  const { rating, review } = req.body;
  const userId = req.user.id;
  const { hotelId } = req.params;
  try {
    const newRating = await createHotelRatingService({
      userId,
      hotelId: parseInt(hotelId),
      rating,
      review,
    });
    res
      .status(201)
      .json({ message: 'Rating created successfully', rating: newRating });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put('/place/:placeId/rating', async (req, res) => {
  const { rating, review } = req.body;
  const userId = req.user.id;
  const { placeId } = req.params;
  try {
    const updatedRating = await updatePlaceRatingService({
      userId,
      placeId: parseInt(placeId),
      rating,
      review,
    });
    res.json({ message: 'Rating updated successfully', rating: updatedRating });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put('/restaurant/:restaurantId/rating', async (req, res) => {
  const { rating, review } = req.body;
  const userId = req.user.id;
  const { restaurantId } = req.params;
  console.log(userId, restaurantId, rating, review);
  try {
    const updatedRating = await updateRestaurantRatingService({
      userId,
      restaurantId: parseInt(restaurantId),
      rating,
      review,
    });
    console.log(updatedRating);
    res.json({ message: 'Rating updated successfully', rating: updatedRating });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put('/hotel/:hotelId/rating', async (req, res) => {
  const { rating, review } = req.body;
  const userId = req.user.id;
  const { hotelId } = req.params;
  try {
    const updatedRating = await updateHotelRatingService({
      userId,
      hotelId: parseInt(hotelId),
      rating,
      review,
    });
    res.json({ message: 'Rating updated successfully', rating: updatedRating });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete('/place/:placeId/rating/:userId', async (req, res) => {
  const { userId, placeId } = req.params;
  try {
    await deletePlaceRatingService(parseInt(userId), parseInt(placeId));
    res.json({ message: 'Rating deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete('/restaurant/:restaurantId/rating/:userId', async (req, res) => {
  const { userId, restaurantId } = req.params;
  try {
    await deleteRestaurantRatingService(
      parseInt(userId),
      parseInt(restaurantId)
    );
    res.json({ message: 'Rating deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete('/hotel/:hotelId/rating/:userId', async (req, res) => {
  const { userId, hotelId } = req.params;
  try {
    await deleteHotelRatingService(parseInt(userId), parseInt(hotelId));
    res.json({ message: 'Rating deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
