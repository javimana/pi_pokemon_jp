const { getAllTypes } = require("../controllers/pokemonsController");

const pokemonsTypesHandler = async (req, res) => {
  try {
    const allTypes = await getAllTypes();
    res.status(200).json(allTypes);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
module.exports = pokemonsTypesHandler;
