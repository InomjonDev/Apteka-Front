import React from "react";
import Card from "../ProductCart/Card";

function CardWrapper({ isDelete }) {
  return (
    <div>
      <Card isDelete={isDelete} />
    </div>
  );
}

export default CardWrapper;
