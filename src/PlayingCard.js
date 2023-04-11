import React from "react";
import "./App.css";

//Objective: Display card images

class PlayingCard extends React.Component {
  constructor(props) {
    // Always call super with props in constructor to initialise parent class
    super(props);
    this.state = {
      // Set default value of card deck to new shuffled deck
      cardDeck: makeShuffledDeck(),
      // currCards holds the cards from the current round

    };
    console.log(this.state);
  }

  render() {

    return (
        {

        }
    )
  }
}


export default PlayingCard;
