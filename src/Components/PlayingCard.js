import React from "react";

class PlayingCard extends React.Component {
  render() {
    const { name, suit } = this.props;
    let isRed = false;
    if (suit === "♥" || suit === "◆") {
      isRed = true;
    }
    return (
      <div className={isRed ? "red-card" : "black-card"}>
        <p className="card-top">{name}</p>
        <p className="card-middle">{suit}</p>
        <p className="card-bottom">{name}</p>
      </div>
    );
  }
}

export default PlayingCard;
