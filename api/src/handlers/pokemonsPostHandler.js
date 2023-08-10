const {createPokemon}=require("../controllers/pokemonsController")
const pokemonsPostHandler = async (req, res) => {
  try {
    const {name,type,hp,attack,defense,speed,height,weight} = req.body;
    const newPokemon = await createPokemon(name,type,hp,attack,defense,speed,height,weight);
    res.status(201).json(newPokemon);
} catch (error) {
  res.status(400).json({error:error.message});
}

  // res.status(200).send(`Estoy creando un pokemon con nombre: ${nombre}, alto: ${alto} y peso: ${peso}`);
};
module.exports = pokemonsPostHandler;

