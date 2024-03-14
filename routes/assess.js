var express = require("express");
var router = express.Router();
var models = require("../models");
const userShouldBeLoggedIn = require("../guards/userShouldBeLoggedIn");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.send({ title: "Assessments" });
});

/* GET all assessments of one child */
router.get("/all", userShouldBeLoggedIn, async (req, res) => {
  const childId = req.params.id;
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
});

/* POST assessment */
router.post("/", async (req, res) => {
  const { assessment_type, date, results_doc, childId } = req.body;
});

/* GET assessments by id */
router.get("/:id", async (req, res) => {});

/* DELETE assessments by id */
router.delete("/:id", async (req, res) => {});

module.exports = router;
