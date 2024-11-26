const prisma = require('../db');

const findHistories = async (userId) => {
  const histories = await prisma.history.findMany({
    where: { user_id: userId },
    orderBy: { visited_at: 'desc' },
  });
  return histories;
};

const findHistoryById = async (id, userId) => {
  const history = await prisma.history.findFirst({
    where: { id, user_id: userId },
  });
  return history;
};

const insertHistory = async (historyData) => {
  const newHistory = await prisma.history.create({
    data: {
      user_id: historyData.user_id,
      place_id: historyData.place_id || null,
      hotel_id: historyData.hotel_id || null,
      restaurant_id: historyData.restaurant_id || null,
      visited_at: historyData.visited_at || new Date(),
    },
  });
  return newHistory;
};

const deleteHistory = async (id) => {
  await prisma.history.delete({
    where: { id },
  });
};

const editHistory = async (id, historyData) => {
  const updatedHistory = await prisma.history.update({
    where: { id },
    data: {
      hotel_id: historyData.hotel_id || null,
      restaurant_id: historyData.restaurant_id || null,
      visited_at: historyData.visited_at || new Date(),
    },
  });
  return updatedHistory;
};

module.exports = {
  findHistories,
  findHistoryById,
  insertHistory,
  deleteHistory,
  editHistory,
};
