const express = require('express');
const {
  addScan,
  getScansByUser,
  getScanById,
  removeScan,
} = require('../scans/scan.service');
const { uploadImageToGCS } = require('../utils/cloud.storage');
const { userAuthMiddleware } = require('../utils/auth.middleware');
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });

const router = express.Router();
router.use(userAuthMiddleware);

router.post('/', upload.single('image'), async (req, res) => {
  try {
    const userId = req.user.id;
    const cluster = parseInt(req.body.cluster, 10);
    const file = req.file;

    if (!file) {
      return res.status(400).json({ message: 'No image file provided.' });
    }

    const fileName = `${Date.now()}_${file.originalname}`;
    const imageUrl = await uploadImageToGCS(file, fileName);
    const result = await addScan(userId, imageUrl, cluster);

    res.status(201).json(result);
  } catch (error) {
    console.error('Error during scan upload:', error);
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
