const prisma = require('../db');

const findNotifications = async () => {
  return await prisma.notification.findMany();
};

const findNotificationById = async (id) => {
  return await prisma.notification.findUnique({
    where: { id },
  });
};

const insertNotification = async (userId, notificationData) => {
  return await prisma.notification.create({
    data: {
      user_id: userId,
      title: notificationData.title,
      description: notificationData.description,
    },
  });
};

const deleteNotification = async (id) => {
  await prisma.notification.delete({
    where: { id },
  });
};

const editNotification = async (id, userId, notificationData) => {
  console.log(notificationData);
  const data = {
    user_id: userId,
    title: notificationData.title,
    description: notificationData.description,
  };

  return await prisma.notification.update({
    where: { id },
    data,
  });
};

module.exports = {
  findNotifications,
  findNotificationById,
  insertNotification,
  deleteNotification,
  editNotification,
};
