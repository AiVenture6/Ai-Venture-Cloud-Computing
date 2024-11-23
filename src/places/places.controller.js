const express = require("express");
const {
    getAllPlaces,
    getPlaceById,
    createPlace,
    deletePlaceById,
    editPlaceById,
} = require("./places.service");

const router = express.Router();

router.get("/", async (req, res) => {
    const places = await getAllPlaces();
    res.send(places);
});

router.get("/:id", async (req, res) => {
    try {
        const placeId = parseInt(req.params.id);
        const place = await getPlaceById(parseInt(placeId));
        res.send(place);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

router.post("/", async (req, res) => {
    try {
        const newPlaceData = req.body;
        const place = await createPlace(newPlaceData);
        res.send({
            data: place,
            message: "create place success",
        });
    } catch (error) {
        res.status(400).send(error.message);
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const placeId = req.params.id;
        await deletePlaceById(parseInt(placeId));
        res.send("place deleted")
    } catch (error) {
        res.status(400).send(error.message);
    }
});

router.put("/:id", async (req, res) => {
    const placeId = req.params.id;
    const placeData = req.body;

    if (!(
        placeData.id &&
        placeData.name &&
        placeData.description &&
        placeData.category &&
        placeData.price_range &&
        placeData.rating &&
        placeData.coordinate &&
        placeData.city
    )) {
        return res.status(400).send("some fields are missing");
    }

    const place = await editPlaceById(parseInt(placeId), placeData);
    res.send({
        data: place,
        message: "edit place success",
    });
});

router.patch("/:id", async (req, res) => {
    try {
        const placeId = req.params.id;
        const placeData = req.body;

        const place = await editPlaceById(parseInt(placeId), placeData);
        res.send({
            data: place,
            message: "edit place success"
        });
    } catch (error) {
        res.status(400).send(error.message)
    }
});

module.exports = router;

