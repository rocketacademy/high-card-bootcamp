import React from 'react';

//PlayingCard is just a function component since there is no need to manage any state
const PlayingCard = (props) => {
  const { name, suit, index } = props;
  const imageName = name.charAt(0);
  const imageSuit = suit.charAt(0);

  const myImage = require(`./images/${imageName}${imageSuit}.png`);
};

export default PlayingCard;
