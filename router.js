const express = require('express');
const router = express.Router();
const upload = require('./upload');
const uploadController = require('./uploadController');
const userController = require('./userController');

router.post('/upload', upload.single('file'), uploadController.uploadFile, userController.updateUserUrl);

module.exports = router;