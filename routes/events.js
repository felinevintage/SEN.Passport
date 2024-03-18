var express = require("express");
var router = express.Router();
var models = require("../models");
const userShouldBeLoggedIn = require("../guards/userShouldBeLoggedIn");
const childMustExist = require("../guards/childMustExist");
const mustHaveChildPermission = require("../guards/mustHaveChildPermission");

/* GET all events for child */
router.get("/:id",
[userShouldBeLoggedIn, childMustExist, mustHaveChildPermission],
async function (req, res, next) {
  const { child } = req;
  const childId = child.id

  try {
    const events = await models.Events.findAll({
      where: {
      childId,
      },
    });
    res.send(events)
  } catch (error) {
    res.status(400).send(error);
  }});


//POST new event for child
router.post("/:id", 
[userShouldBeLoggedIn,
childMustExist,
mustHaveChildPermission], async function (req, res) {
  const {child} = req
  const {
    event_type, 
    date, 
    time, 
    location
  } = req.body;

  try {
    const event = await child.createEvent({
      event_type: event_type,
      date: date,
      time: time,
      location: location
    });
    res.send(event)
  } catch (error) {
    res.status(400).send(error);
  }
})



module.exports = router;