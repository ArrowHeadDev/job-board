const util = require("util");
const path = require("path");
const multer = require("multer");

var storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, path.join(`${__dirname}/../../upload`));
  },
  filename: (req, file, callback) => {
    const allowedTypes = ["image/png", "image/jpeg", "image/gif", "application/pdf"];

    if (!allowedTypes.includes(file.mimetype)) {
      var message = `${file.originalname} only pdf/png/gif and jpeg are allowed!`;
      return callback(message, null);
    }

    var filename = `${Date.now()}-${file.originalname}`;
    callback(null, filename);
  }
});

var uploadFiles = multer({ storage: storage, limits : {
  fileSize: 1000000 // 1000000 -> 1MB
}}).array("files", 2);

var uploadFilesMiddleware = util.promisify(uploadFiles);
module.exports = uploadFilesMiddleware;