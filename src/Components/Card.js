import React from "react";

export default class Card extends React.Component {
  render() {
    const { name, suit, emoji } = this.props;
    let isBlack = true;
    if (suit === "Hearts" || suit === "Diamonds") {
      isBlack = false;
    }
    return (
      <div className={isBlack ? "black-card" : "red-card"}>
        <p className="card-top">{name}</p>
        <p className="card-mid">{emoji}</p>
        <p className="card-bottom">{name}</p>
      </div>
    );
  }
}
