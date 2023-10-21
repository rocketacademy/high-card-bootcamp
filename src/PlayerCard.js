import React from "react";

export default function PlayerCard(props) {
  const { name, suit } = props;
  return <img src={require(`./img/${name}_of_${suit}.png`)} />;
}
