const prisma = require("../db");

const findBookmarks = async () => {
    const bookmarks = await prisma.bookmark.findMany();
    return bookmarks;
};

const findBookmarkById = async (id) => {
    const bookmark = await prisma.bookmark.findUnique({
        where: {
            id
        },
    });
    return bookmark;
};

const insertBookmark = async (bookmarkData) => {
    const bookmark = await prisma.bookmark.create({
        data: {
            id: bookmarkData.id,
            user_id: bookmarkData.user_id,
            hotel_id: bookmarkData.hotel_id,
            restaurant_id: bookmarkData.restaurant_id,
            place_id: bookmarkData.place_id,
        },
    });
    return bookmark;
};

const deleteBookmark = async (id) => {
   await prisma.bookmark.delete({
    where: {
        id,
    },
   }); 
};

const editBookmark = async (id, bookmarkData) => {
    const bookmark = await prisma.bookmark.update({
        where: {
            id: parseInt(id),
        },
        data: {
            id: bookmarkData.id,
            user_id: bookmarkData.user_id,
            hotel_id: bookmarkData.hotel_id,
            restaurant_id: bookmarkData.restaurant_id,
            place_id: bookmarkData.place_id,
        },
    });
    return bookmark;
};

module.exports = {
    findBookmarks,
    findBookmarkById,
    insertBookmark,
    deleteBookmark,
    editBookmark,

};