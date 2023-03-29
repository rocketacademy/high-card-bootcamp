import React from "react";

export default class Card extends React.Component {
  render() {
    const { displayName, suit } = this.props;
    let isBlack = true;
    if (suit === "Hearts" || suit === "Diamonds") {
      isBlack = false;
    }
    return (
      <div className="card">
        <p className={isBlack ? "black-card" : "red-card"}>{displayName}</p>
      </div>
    );
  }
}
