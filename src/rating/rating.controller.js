const express = require("express");
const {
    getAllRatings,
    getRatingById,
    createRating,
    deleteRatingById,
    editRatingById,
} = require("./rating.service");

const router = express.Router();

router.get("/", async (req, res) => {
    const ratings = await getAllRatings();
    res.send(ratings);
});

router.get("/:id", async (req, res) => {
    try {
        const ratingId = parseInt(req.params.id);
        const rating = await getRatingById(parseInt(ratingId));
        res.send(rating);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

router.post("/", async (req, res) => {
    try {
        const newRatingData = req.body;
        const rating = await createRating(newRatingData);
        res.send({
            data: rating,
            message: "create rating success",
        });
    } catch (error) {
        res.status(400).send(error.message);
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const ratingId = req.params.id;
        await deleteRatingById(parseInt(ratingId));
        res.send("rating deleted")
    } catch (error) {
        res.status(400).send(error.message);
    }
});

router.put("/:id", async (req, res) => {
    const ratingId = req.params.id;
    const ratingData = req.body;

    if (!(
        ratingData.id &&
        ratingData.user_id &&
        ratingData.place_id &&
        ratingData.rating &&
        ratingData.review
    )) {
        return res.status(400).send("some fields are missing");
    }

    const rating = await editRatingById(parseInt(ratingId), ratingData);
    res.send({
        data: rating,
        message: "edit rating success",
    });
});

router.patch("/:id", async (req, res) => {
    try {
        const ratingId = req.params.id;
        const ratingData = req.body;

        const rating = await editRatingById(parseInt(ratingId), ratingData);
        res.send({
            data: rating,
            message: "edit rating success"
        });
    } catch (error) {
        res.status(400).send(error.message)
    }
});

module.exports = router;

