const express = require('express');
const {
  getAllRestaurants,
  getRestaurantById,
  addRestaurant,
  updatedRestaurant,
  deleteRestaurant,
} = require('../restaurants/restaurant.service');
const { userAuthMiddleware } = require('../utils/auth.middleware');

const router = express.Router();

router.use(userAuthMiddleware);

router.get('/', async (req, res) => {
  try {
    const restaurants = await getAllRestaurants();
    res.status(200).json(restaurants);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const restaurant = await getRestaurantById(id);
    res.status(200).json(restaurant);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const restaurant = await addRestaurant(req.body);
    res.status(201).json(restaurant);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const restaurant = await updatedRestaurant(id, req.body);
    res.status(200).json(restaurant);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await deleteRestaurant(id);
    res.status(204).send();
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

module.exports = router;
