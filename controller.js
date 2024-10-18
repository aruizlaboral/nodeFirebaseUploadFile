// controller.js
const bucket = require('./firebase-config').bucket;
const { v4: uuidv4 } = require('uuid');
const User = require('./users');

exports.uploadFile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send('No se proporcionó ningún archivo.');
    }

    const file = req.file;
    const fileName = `${uuidv4()}_${file.originalname}`;
    const fileUpload = bucket.file(fileName);

    const blobStream = fileUpload.createWriteStream({
      metadata: {
        contentType: file.mimetype,
      },
    });

    blobStream.on('error', (error) => {
      console.error('Error al subir el archivo:', error);
      res.status(500).send('Error al subir el archivo.');
    });

    blobStream.on('finish', async () => {
      await fileUpload.makePublic();
      const publicUrl = `https://storage.googleapis.com/${bucket.name}/${fileName}`;

      // agregando valor a propiedad de Objeto User
      const user = new User();
      user.image = publicUrl;

      res.status(200).send({ 
        success: true,
        message: 'se guardo  correctamente la imagen',
        image: user.image
    });
    });

    blobStream.end(file.buffer);
  } catch (error) {
    console.error('Error en la ruta de subida:', error);
    res.status(500).send('Error interno del servidor.');
  }
};
