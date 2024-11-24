const express = require('express');
const {
  addScan,
  getScansByUser,
  getScanById,
  removeScan,
} = require('../scans/scan.service');
const { userAuthMiddleware } = require('../utils/auth.middleware');

const router = express.Router();
router.use(userAuthMiddleware);
router.post('/', async (req, res) => {
  try {
    const userId = req.user.id;
    const { image, cluster } = req.body;
    const result = await addScan(userId, image, cluster);
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const userId = req.user.id;
    const scans = await getScansByUser(userId);
    res.json({ scans });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const scan = await getScanById(Number(id));
    res.json({ scan });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await removeScan(Number(id));
    res.json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
