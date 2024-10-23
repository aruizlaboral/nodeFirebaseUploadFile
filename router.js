const express = require('express');
const router = express.Router();
const upload = require('./upload');
const userController = require('./userController');

router.post('/upload', upload.single('file'), userController.updateUserUrl);

module.exports = router;