const prisma = require("../db");

const findPlaces = async () => {
    const places = await prisma.places.findMany();
    return places;
};

const findPlaceById = async (id) => {
    const place = await prisma.places.findUnique({
        where: {
            id
        },
    });
    return place;
};

const insertPlace = async (placeData) => {
    const place = await prisma.places.create({
        data: {
            id: placeData.id,
            name: placeData.name,
            description: placeData.description,
            category: placeData.category,
            price_range: placeData.price_range,
            rating: placeData.rating,
            coordinate: placeData.coordinate,
            city: placeData.city,
        },
    });
    return place;
};

const deletePlace = async (id) => {
   await prisma.places.delete({
    where: {
        id,
    },
   }); 
};

const editPlace = async (id, placeData) => {
    const place = await prisma.places.update({
        where: {
            id: parseInt(id),
        },
        data: {
            id: placeData.id,
            name: placeData.name,
            description: placeData.description,
            category: placeData.category,
            price_range: placeData.price_range,
            rating: placeData.rating,
            coordinate: placeData.coordinate,
            city: placeData.city,
        },
    });
    return place;
};

module.exports = {
    findPlaces,
    findPlaceById,
    insertPlace,
    deletePlace,
    editPlace,

};