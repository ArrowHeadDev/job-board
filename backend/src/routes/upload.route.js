const express = require("express");
const router = express.Router();
const handler = require('../middleware/handle.middleware');
const uploadController = require("../controllers/upload.controller");

router.post("/upload", handler(uploadController.fileUpload))

module.exports = router;