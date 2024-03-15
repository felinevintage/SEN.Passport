const models = require("../models");

async function mustHaveChildPermission(req, res, next) {
  const { user, child } = req;
  // console.log("user id:", user.id, "child id:", child.id);
  const hasPermission = await user.hasChild(child);
  // console.log("hasPermission:", hasPermission);
  if (!hasPermission) return res.status(403).send({ message: "Forbidden" });
  next();
}

module.exports = mustHaveChildPermission;
