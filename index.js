// Importar dependencias
const express = require('express');
const multer = require('multer');
const firebaseAdmin = require('firebase-admin');
const { v4: uuidv4 } = require('uuid');
const path = require('path');

// Inicializar la aplicación Firebase
firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(require('./delivery-b9284-firebase.json')),
  storageBucket: 'delivery-b9284.appspot.com'
});



const bucket = firebaseAdmin.storage().bucket();

// Configurar multer para manejar las subidas de archivos
const upload = multer({
  storage: multer.memoryStorage(),
});

// Configurar Express
const app = express();
const port = 4000;

// Crear la ruta para subir archivos
app.post('/upload', upload.single('file'), async (req, res) => {
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
      // Se hace público el archivo si lo necesitas así
      await fileUpload.makePublic();
      const publicUrl = `https://storage.googleapis.com/${bucket.name}/${fileName}`;
      res.status(200).send({ publicUrl });
    });

    blobStream.end(file.buffer);
  } catch (error) {
    console.error('Error en la ruta de subida:', error);
    res.status(500).send('Error interno del servidor.');
  }
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});

// Configuración de Firebase (firebase-config.js)
// Incluye la configuración del bucket de Firebase en tu archivo JSON (serviceAccountKey.json). Asegúrate de tener los permisos adecuados.
