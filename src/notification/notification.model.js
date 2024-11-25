const prisma = require("../db");

const findNotifications = async () => {
    const notifications = await prisma.notification.findMany();
    return notifications;
};

const findNotificationById = async (id) => {
    const notification = await prisma.notification.findUnique({
        where: {
            id
        },
    });
    return notification;
};

const insertNotification = async (notificationData) => {
    const notification = await prisma.notification.create({
        data: {
            id: notificationData.id,
            user_id: notificationData.user_id,
            title: notificationData.title,
            description: notificationData.description
        },
    });
    return notification;
};

const deleteNotification = async (id) => {
   await prisma.notification.delete({
    where: {
        id,
    },
   }); 
};

const editNotification = async (id, notificationData) => {
    const notification = await prisma.notification.update({
        where: {
            id: parseInt(id),
        },
        data: {
            id: notificationData.id,
            user_id: notificationData.user_id,
            title: notificationData.title,
            description: notificationData.description
        },
    });
    return notification;
};

module.exports = {
    findNotifications,
    findNotificationById,
    insertNotification,
    deleteNotification,
    editNotification,

};