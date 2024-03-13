var express = require('express');
var router = express.Router();
var models = require("../models")


/* GET users listing. */
router.get('/', async function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
var express = require('express');
var router = express.Router();
var models = require("../models")

/* GET user by id*/
router.get('/:id', async function(req, res, next) {
  const { id } = req.params;

  try {
    const user = await models.Users.findOne({
      where: {
        id,
      }
      
    });
    res.send(user);
  } catch (error) {
    res.status(500).send(error);
  }  
});

//GET children associated with user
router.get('/:id/children', async function(req, res, next) {
  const { id } = req.params;

  try {
    const user = await models.Users.findOne({
      where: {
        id,
      },
      include: [{ model: models.Children }] 
    });

    
    if (!user) {
      return res.status(404).send('User not found');
    }

    const childrenNames = user.Children.map(child => ({
      firstname: child.firstname,
      lastname: child.lastname
    }));

    res.send(childrenNames);
  } catch(error) {
    console.error(error);
    res.status(500).send('Internal server error');
  }
})


//GET users associated with other user
// router.get('/:id/users',async function(req, res, next) {
//   const { id } = req.params;

//   try {
//     const user = await models.Users.findOne({
//       where: {
//         id,
//       },
//     })
//     res.send(user.getUsers());
//   } catch(error) {
//     res.status(500).send(error);
//   }
// })



//Update/PUT user info
router.put('/')


//DELETE child
router.delete('/:id/children', async function(req, res, next) {
  const{ id } = req.params;

  try {
    await models.Children.destroy({
      where: {
        id,
      },
    })
  } catch(error) {
    res.status(500).send(error);
  }
})

//DELETE user
router.delete('/:id', async function(req, res, next) {
  const{ id } = req.params;

  try {
    await models.Children.destroy({
      where: {
        id,
      },
    })
  } catch(error) {
    res.status(500).send(error);
  }
})


module.exports = router;