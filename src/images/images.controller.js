const express = require('express');
const {
  getAllImages,
  getImageById,
  createImage,
  deleteImageById,
  editImageById,
} = require('./images.service');

const { userAuthMiddleware } = require('../utils/auth.middleware');
const router = express.Router();
router.use(userAuthMiddleware);

router.get('/', async (req, res) => {
  const images = await getAllImages();
  res.send(images);
});

router.get('/:id', async (req, res) => {
  try {
    const imageId = parseInt(req.params.id);
    const image = await getImageById(parseInt(imageId));
    res.send(image);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.post('/', async (req, res) => {
  try {
    const newImageData = req.body;
    const image = await createImage(newImageData);
    res.send({
      data: image,
      message: 'create image success',
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const imageId = req.params.id;
    await deleteImageById(parseInt(imageId));
    res.send('image deleted');
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.put('/:id', async (req, res) => {
  const imageId = req.params.id;
  const imageData = req.body;

  if (!(imageData.place_id && imageData.url && imageData.cluster)) {
    return res.status(400).send('some fields are missing');
  }

  const image = await editImageById(parseInt(imageId), imageData);
  res.send({
    data: image,
    message: 'edit image success',
  });
});

router.patch('/:id', async (req, res) => {
  try {
    const imageId = req.params.id;
    const imageData = req.body;

    const image = await editImageById(parseInt(imageId), imageData);
    res.send({
      data: image,
      message: 'edit image success',
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router;
