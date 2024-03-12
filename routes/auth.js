var express = require("express");
var router = express.Router();
var models = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const saltRounds = 10;

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

  const results = await models.Users.findOne({});

  // try {
  //   const results = await db(
  //     `SELECT * FROM users WHERE username = "${username}"`
  //   );
  //   const user = results.data[0];
  //   if (user) {
  //     const user_id = user.id;

  //     const correctPassword = await bcrypt.compare(password, user.password);

  //     if (!correctPassword) throw new Error("Incorrect password");

  //     var token = jwt.sign({ user_id }, supersecret);
  //     res.send({ message: "Login successful, here is your token", token });
  //   } else {
  //     throw new Error("User does not exist");
  //   }
  // } catch (err) {
  //   res.status(400).send({ message: err.message });
  // }
});

module.exports = router;
