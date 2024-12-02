const { Storage } = require('@google-cloud/storage');

// Inisialisasi Storage dengan otomatis membaca kredensial dari `GOOGLE_APPLICATION_CREDENTIALS`.
const storage = new Storage();
const bucketName = 'aiventure_model_ml';
const folderName = 'scans';

const uploadImageToGCS = async (file, fileName) => {
  const bucket = storage.bucket(bucketName);

  const filePath = `${folderName}/${fileName}`;
  const blob = bucket.file(filePath);

  const stream = blob.createWriteStream({
    resumable: false,
    contentType: file.mimetype,
  });

  return new Promise((resolve, reject) => {
    stream.on('finish', async () => {
      resolve(`https://storage.googleapis.com/${bucketName}/${filePath}`);
    });
    stream.on('error', reject);
    stream.end(file.buffer);
  });
};

module.exports = { uploadImageToGCS };
