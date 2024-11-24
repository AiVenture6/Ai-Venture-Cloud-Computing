const {
  createScan,
  findScansByUserId,
  findScanById,
  deleteScan,
} = require('../scans/scan.model');

const addScan = async (userId, image, cluster) => {
  try {
    const scanData = { user_id: userId, image, cluster };
    const newScan = await createScan(scanData);
    return {
      message: 'Scan successfully created',
      scan: newScan,
    };
  } catch (error) {
    throw new Error('Failed to create scan: ' + error.message);
  }
};

const getScansByUser = async (userId) => {
  try {
    const scans = await findScansByUserId(userId);
    if (scans.length === 0) throw new Error('No scans found for this user');
    return scans;
  } catch (error) {
    throw new Error('Failed to retrieve scans: ' + error.message);
  }
};

const getScanById = async (id) => {
  try {
    const scan = await findScanById(id);
    if (!scan) throw new Error('Scan not found');
    return scan;
  } catch (error) {
    throw new Error('Failed to retrieve scan: ' + error.message);
  }
};

const removeScan = async (id) => {
  try {
    await deleteScan(id);
    return { message: 'Scan successfully deleted' };
  } catch (error) {
    throw new Error('Failed to delete scan: ' + error.message);
  }
};

module.exports = {
  addScan,
  getScansByUser,
  getScanById,
  removeScan,
};
