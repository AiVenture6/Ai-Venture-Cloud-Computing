const prisma = require('../db');

const findUserByEmail = async (email) => {
  return prisma.user.findUnique({ where: { email } });
};

const findUserById = async (id) => {
  return prisma.user.findUnique({ where: { id } });
};

const createUser = async (data) => {
  return prisma.user.create({ data });
};

const updateUserData = async (id, updates) => {
  return prisma.user.update({ where: { id }, data: updates });
};

const updateUserOtp = async (userId, otp, otpExpiry) => {
  await prisma.user.update({
    where: { id: userId },
    data: { otp, otp_expiry: otpExpiry },
  });
};

const updateUserVerificationStatus = async (userId, isVerified) => {
  await prisma.user.update({
    where: { id: userId },
    data: { isOtpVerified: isVerified },
  });
};

module.exports = {
  findUserByEmail,
  findUserById,
  createUser,
  updateUserData,
  updateUserOtp,
  updateUserVerificationStatus,
};
