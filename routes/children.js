var express = require("express");
var router = express.Router();
var models = require("../models");
const userShouldBeLoggedIn = require("../guards/userShouldBeLoggedIn");
const childMustExist = require("../guards/childMustExist");
const mustHaveChildPermission = require("../guards/mustHaveChildPermission");

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

/* GET all assessments of one child */
router.get(
  "/:id/assessments",
  [userShouldBeLoggedIn, childMustExist, mustHaveChildPermission],
  async (req, res) => {
    const { child } = req;
    const childId = child.id;
    console.log(childId);
    try {
      await models.Assessments.findAll({
        where: {
          childId,
        },
      });
      res.send("Success");
    } catch (error) {
      res.status(500).send(error);
    }
  }
);

module.exports = router;
