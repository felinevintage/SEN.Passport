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

router.get("/all", async function (req, res, next) {
  try {
    const users = await models.Users.findAll();
    res.send(users);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
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
router.delete("/children/:id", async (req, res) => {
  const childId = req.params.id;

  try {
    // Find the child by ID
    const child = await models.Children.findByPk(childId);

    // Check if child exists
    if (!child) {
      return res.status(404).send("Child not found");
    }

    // Delete associated assessments, events, and documents
    await models.Assessments.destroy({ where: { childId } });
    await models.Events.destroy({ where: { childId } });
    await models.Documents.destroy({ where: { childId } });

    // Delete the child record
    await models.Children.destroy({
      where: {
        id: childId,
      },
    });

    res.sendStatus(204); // No content, successful deletion
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

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

router.put(
  "/:id/addUsers",
  [userShouldBeLoggedIn, childMustExist],
  async (req, res) => {
    const { child } = req;
    const { userIds, relationship } = req.body;

    try {
      // Fetch user objects based on the provided user IDs
      const users = await models.Users.findAll({
        where: { id: userIds },
      });

      // Check if all provided user IDs were valid
      if (users.length !== userIds.length) {
        return res.status(400).send("One or more users not found");
      }

      console.log("Child ID:", child.id);
      console.log("User IDs:", userIds);

      // Add users to the child
      // await child.addUsers(users, { through: { relationship } });
      await child.addUsers({
        userIds: userIds,
        relationship: relationship,
      });

      res.sendStatus(200); // Success
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  }
);

module.exports = router;
