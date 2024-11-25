const { 
    findBookmarks,
    findBookmarkById,
    insertBookmark,
    deleteBookmark,
    editBookmark,
 } = require("./bookmark.model");

const getAllBookmarks = async () => {
    const bookmarks = await findBookmarks();
    return bookmarks;
};

const getBookmarkById = async (id) => {
    const bookmark = await findBookmarkById(id);
    if (!bookmark) {
        throw Error("Bookmark not found");
    }
    return bookmark;
};

const createBookmark = async (newBookmarkData) => {
    const bookmark = await insertBookmark(newBookmarkData);
    return bookmark;
};

const deleteBookmarkById = async (id) => {
    await getBookmarkById(id);
    await deleteBookmark(id);
};

const editBookmarkById = async (id, bookmarkData) => {
    await getBookmarkById(id);
    const bookmark = await editBookmark(id, bookmarkData);
    return bookmark;    
}

module.exports = {
    getAllBookmarks,
    getBookmarkById,
    createBookmark,
    deleteBookmarkById,
    editBookmarkById,
};