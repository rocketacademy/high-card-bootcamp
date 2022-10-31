import React from "react";

export default class Player extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const cardIndex = this.props.playerID - 1;

    return (
      <div>
        <p>
          Player {this.props.playerID} card:{this.props.cards[cardIndex]}
        </p>
      </div>
    );
  }
}
