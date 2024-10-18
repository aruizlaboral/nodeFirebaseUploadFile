// router.js
const express = require('express');
const router = express.Router();
const upload = require('./upload');
const uploadController = require('./controller');

router.post('/upload', upload.single('file'), uploadController.uploadFile);

module.exports = router;