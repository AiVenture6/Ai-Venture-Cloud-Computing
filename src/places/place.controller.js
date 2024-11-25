const express = require('express');
const {
  createPlaceService,
  getPlaceByIdService,
  updatePlaceService,
  deletePlaceService,
  getAllPlacesService,
} = require('./place.service');
const { userAuthMiddleware } = require('../utils/auth.middleware');

const router = express.Router();
router.use(userAuthMiddleware);

router.post('/', async (req, res) => {
  try {
    const newPlace = await createPlaceService(req.body);
    res.status(201).json({
      message: 'Place created successfully',
      place: newPlace,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const place = await getPlaceByIdService(req.params.id);
    res.status(200).json(place);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const updatedPlace = await updatePlaceService(req.params.id, req.body);
    res.status(200).json({
      message: 'Place updated successfully',
      place: updatedPlace,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await deletePlaceService(req.params.id);
    res.status(200).json({
      message: 'Place deleted successfully',
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const places = await getAllPlacesService();
    res.status(200).json(places);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
