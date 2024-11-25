const {
    findAllHotels,
    findHotelById,
    createHotel,
    updateHotel,
    deleteHotelById,
} = require('../hotels/hotel.model');

const getAllHotels = async () => {
    return await findAllHotels();
};

const getHotelById = async (id) => {
    const hotel = await findHotelById(id);
    if (!hotel) {
        throw new Error('Hotel not found');
    }
    return hotel;
};

const addHotel = async (data) => {
    const { name, description, city, price, sales, location, distance, image } = data;
    if (!name || !description || !city || !price || !sales || !location || !distance || !image ) {
        throw new Error('All fields are required');
    }
    return await createHotel({ name, description, city, price, sales, location, distance, image });
};

const updatedHotel = async (id, data) => {
    const hotel = await findHotelById(id);
    if (!hotel) {
        throw new Error('Hotel not found');
    }
    return await updateHotel(id, data);
};

const deleteHotel = async (id) => {
    const hotel = await findHotelById(id);
    if (!hotel) {
        throw new Error('Hotel not found');
    }
    await deleteHotelById(id);
};

module.exports = {
    getAllHotels,
    getHotelById,
    addHotel,
    updatedHotel,
    deleteHotel,
};
