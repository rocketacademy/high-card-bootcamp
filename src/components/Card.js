import React from "react";

export default class Card extends React.Component {
  render() {
    let { name, suit, index } = this.props

    return (
      <div key={`${name}${suit}${index}`}>
        Player {index+1} : {name} of {suit}
      </div>
    );
  }
} 