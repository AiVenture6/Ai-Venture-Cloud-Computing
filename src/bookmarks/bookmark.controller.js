const express = require("express");
const {
    getAllBookmarks,
    getBookmarkById,
    createBookmark,
    deleteBookmarkById,
    editBookmarkById,
} = require("./bookmark.service");

const { userAuthMiddleware } = require('../utils/auth.middleware');
const router = express.Router();
router.use(userAuthMiddleware);


router.get("/", async (req, res) => {
    const bookmarks = await getAllBookmarks();
    res.send(bookmarks);
});

router.get("/:id", async (req, res) => {
    try {
        const bookmarkId = parseInt(req.params.id);
        const bookmark = await getBookmarkById(parseInt(bookmarkId));
        res.send(bookmark);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

router.post("/", async (req, res) => {
    try {
        const newBookmarkData = req.body;
        const bookmark = await createBookmark(newBookmarkData);
        res.send({
            data: bookmark,
            message: "create bookmark success",
        });
    } catch (error) {
        res.status(400).send(error.message);
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const bookmarkId = req.params.id;
        await deleteBookmarkById(parseInt(bookmarkId));
        res.send("bookmark deleted")
    } catch (error) {
        res.status(400).send(error.message);
    }
});

router.put("/:id", async (req, res) => {
    const bookmarkId = req.params.id;
    const bookmarkData = req.body;

    if (!(
        bookmarkData.id &&
        bookmarkData.user_id &&
        bookmarkData.hotel_id &&
        bookmarkData.restaurant_id &&
        bookmarkData.place_id
    )) {
        return res.status(400).send("some fields are missing");
    }

    const bookmark = await editBookmarkById(parseInt(bookmarkId), bookmarkData);
    res.send({
        data: bookmark,
        message: "edit bookmark success",
    });
});

router.patch("/:id", async (req, res) => {
    try {
        const bookmarkId = req.params.id;
        const bookmarkData = req.body;

        const bookmark = await editBookmarkById(parseInt(bookmarkId), bookmarkData);
        res.send({
            data: bookmark,
            message: "edit bookmark success"
        });
    } catch (error) {
        res.status(400).send(error.message)
    }
});

module.exports = router;

