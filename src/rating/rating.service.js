const { 
    findRatings,
    findRatingById,
    insertRating,
    deleteRating,
    editRating,
 } = require("./rating.model");

const getAllRatings = async () => {
    const ratings = await findRatings();
    return ratings;
};

const getRatingById = async (id) => {
    const rating = await findRatingById(id);
    if (!rating) {
        throw Error("Rating not found");
    }
    return rating;
};

const createRating = async (newratingData) => {
    const rating = await insertRating(newratingData);
    return rating;
};

const deleteRatingById = async (id) => {
    await getRatingById(id);
    await deleteRating(id);
};

const editRatingById = async (id, ratingData) => {
    await getRatingById(id);
    const rating = await editRating(id, ratingData);
    return rating;    
}

module.exports = {
    getAllRatings,
    getRatingById,
    createRating,
    deleteRatingById,
    editRatingById,
};