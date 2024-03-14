var express = require("express");
var router = express.Router();
var models = require("../models");
const userShouldBeLoggedIn = require("../guards/userShouldBeLoggedIn");

//POST new child
router.post("/", userShouldBeLoggedIn, async function (req, res, next) {
  const { user } = req;
  const {
    firstname,
    lastname,
    diagnoses,
    school_support,
    home_support,
    specialists,
    medication,
    education,
    aids,
    dateofbirth,
    emergency_contact,
  } = req.body;

  try {
    const child = await user.createChild({
      firstname: firstname,
      lastname: lastname,
      diagnoses: diagnoses,
      school_support: school_support,
      home_support: home_support,
      specialists: specialists,
      medication: medication,
      education: education,
      aids: aids,
      dateofbirth: dateofbirth,
      emergency_contact: emergency_contact,
    });
    res.send(child);
  } catch (error) {
    res.status(400).send(error);
  }
});

async function childMustExist(req, res, next) {
  const { id } = req.params;
  const child = await models.Children.findOne({
    where: {
      id,
    },
  });

  if (!child) return res.status(404).send({ message: "Child not found" });
  req.child = child;
  next();
}

async function mustHaveChildPermission(req, res, next) {
  const { user, child } = req;
  // console.log("user id:", user.id, "child id:", child.id);
  const hasPermission = await user.hasChild(child);
  // console.log("hasPermission:", hasPermission);
  if (!hasPermission) return res.status(403).send({ message: "Forbidden" });
  next();
}

// GET child
router.get(
  "/:id",
  [userShouldBeLoggedIn, childMustExist, mustHaveChildPermission],
  async function (req, res, next) {
    const { child } = req;

    try {
      res.send(child);
    } catch (error) {
      res.status(500).send(error);
    }
  }
);

module.exports = router;
