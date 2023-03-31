import { defaultListboxReducer } from "@mui/base";
import React from "react";

class PlayingCard extends React.Component {
  constructor(props) {
    super(props);
  }
  styledRanks = (rank) => {
    switch (rank) {
      case "Ace":
        return "A";
      case "King":
        return "K";
      case "Queen":
        return "Q";
      case "Jack":
        return "J";
      default:
        return rank;
    }
  };

  render() {
    const suits = {
      Clubs: "♣️",
      Hearts: "♥️",
      Diamonds: "♦️",
      Spades: "♠️",
    };

    return (
      <div className={`card ${this.props.suit}`}>
        <div className="top-suit">{suits[this.props.suit]}</div>
        <div className="rank">{this.styledRanks(this.props.rank)}</div>
        <div className="bottom-suit">{suits[this.props.suit]}</div>
      </div>
    );
  }
}

export default PlayingCard;
