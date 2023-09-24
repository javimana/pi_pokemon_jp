
import React from "react";
import { Link } from "react-router-dom";
import style from "./Card.module.css";

const Card = (props) => {
  const getTypeImage = (typeName) => {
    const formattedTypeName = typeName.toLowerCase().replace(" ", "-");
    return require(`../Images/${formattedTypeName}.jpg`);
  };

  return (
    <Link to={`/detail/${props.id}`} className={style.cardLink}>
      <div className={style.card}>
        <div className={style.name}>{props.name}</div>

        <img src={props.image} alt={props.name} className={style.image} />

        <div className={style.types}>

          <div className={style.typeImageContainer}>
            <img src={getTypeImage(props.type0)} alt={props.type0} className={style.typeImage} />
            {props.type1 && (<img src={getTypeImage(props.type1)} alt={props.type1} className={style.typeImage}/> )}
          </div>

        </div>
        
      </div>
    </Link>
  );
};

export default Card;
