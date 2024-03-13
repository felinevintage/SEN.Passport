var express = require("express");
var router = express.Router();
var models = require("../models")

//POST new child
router.post("/:id/children", async function (req, res, next) {
  const {id} = req.params;
  const { firstname, lastname, diagnoses, school_support, home_support, specialists,
    medication, education, aids, dateofbirth, emergency_contact } = req.body;

  try {
    const user = await models.Users.findOne({
      where: {
        id,
      },
    })
    if (!user) {
      return res.status(404).send("user not found")    
    }
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
      emergency_contact: emergency_contact });
    res.send(child);
} catch (error) { 
  res.status(400).send(error)
}
});


//GET child
router.get("/children/:id", async function(req, res, next) {
  const { id } = req.params;

  try {
    const child = await models.Children.findOne({
      where: {
        id,
      }
      
    });
    res.send(child);
  } catch (error) {
    res.status(500).send(error);
  }
});
  

module.exports = router;