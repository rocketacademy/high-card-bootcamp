import React from "react";

const playingCard = ({ value, suit }) => {
  require(`./images/SVG-cards-1.3/${value}_of_${suit}.svg`);

  return (
    <div>
      <img src={playingCard} alt={`${value}_of_${suit}`} />
    </div>
  );
};
export default playingCard;
