const prisma = require("../db");

const findImages = async () => {
    const images = await prisma.image.findMany();
    return images;
};

const findImageById = async (id) => {
    const image = await prisma.image.findUnique({
        where: {
            id
        },
    });
    return image;
};

const insertImage = async (imageData) => {
    const image = await prisma.image.create({
        data: {
            place_id: imageData.place_id,
            url: imageData.url,
            cluster: imageData.cluster
        },
    });
    return image;
};

const deleteImage = async (id) => {
   await prisma.image.delete({
    where: {
        id,
    },
   }); 
};

const editImage = async (id, imageData) => {
    const image = await prisma.image.update({
        where: {
            id: parseInt(id),
        },
        data: {
            place_id: imageData.place_id,
            url: imageData.url,
            cluster: imageData.cluster,
        },
    });
    return image;
};

module.exports = {
    findImages,
    findImageById,
    insertImage,
    deleteImage,
    editImage,

};