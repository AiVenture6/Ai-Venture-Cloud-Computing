const express = require("express");
const {
    getAllNotifications,
    getNotificationById,
    createNotification,
    deleteNotificationById,
    editNotificationById,
} = require("./notification.service");

const { userAuthMiddleware } = require('../utils/auth.middleware');
const router = express.Router();
router.use(userAuthMiddleware);

router.get("/", async (req, res) => {
    const notifications = await getAllNotifications();
    res.send(notifications);
});

router.get("/:id", async (req, res) => {
    try {
        const notificationId = parseInt(req.params.id);
        const notification = await getNotificationById(parseInt(notificationId));
        res.send(notification);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

router.post("/", async (req, res) => {
    try {
        const newnotificationData = req.body;
        const notification = await createNotification(newnotificationData);
        res.send({
            data: notification,
            message: "create notification success",
        });
    } catch (error) {
        res.status(400).send(error.message);
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const notificationId = req.params.id;
        await deleteNotificationById(parseInt(notificationId));
        res.send("notification deleted")
    } catch (error) {
        res.status(400).send(error.message);
    }
});

router.put("/:id", async (req, res) => {
    const notificationId = req.params.id;
    const notificationData = req.body;

    if (!(
        notificationData.id &&
        notificationData.user_id &&
        notificationData.title &&
        notificationData.description
    )) {
        return res.status(400).send("some fields are missing");
    }

    const notification = await editNotificationById(parseInt(notificationId), notificationData);
    res.send({
        data: notification,
        message: "edit notification success",
    });
});

router.patch("/:id", async (req, res) => {
    try {
        const notificationId = req.params.id;
        const notificationData = req.body;

        const notification = await editNotificationById(parseInt(notificationId), notificationData);
        res.send({
            data: notification,
            message: "edit notification success"
        });
    } catch (error) {
        res.status(400).send(error.message)
    }
});

module.exports = router;

