import React from "react";
import "./PlayingCard.css";

export default class PlayingCard extends React.Component {
  render() {
    const suitEmojis = {
      Spades: "♠️",
      Hearts: "♥️",
      Clubs: "♣️",
      Diamonds: "♦️",
    };

    return (
      <div className="playing-card">
        <div className="wrapper">
          <p className="card-suit">{suitEmojis[this.props.suit]}</p>
        </div>
        <div className="wrapper">
          <p className="card-rank">{this.props.name}</p>
        </div>
        <div className="wrapper">
          <p className="card-suit">{suitEmojis[this.props.suit]}</p>
        </div>
      </div>
    );
  }
}
