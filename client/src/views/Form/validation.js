const validator = (data) => {
    let errors = {};
  
    if (!data.name) {
      errors.name = "Ingrese un nombre";
    }
  
    if (data.type.length === 0) {
      errors.type = "Seleccione al menos un tipo";
    }
  
    if (data.hp <= 0) {
      errors.hp = "Ingrese un valor válido para HP";
    }
  
    if (data.attack <= 0) {
      errors.attack = "Ingrese un valor válido para Attack";
    }
  
    if (data.defense <= 0) {
      errors.defense = "Ingrese un valor válido para Defense";
    }
  
    if (data.speed <= 0) {
      errors.speed = "Ingrese un valor válido para Speed";
    }
  
    if (data.height <= 0) {
      errors.height = "Ingrese un valor válido para Height";
    }
  
    if (data.weight <= 0) {
      errors.weight = "Ingrese un valor válido para Weight";
    }
  
    return errors;
  };
  
  export default validator;
  