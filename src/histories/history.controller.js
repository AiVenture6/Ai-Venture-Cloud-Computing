const express = require('express');
const {
  getAllHistories,
  getHistoryById,
  createHistory,
  deleteHistoryById,
  editHistoryById,
} = require('./history.service');

const { userAuthMiddleware } = require('../utils/auth.middleware');
const router = express.Router();
router.use(userAuthMiddleware);

router.get('/', async (req, res) => {
  try {
    const userId = req.user.id;
    const histories = await getAllHistories(userId);
    res.send({
      message: 'Fetch histories success',
      data: histories,
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const historyId = parseInt(req.params.id);
    const userId = req.user.id;
    const history = await getHistoryById(historyId, userId);
    res.send({
      message: 'Fetch history success',
      data: history,
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.post('/', async (req, res) => {
  try {
    const userId = req.user.id;
    const historyData = req.body;
    const newHistory = await createHistory({ user_id: userId, ...historyData });
    res.send({
      message: 'Create history success',
      data: newHistory,
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const historyId = parseInt(req.params.id);
    const userId = req.user.id;
    await deleteHistoryById(historyId, userId);
    res.send({
      message: 'Delete history success',
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.put('/:id', async (req, res) => {
  try {
    const historyId = parseInt(req.params.id);
    const userId = req.user.id;
    const historyData = req.body;
    const updatedHistory = await editHistoryById(
      historyId,
      userId,
      historyData
    );
    res.send({
      message: 'Update history success',
      data: updatedHistory,
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router;
