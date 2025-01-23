const multer = require("multer");
const path = require("path");

module.exports = multer({
  storage: multer.diskStorage({}),
  fileFilter: (req, file, cb) => {
    // Get the file extension and convert to lowercase to ensure case-insensitive matching
    let ext = path.extname(file.originalname).toLowerCase();
    
    // Define an array of allowed image extensions
    const allowedExtensions = [
      '.jpg', 
      '.jpeg', 
      '.png', 
      '.gif', 
      '.webp', 
      '.bmp', 
      '.tiff'
    ];

    // Check if the file extension is in the allowed list
    if (allowedExtensions.includes(ext)) {
      // Accept the file
      cb(null, true);
    } else {
      // Reject the file with an error
      cb(new Error("File type is not supported"), false);
    }
  },
});
