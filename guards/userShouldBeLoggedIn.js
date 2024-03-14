var jwt = require("jsonwebtoken");
require("dotenv").config();
const supersecret = process.env.SUPER_SECRET;
const models = require("../models");

function userShouldBeLoggedIn(req, res, next) {
  const token = req.headers["authorization"]?.replace(/^Bearer\s/, "");
  if (!token) {
    res.status(401).send({ message: "Please provide a token" });
  } else {
    jwt.verify(token, supersecret, async function (error, decoded) {
      if (error) res.status(401).send({ message: error.message });
      else {
        // req.user_id = decoded.user_id;
        const user = await models.Users.findOne({
          where: {
            id: decoded.user_id,
          },
        });
        if (!user) {
          return res.status(404).send("user not found");
        }
        req.user = user;
        next();
      }
    });
  }
}

module.exports = userShouldBeLoggedIn;
