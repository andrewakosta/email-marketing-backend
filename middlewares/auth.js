const jwt = require("jsonwebtoken");

exports.auth = function (req, res, next) {
  //Check if there is a token
  const token = req.header("x-auth-token");

  if (!token) {
    //If there is not one token we deny the request
    return res.status(401).json({ msg: "not token, please log in to get one" });
  }
  //Check token
  try {
    const cifrate = jwt.verify(token, process.env.SECRET);
    req.body.user = cifrate.user;
    next();
  } catch (error) {
    return res.status(401).json({ msg: "Invalid token" });
  }
};
