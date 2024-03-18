var express = require("express");
var router = express.Router();
var models = require("../models");

const userShouldBeLoggedIn = require("../guards/userShouldBeLoggedIn");
const childMustExist = require("../guards/childMustExist");
const mustHaveChildPermission = require("../guards/mustHaveChildPermission");

/* GET user */
router.get("/", userShouldBeLoggedIn, async function (req, res, next) {
  const { user } = req;

  try {
    res.send(user);
  } catch (error) {
    res.status(500).send(error);
  }
});

//GET children associated with user
router.get("/children", userShouldBeLoggedIn, async function (req, res, next) {
  const { user } = req;

  try {
    const userWithChildren = await models.Users.findOne({
      where: { id: user.id },
      include: [{ model: models.Children }],
    });

    if (!userWithChildren) {
      return res.status(404).send("User not found");
    }

    const children = userWithChildren.Children;

    // const childrenNames = children.map((child) => ({
    //   firstname: child.firstname,
    //   lastname: child.lastname,
    // }));

    res.send(children);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
});

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
router.put("/");

//DELETE child
router.delete(
  "/children/:id",
  userShouldBeLoggedIn,
  async function (req, res, next) {
    const { user } = req;
    const id = req.params.id;
    console.log(id);
    try {
      await models.Children.destroy({
        where: {
          id, // Assuming there's a userId field in the Children model
        },
      });
      res.sendStatus(204); // No content, successful deletion
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  }
);

//DELETE user
router.delete("/:id", async function (req, res, next) {
  const { id } = req.params;

  try {
    await models.Children.destroy({
      where: {
        id,
      },
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
