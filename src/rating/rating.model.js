const prisma = require("../db");

const findRatings = async () => {
    const ratings = await prisma.rating.findMany();
    return ratings;
};

const findRatingById = async (id) => {
    const rating = await prisma.rating.findUnique({
        where: {
            id
        },
    });
    return rating;
};

const insertRating = async (ratingData) => {
    const rating = await prisma.rating.create({
        data: {
            id: ratingData.id,
            user_id: ratingData.user_id,
            place_id: ratingData.place_id,
            rating: ratingData.rating,
            review: ratingData.review,
        },
    });
    return rating;
};

const deleteRating = async (id) => {
   await prisma.rating.delete({
    where: {
        id,
    },
   }); 
};

const editRating = async (id, ratingData) => {
    const rating = await prisma.rating.update({
        where: {
            id: parseInt(id),
        },
        data: {
            id: ratingData.id,
            user_id: ratingData.user_id,
            place_id: ratingData.place_id,
            rating: ratingData.rating,
            review: ratingData.review,
        },
    });
    return rating;
};

module.exports = {
    findRatings,
    findRatingById,
    insertRating,
    deleteRating,
    editRating,

};