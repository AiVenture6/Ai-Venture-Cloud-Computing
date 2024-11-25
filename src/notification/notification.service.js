const { 
    findNotifications,
    findNotificationById,
    insertNotification,
    deleteNotification,
    editNotification,
 } = require("./notification.model");

const getAllNotifications = async () => {
    const notifications = await findNotifications();
    return notifications;
};

const getNotificationById = async (id) => {
    const notification = await findNotificationById(id);
    if (!notification) {
        throw Error("Notification not found");
    }
    return notification;
};

const createNotification = async (newNotificationData) => {
    const notification = await insertNotification(newNotificationData);
    return notification;
};

const deleteNotificationById = async (id) => {
    await getNotificationById(id);
    await deleteNotification(id);
};

const editNotificationById = async (id, notificationData) => {
    await getNotificationById(id);
    const notification = await editNotification(id, notificationData);
    return notification;    
}

module.exports = {
    getAllNotifications,
    getNotificationById,
    createNotification,
    deleteNotificationById,
    editNotificationById,
};