const multer = require("multer");
const upload = require("../middleware/uploadFilesMiddleware");

const fileUpload = async (req, res) => {
  try {
    await upload(req, res);
    console.log(req.files);

    if (req.files.length <= 0) {
      return res.send(`You must select a file to upload.`);
    }

    let fileFullPath1 = req.files[0].path
    let fileFullPath2 = req.files[1].path

    if(req.files.length > 1){
      if(fileFullPath1.charAt(2) != ":"){
        let linuxFileName1 = fileFullPath1.substr(fileFullPath1.lastIndexOf("/") + 1);
        let linuxFilePath1 = `/upload/${linuxFileName1}`;

        let linuxFileName2 = fileFullPath2.substr(fileFullPath2.lastIndexOf("/") + 1);
        let linuxFilePath2 = `/upload/${linuxFileName2}`;
  
        return res.status(200).send({message: "Files succesfully uploaded", filePath1: linuxFilePath1, filePath2: linuxFilePath2 });
      }
    }
  
      let windowsFileName = fileFullPath1.substr(fileFullPath1.lastIndexOf("\\") + 1);
      let fileWindowsPath = `/upload/${windowsFileName}`;

      return res.status(200).send({message: "Files succesfully uploaded", filePath: fileWindowsPath});
      
  } catch (err) {
    console.log(err);


      if (err.field == "files") {
        return res.send("Wrong extension or too many files uploaded");
      } else {
        return res.send("Field name needs to be 'files' in the form data");
      }
  
};
}

module.exports = {
    fileUpload: fileUpload
};

