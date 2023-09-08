import React from "react";

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
        <span className="card-rank">{this.props.rank}</span>
        <span className="card-suit">{suitEmojis[this.props.suit]}</span>
      </div>
    );
  }
}

{
  /* {this.state.card({
          suit: this.props.suit,
          rank: this.props.rank,
        })} */
}
