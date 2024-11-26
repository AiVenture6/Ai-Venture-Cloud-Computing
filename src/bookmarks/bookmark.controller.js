const express = require('express');
const {
  getAllBookmarks,
  getBookmarkById,
  createBookmark,
  deleteBookmarkById,
  editBookmarkById,
} = require('./bookmark.service');

const { userAuthMiddleware } = require('../utils/auth.middleware');
const router = express.Router();
router.use(userAuthMiddleware);

router.get('/', async (req, res) => {
  try {
    const bookmarks = await getAllBookmarks();
    res.send(bookmarks);
  } catch (error) {
    res.status(500).send(error.message); // Internal server error
  }
});

router.get('/:id', async (req, res) => {
  try {
    const bookmarkId = parseInt(req.params.id, 10);
    const bookmark = await getBookmarkById(bookmarkId);
    res.send(bookmark);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.post('/', async (req, res) => {
  try {
    const userId = req.user.id;
    const { hotel_id, restaurant_id, place_id } = req.body;
    if (!hotel_id && !restaurant_id && !place_id) {
      return res
        .status(400)
        .send(
          'At least one of hotel_id, restaurant_id, or place_id is required.'
        );
    }
    const newBookmarkData = {
      user_id: userId,
      hotel_id,
      restaurant_id,
      place_id,
    };
    const bookmark = await createBookmark(newBookmarkData);
    res.send({
      message: 'Create bookmark success',
      data: bookmark,
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const bookmarkId = parseInt(req.params.id, 10);
    await deleteBookmarkById(bookmarkId);
    res.send('Bookmark deleted');
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.put('/:id', async (req, res) => {
  try {
    const bookmarkId = parseInt(req.params.id, 10);
    const userId = req.user.id;
    const { hotel_id, restaurant_id, place_id } = req.body;
    if (!hotel_id && !restaurant_id && !place_id) {
      return res
        .status(400)
        .send(
          'At least one of hotel_id, restaurant_id, or place_id is required.'
        );
    }
    const bookmarkData = {
      id: bookmarkId,
      user_id: userId,
      hotel_id,
      restaurant_id,
      place_id,
    };
    const updatedBookmark = await editBookmarkById(bookmarkData);
    res.send({
      message: 'Edit bookmark success',
      data: updatedBookmark,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send(error.message);
  }
});

module.exports = router;
