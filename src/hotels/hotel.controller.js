const express = require('express');
const {
  getAllHotels,
  getHotelById,
  addHotel,
  updatedHotel,
  deleteHotel,
} = require('../hotels/hotel.service');
const { userAuthMiddleware } = require('../utils/auth.middleware');

const router = express.Router();

router.use(userAuthMiddleware);

router.get('/', async (req, res) => {
  try {
    const hotels = await getAllHotels();
    res.status(200).json(hotels);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const id = req.params;
    const idNew = parseInt(id.id);
    const hotel = await getHotelById(idNew);
    res.status(200).json(hotel);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const hotel = await addHotel(req.body);
    res.status(201).json({ message: 'Hotel created successfully', data: hotel});
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const id = req.params;
    const idNew = parseInt(id.id);
    const hotel = await updatedHotel(idNew, req.body);
    res.status(200).json({ message: 'Hotel updated successfully', data: hotel });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const id  = req.params;
    const idNew = parseInt(id.id);
    await deleteHotel(idNew);
    res.status(204).send();
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

module.exports = router;
