var express = require("express");
var router = express.Router();
var models = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const saltRounds = 10;
const supersecret = process.env.SUPER_SECRET;

/* GET home page. */
router.get("/", function (req, res, next) {
  res.send({ title: "Auth" });
});

/*POST register*/
router.post("/register", async (req, res) => {
  const { username, password, firstname, lastname, email } = req.body;
  try {
    const hash = await bcrypt.hash(password, saltRounds);
    const newUser = await models.Users.create({
      username: username,
      password: hash,
      firstname: firstname,
      lastname: lastname,
      email: email,
    });
    res.send(newUser);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

/*POST login */
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await models.Users.findOne({ where: { username } });
    // console.log(user.dataValues);

    if (user) {
      const user_id = user.id;
      const correctPassword = await bcrypt.compare(password, user.password);
      if (!correctPassword) throw new Error("Incorrect password");
      const token = jwt.sign({ user_id }, supersecret);
      console.log(token);
      res.send({ message: "Login successful, here is your token", token });
    } else {
      throw new Error("User does not exist");
    }
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

module.exports = router;
