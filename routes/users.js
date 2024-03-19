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
  "/:childId/add-users",
  [userShouldBeLoggedIn, childMustExist, mustHaveChildPermission],
  async (req, res) => {
    const { child } = req;
    const { userIds } = req.body; // Array of userIds to add

    try {
      // Fetch the users to add
      const usersToAdd = await models.Users.findAll({
        where: { id: userIds },
      });

      // Add each user to the child
      await Promise.all(
        usersToAdd.map((user) =>
          child.addUser(user, { through: { access: "default", relationship: "none" } })
        )
      );

      res.sendStatus(200);
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal server error");
    }
  }
);

module.exports = router;
