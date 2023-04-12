import React from "react";
//import { Card, CardMedia } from "@material-ui/core";
//import useStyles from "./styles";

//PlayingCard is just a function component since there is no need to manage any state
const PlayingCard = (props) => {
  const { name, suit } = props;
  //const classes = useStyles();
  let imageName;
  if (name.charAt(0) === "1") {
    imageName = "10";
  } else {
    imageName = name.charAt(0);
  }
  const imageSuit = suit.charAt(0);

  const myImage = require(`./images/${imageName}${imageSuit}.png`);

  return <img src={myImage} width="80px" alt={`${name} of ${suit}`} />;
};

export default PlayingCard;
