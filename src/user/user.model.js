const prisma = require('../db');

const findUserByEmail = async (email) => {
  return await prisma.user.findUnique({
    where: { email },
  });
};

const createUser = async (userData) => {
  return await prisma.user.create({
    data: {
      google_id: userData.google_id || null,
      email: userData.email,
      name: userData.name,
      password: userData.password || 'googleuser',
      picture: userData.picture || null,
    },
  });
};

const findUserById = async (id) => {
  return await prisma.user.findUnique({
    where: { id },
  });
};

const updateUserData = async (userId, updatedData) => {
  return await prisma.user.update({
    where: { id: userId },
    data: updatedData,
  });
};

const deleteUser = async (userId) => {
  return await prisma.user.delete({
    where: { id: userId },
  });
};

module.exports = {
  findUserByEmail,
  createUser,
  findUserById,
  updateUserData,
  deleteUser,
};
