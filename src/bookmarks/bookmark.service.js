const { bookmark } = require('../db');
const {
  findBookmarks,
  findBookmarkById,
  insertBookmark,
  deleteBookmark,
  editBookmark,
} = require('./bookmark.model');

const getAllBookmarks = async () => {
  const bookmarks = await findBookmarks();
  return bookmarks;
};

const getBookmarkById = async (id) => {
  const bookmark = await findBookmarkById(id);
  if (!bookmark) {
    throw new Error('Bookmark not found');
  }
  return bookmark;
};

const createBookmark = async (bookmarkData) => {
  if (!bookmarkData || !bookmarkData.user_id) {
    throw new Error('Bookmark data must include user_id.');
  }
  const bookmark = await insertBookmark(bookmarkData);
  return bookmark;
};

const deleteBookmarkById = async (id) => {
  await getBookmarkById(id);
  await deleteBookmark(id);
};

const editBookmarkById = async (bookmarkData) => {
  idBookmark = await getBookmarkById(bookmarkData.id);
  if (!bookmarkData || !bookmarkData.user_id) {
    throw new Error('Bookmark data must include user.');
  }
  const updatedBookmark = await editBookmark(idBookmark.id, bookmarkData);
  return updatedBookmark;
};

module.exports = {
  getAllBookmarks,
  getBookmarkById,
  createBookmark,
  deleteBookmarkById,
  editBookmarkById,
};
