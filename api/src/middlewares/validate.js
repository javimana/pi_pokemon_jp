const { Router } = require("express");

const validate = (req, res, next) => {
  const { name, type, hp, attack, defense, speed, height, weight } =
    req.body;
  if (
    !name ||
    !type ||
    !hp ||
    !attack ||
    !defense ||
    !speed ||
    !height ||
    !weight
  ) {
    res.status(400).json({ error: "Missing data" });
  }
  next();
};
module.exports = validate;
