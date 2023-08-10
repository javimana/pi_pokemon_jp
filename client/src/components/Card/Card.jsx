import React from "react";
import { Link } from "react-router-dom/cjs/react-router-dom";
import style from "./Card.module.css";

const Card = (props) => {

  
  return (
    <div className={style.card}>

      <Link to={`/detail/${props.id}`}>
        <div className={style.name}>{props.name}</div>
      </Link>

      <img src={props.image} alt={props.name} className={style.image} />

      <div className={style.types}>
        <div>{props.type0}</div>
        <div>{props.type1}</div>
      </div>
      
    </div>
  );
};

export default Card;
