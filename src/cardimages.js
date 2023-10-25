import React from "react";

const PlayingCard = ({ value, suit }) => {
  const cardImage = require(`./images/SVG-cards-1.3/${value}_of_${suit}.svg`);
  return (
    <div>
      <img src={cardImage} alt={`${value}_of_${suit}`} />
    </div>
  );
};
export default PlayingCard;
