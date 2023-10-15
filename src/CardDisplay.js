import React from "react";
import "./App.css";

export default class CardDisplay extends React.Component {
  render() {
    const imgName = `./PNG-cards/${this.props.card.name.toLowerCase()}_of_${this.props.card.suit.toLowerCase()}.png`;
    return <img className="col-2" src={require(`${imgName}`)} alt="" />;
  }
}
