const {
  findHistories,
  findHistoryById,
  insertHistory,
  deleteHistory,
  editHistory,
} = require('./history.model');

const getAllHistories = async (userId) => {
  const histories = await findHistories(userId);
  return histories;
};

const getHistoryById = async (id, userId) => {
  const history = await findHistoryById(id, userId);
  if (!history) {
    throw Error('History not found');
  }
  return history;
};

const createHistory = async (historyData) => {
  const newHistory = await insertHistory(historyData);
  return newHistory;
};

const deleteHistoryById = async (id, userId) => {
  const history = await getHistoryById(id, userId);
  if (!history) {
    throw Error('History not found or unauthorized');
  }
  await deleteHistory(id);
};

const editHistoryById = async (id, userId, historyData) => {
  const history = await getHistoryById(id, userId);
  if (!history) {
    throw Error('History not found or unauthorized');
  }
  const updatedHistory = await editHistory(id, historyData);
  return updatedHistory;
};

module.exports = {
  getAllHistories,
  getHistoryById,
  createHistory,
  deleteHistoryById,
  editHistoryById,
};
