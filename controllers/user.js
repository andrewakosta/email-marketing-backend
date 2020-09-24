const User = require("../models/User");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

/**Register a new user*/
exports.signUp = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(500).json({ errors: errors.array() });
  }
  const { email } = req.body;

  try {
    //Check if the user alredy exixt
    let user = await User.findOne({ email });
    if (user) {
      return res.status(500).json({ msg: "The user already exist" });
    }

    //Has password
    const hashedPassword = await new Promise((resolve, reject) => {
      bcrypt.hash(req.body.password, 2, (error, hash) => {
        if (error) {
          reject(error);
        } else {
          resolve(hash);
        }
      });
    });
    req.body.password = hashedPassword;
    user = new User(req.body);
    //save user
    await user.save();
    /**Security */
    //Payload to encript
    const payload = {
      user: {
        id: user._id,
      },
    };
    //Firm the Json web token
    jwt.sign(
      payload,
      process.env.SECRET,
      {
        expiresIn: process.env.EXPIRES_IN,
      },
      (error, token) => {
        if (error) {
          throw error;
        } else {
          return res.status(200).json({ token });
        }
      }
    );
  } catch (error) {
    return res
      .status(500)
      .json({ msg: "An error has ocurred while teh user was been saved" });
  }
};

/**Login */
exports.logIn = async (req, res) => {
  //Check if there are some error
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(500).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  //find user on data base
  User.findOne({ email }, (error, userDB) => {
    if (error) {
      return res
        .status(500)
        .json({ msg: "An error has ocurred while the user was been found" });
    }

    //Check if the user with that email exist
    if (!userDB) {
      return res.status(404).json({ msg: "The email is wrong" });
    }

    //Compare the sent password with teh stored password
    if (!bcrypt.compareSync(password, userDB.password)) {
      return res.status(404).json({ msg: "The password is wrong" });
    }

    //Create autentication token
    userDB.password = null;

    jwt.sign(
      { user: userDB },
      process.env.SECRET,
      {
        expiresIn: process.env.EXPIRES_IN,
      },
      (error, token) => {
        if (error) {
          throw error;
        } else {
          return res.status(200).json({ token });
        }
      }
    );
  });
};
