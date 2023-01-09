import React from "react";
import Alert from 'react-bootstrap/Alert';

export default class Score extends React.Component {
  render() {
    let { winner, p1Score, p2Score } = this.props
    let variant

    if (winner.includes("Player 1") || (p1Score > p2Score)) {
      variant = "success"
    } else if (winner.includes("Player 2") || (p1Score < p2Score)){
      variant = "danger"
    }

    return (
      <div>
        <Alert variant={variant}>
          <h2>{winner}</h2>
          <h3>P1: {p1Score} - P2: {p2Score}</h3>
        </Alert>
      </div>
    );
  }
} 