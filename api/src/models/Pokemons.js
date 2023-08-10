const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "Pokemons",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      name: { type: DataTypes.STRING, allowNull: false },
      image: { type: DataTypes.STRING, allowNull: true },
      type: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        // defaultValue: ["normal"],
      },
      hp: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      attack: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      defense: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      speed: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      height: { type: DataTypes.FLOAT, allowNull: true },
      weight: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
      created: { type: DataTypes.BOOLEAN, defaultValue: true },
    },
    { timestamps: false }
  );
};
