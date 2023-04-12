import React from "react";
//import { Card, CardMedia, Typography } from "@material-ui/core";
//import { makeStyles } from "@material-ui/core/styles";



//PlayingCard is just a function component since there is no need to manage any state
class PlayingCards extends React.Component {
  constructor(props) {
    // Always call super with props in constructor to initialise parent class
    super(props);
    this.state = {
      
    };
  }
 
  render() {
    const { name, suit } = this.props;
    
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
  }
}
export default PlayingCards;

