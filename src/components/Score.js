import React from "react";

export default class Score extends React.Component {
  render() {
    let { winner, p1Score, p2Score } = this.props

    return (
      <div>
        <h2>{winner}</h2>
        <h3>{p1Score} : {p2Score}</h3>
      </div>
    );
  }
} 