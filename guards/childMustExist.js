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

module.exports = childMustExist;
