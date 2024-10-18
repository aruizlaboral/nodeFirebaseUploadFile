// index.js
const express = require('express');
const app = express();
const port = 4000;
const router = require('./router');

app.use('/api', router);

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});