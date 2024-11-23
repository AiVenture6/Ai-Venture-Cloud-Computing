const { 
    findPlaces,
    findPlaceById,
    insertPlace,
    deletePlace,
    editPlace,
 } = require("./places.model");

const getAllPlaces = async () => {
    const places = await findPlaces();
    return places;
};

const getPlaceById = async (id) => {
    const place = await findPlaceById(id);
    if (!place) {
        throw Error("Place not found");
    }
    return place;
};

const createPlace = async (newplaceData) => {
    const place = await insertPlace(newplaceData);
    return place;
};

const deletePlaceById = async (id) => {
    await getPlaceById(id);
    await deletePlace(id);
};

const editPlaceById = async (id, placeData) => {
    await getPlaceById(id);
    const place = await editPlace(id, placeData);
    return place;    
}

module.exports = {
    getAllPlaces,
    getPlaceById,
    createPlace,
    deletePlaceById,
    editPlaceById,
};