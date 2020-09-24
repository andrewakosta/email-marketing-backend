const { validationResult } = require("express-validator");
const User = require("../models/User");
const fs = require("fs");
const { removeFile } = require("../helpers/file.js");
const { removeItemFromArray } = require("../helpers/utils");

exports.uploadFile = (req, res) => {
  const _id = req.params.id;

  User.findById(_id, (error, userDB) => {
    if (error) {
      return res
        .status(500)
        .json({ msg: "Internal server error looking for the user" });
    } else {
      try {
        let files = userDB.files;
        if (req.files.xlsx) {
          req.files.xlsx.forEach((file) => {
            let name = file.path.split("/")[2];
            if (name.split(".")[1] !== "xlsx") {
              return res.status(400).json({ msg: "Only xlsx file are accept" });
            }
            const datafile = {
              originalFilename: file.originalFilename,
              name,
            };
            files.push(datafile);
          });
          User.findByIdAndUpdate(
            _id,
            { files: files },
            (error, userUpdated) => {
              if (error) {
                return res.status(500).json({
                  msg: "An error has ocurred while the files were been saved",
                });
              }
              if (!userUpdated) {
                return res.status(404).json({ msg: "User not found" });
              } else {
                return res.status(200).json({ msg: "Files saved successfuly" });
              }
            }
          );
        } else {
          res.status(400).json({ msg: "Please send the files" });
        }
      } catch (error) {
        console.log(error);
        return res
          .status(400)
          .json({ msg: "The file or files most be inside of a array" });
      }
    }
  });
};

exports.deleteFile = (req, res) => {
  //Check if there are any error if so we return the errors
  if (!validationResult(req).isEmpty()) {
    return res.status(400).json({ errors: validationResult(req).array() });
  }

  User.findById({ _id: req.params.id }, (error, userDB) => {
    if (error) {
      return res.status(404).json({ msg: "User not found" });
    } else {
      //Check if the file exist and try to delete  it
      try {
        const filePath = `./uploads/xlsx/${req.body.fileName}`;
        fs.statSync(filePath);
        //Delet file
        if (removeFile(filePath)) {
          //if the file is removed successfuly we also remove it from the user
          removeItemFromArray(userDB.files, req.body.fileName);
          User.findByIdAndUpdate(
            { _id: req.params.id },
            { files: userDB.files },
            (error) => {
              if (error) {
                res.status(500).json({
                  msg:
                    "The was removed but an error has ocurred while the user was being updated",
                });
              }
              return res.status(200).json({ msg: "File removed" });
            }
          );
        } else {
          return res.status(500).json({
            msg: "An error has ocurred while the file was been deleted",
          });
        }
      } catch (error) {
        return res
          .status(404)
          .json({ msg: `File ${req.body.fileName} not found` });
      }
    }
  });
};
exports.getFiles = (req, res) => {
  const id = req.params.id;

  User.findById(id, (error, userDB) => {
    if (error) {
      return res
        .status(500)
        .json({ msg: "An error has ocurred while the user was being found" });
    } else if (!userDB) {
      return res.status(404).json({ msg: "User no found" });
    } else {
      return res.status(200).json({ files: userDB.files });
    }
  });
};
