import React from "react";

function PlayingCards({ name, suit }) {
  return (
    <>
      <img src={require(`../../img/${name}_of_${suit}.png`)} alt="cards" />
    </>
  );
}

export default PlayingCards;
