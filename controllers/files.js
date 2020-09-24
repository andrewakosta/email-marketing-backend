const User = require("../models/User");

exports.uploadFile = (req, res) => {
  const _id = req.params.id;
  let files = [];

  if (req.files.xlsx) {
    req.files.xlsx.forEach((file) => {
      let name = file.path.split("/")[2];

      if (false) {
        //name.split(".")[1].) {To do validar que el archivo sea un archivo ecxel
        return res.status(400).json({ msg: "Only xlsx file are accept" });
      }
      const datafile = {
        originalFilename: file.originalFilename,
        name,
      };
      files.push(datafile);
    });
  }

  const user = {
    files,
  };
  User.findByIdAndUpdate(_id, user, (error, userDB) => {
    if (error) {
      return res
        .status(500)
        .json({ msg: "An error has ocurred while the files were been saved" });
    }
    if (!userDB) {
      return res.status(404).json({ msg: "User not found" });
    } else {
      return res.status(200).json({ userDB });
    }
  });

  //console.log(req.files.xlsx);

  //req.files.xlsx.map((file) => console.log(file.originalFilename));
};
