const {
    findAllRestaurants,
    findRestaurantById,
    createRestaurant,
    updateRestaurant,
    deleteRestaurantById,
} = require('../restaurants/restaurant.model');

const getAllRestaurants = async () => {
    return await findAllRestaurants();
};

const getRestaurantById = async (id) => {
    const restaurant = await findRestaurantById(id);
    if (!restaurant) {
        throw new Error('Restaurant not found');
    }
    return restaurant;
};

const addRestaurant = async (data) => {
    const { name, description, address, phoneNumber } = data;
    if (!name || !description || !address || !phoneNumber) {
        throw new Error('All fields are required');
    }
    return await createRestaurant({ name, description, address, phoneNumber });
};

const updatedRestaurant = async (id, data) => {
    const restaurant = await findRestaurantById(id);
    if (!restaurant) {
        throw new Error('Restaurant not found');
    }
    return await updateRestaurant(id, data);
};

const deleteRestaurant = async (id) => {
    const restaurant = await findRestaurantById(id);
    if (!restaurant) {
        throw new Error('Restaurant not found');
    }
    await deleteRestaurantById(id);
};

module.exports = {
    getAllRestaurants,
    getRestaurantById,
    addRestaurant,
    updatedRestaurant,
    deleteRestaurant,
};