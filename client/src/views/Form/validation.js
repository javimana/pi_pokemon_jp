
//funcion que recibe a data (arreglo que tiene los datos del pokemon [data.name: "bunca", data.type: ["electric","grass"]...])
// va creando un objeto errors con mensajes, ejemplo: errors={name:"El nombre no puede contener números"}
const validator = (data) => {
  let errors = {};

  if(data.name.length>30){
    errors.name="No puede superar los 30 caracteres"
  }

  if (!data.name) {
    errors.name = "Ingrese un nombre";
  } else if (/\d/.test(data.name)) {
    errors.name = "El nombre no puede contener números";
  }

  if (data.type.length === 0) {
    errors.type = "Seleccione al menos un tipo";
  }

  if (data.hp < 1 || data.hp > 255) {
    errors.hp = "Ingrese un valor válido para HP (entre 1 y 255)";
  }

  if (data.attack < 5 || data.attack > 190) {
    errors.attack = "Ingrese un valor válido para Attack (entre 5 y 190)";
  }

  if (data.defense < 5 || data.defense > 250) {
    errors.defense = "Ingrese un valor válido para Defense (entre 5 y 250)";
  }

  if (data.speed < 5 || data.speed > 200) {
    errors.speed = "Ingrese un valor válido para Speed (entre 5 y 200)";
  }

  if (data.height < 1 || data.height > 1000) {
    errors.height = "Ingrese un valor válido para Height (entre 1 y 1000)";
  }

  if (data.weight < 0 || data.weight > 10000) {
    errors.weight = "Ingrese un valor válido para Weight (entre 0 y 10000)";
  }

  return errors;
};

export default validator;
