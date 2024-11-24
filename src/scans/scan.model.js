const prisma = require('../db');

const createScan = async (data) => {
  return await prisma.scan.create({ data });
};

const findScansByUserId = async (userId) => {
  return await prisma.scan.findMany({
    where: { user_id: userId },
    orderBy: { createdAt: 'desc' },
  });
};

const findScanById = async (id) => {
  return await prisma.scan.findUnique({
    where: { id },
  });
};

const deleteScan = async (id) => {
  return await prisma.scan.delete({
    where: { id },
  });
};

module.exports = {
  createScan,
  findScansByUserId,
  findScanById,
  deleteScan,
};
