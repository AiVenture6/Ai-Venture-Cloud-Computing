const {
  findNotifications,
  findNotificationById,
  insertNotification,
  deleteNotification,
  editNotification,
} = require('./notification.model');

const getAllNotifications = async () => {
  return await findNotifications();
};

const getNotificationById = async (id) => {
  const notification = await findNotificationById(id);
  if (!notification) {
    throw new Error('Notification not found');
  }
  return notification;
};

const createNotification = async (userId, newNotificationData) => {
  return await insertNotification(userId, newNotificationData);
};

const deleteNotificationById = async (id) => {
  const notification = await getNotificationById(id);
  if (!notification) {
    throw new Error('Notification not found');
  }
  await deleteNotification(id);
};

const editNotificationById = async (id, userId, notificationData) => {
  const notification = await getNotificationById(id);
  if (!notification) {
    throw new Error('Notification not found');
  }
  return await editNotification(id, userId, notificationData);
};

module.exports = {
  getAllNotifications,
  getNotificationById,
  createNotification,
  deleteNotificationById,
  editNotificationById,
};
