const { 
    findImages,
    findImageById,
    insertImage,
    deleteImage,
    editImage,
 } = require("./images.model");

const getAllImages = async () => {
    const images = await findImages();
    return images;
};

const getImageById = async (id) => {
    const image = await findImageById(id);
    if (!image) {
        throw Error("Image not found");
    }
    return image;
};

const createImage = async (newImageData) => {
    const image = await insertImage(newImageData);
    return image;
};

const deleteImageById = async (id) => {
    await getImageById(id);
    await deleteImage(id);
};

const editImageById = async (id, imageData) => {
    await getImageById(id);
    const image = await editImage(id, imageData);
    return image;    
}

module.exports = {
    getAllImages,
    getImageById,
    createImage,
    deleteImageById,
    editImageById,
};