const {
  createPlace,
  getPlaceById,
  updatePlace,
  deletePlace,
  getAllPlaces,
} = require('./place.model');

const createPlaceService = async (data) => {
  try {
    const newPlace = await createPlace(data);
    return newPlace;
  } catch (error) {
    throw new Error(`Error creating place: ${error.message}`);
  }
};

const getPlaceByIdService = async (id) => {
  try {
    const place = await getPlaceById(id);
    if (!place) throw new Error('Place not found');
    return place;
  } catch (error) {
    throw new Error(`Error fetching place: ${error.message}`);
  }
};

const updatePlaceService = async (id, data) => {
  try {
    const updatedPlace = await updatePlace(id, data);
    return updatedPlace;
  } catch (error) {
    throw new Error(`Error updating place: ${error.message}`);
  }
};

const deletePlaceService = async (id) => {
  try {
    const deletedPlace = await deletePlace(id);
    return deletedPlace;
  } catch (error) {
    throw new Error(`Error deleting place: ${error.message}`);
  }
};

const getAllPlacesService = async () => {
  try {
    const places = await getAllPlaces();
    return places;
  } catch (error) {
    throw new Error(`Error fetching places: ${error.message}`);
  }
};

module.exports = {
  createPlaceService,
  getPlaceByIdService,
  updatePlaceService,
  deletePlaceService,
  getAllPlacesService,
};
