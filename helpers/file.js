const fs = require("fs");

//Delete a file
exports.removeFile = (path) => {
  try {
    fs.unlinkSync(path);
    return true;
  } catch (error) {
    console.log("Maldita sea un error");
    return false;
  }
};
