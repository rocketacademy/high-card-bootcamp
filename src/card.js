import React from "react";

export default class Card extends React.Component {
  render() {
    const { displayName, suit } = this.props;
    let isRed = true;
    if (suit === "Clubs" || "Spades") {
      isRed = false;
    }

    return (
      <div className="card">
        <p className={isRed ? "red-card" : "black-card"}>{displayName}</p>
      </div>
    );
  }
}
