const express = require('express');
const {
  getAllNotifications,
  getNotificationById,
  createNotification,
  deleteNotificationById,
  editNotificationById,
} = require('./notification.service');

const { userAuthMiddleware } = require('../utils/auth.middleware');
const router = express.Router();
router.use(userAuthMiddleware);

router.get('/', async (req, res) => {
  try {
    const notifications = await getAllNotifications();
    res.json({
      message: 'Notifications retrieved successfully',
      data: notifications,
    });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const notificationId = parseInt(req.params.id, 10);
    const notification = await getNotificationById(notificationId);
    res.json({
      message: 'Notification retrieved successfully',
      data: notification,
    });
  } catch (error) {
    res.status(404).json({ status: 'error', message: error.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const userId = req.user.id;
    const newNotificationData = req.body;
    const notification = await createNotification(userId, newNotificationData);
    res.status(201).json({
      message: 'Notification created successfully',
      data: notification,
    });
  } catch (error) {
    res.status(400).json({ status: 'error', message: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const notificationId = parseInt(req.params.id, 10);
    await deleteNotificationById(notificationId);
    res.json({
      message: 'Notification deleted successfully',
    });
  } catch (error) {
    res.status(400).json({ status: 'error', message: error.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const userId = req.user.id;
    const notificationId = parseInt(req.params.id, 10);
    const notificationData = req.body;
    console.log(notificationId, notificationData);
    const notification = await editNotificationById(
      notificationId,
      userId,
      notificationData
    );
    res.json({
      message: 'Notification updated successfully',
      data: notification,
    });
  } catch (error) {
    res.status(400).json({ status: 'error', message: error.message });
  }
});

module.exports = router;
