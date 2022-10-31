import React from "react";

export default class Scoreboard extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <p>
          P1 Wins: {this.props.P1Wins} P2 Wins: {this.props.P2Wins}
        </p>
        <p>P1 Score : {this.props.P1Score}</p>
        <p>P2 Score : {this.props.P2Score}</p>
      </div>
    );
  }
}
