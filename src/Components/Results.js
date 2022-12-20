import React from "react";

class Results extends React.Component {
  constructor(props) {
    super(props);
  }

  displayRoundWinner = (winner) => {
    if (winner !== null) {
      return `${winner} won this round!`;
    } else {
      return "It's a draw!";
    }
  };

  displayGameResults = (players) => {
    const result = players.map((player) => {
      let playerScore = player.score.reduce((acc, curValue) => {
        return acc + curValue;
      }, 0);
      return (
        <p key={player.name}>
          {player.name} won {playerScore} round(s) this game!
        </p>
      );
    });
    return result;
  };

  displayRemaining = (cardDeck) => {
    const remainingGames = cardDeck.length / 2;
    if (cardDeck.length <= 0) {
      return (
        <p>
          There are not more cards left for this game. Click on restart to start
          a new game!
        </p>
      );
    } else {
      return <p>There are {remainingGames} rounds left for this game.</p>;
    }
  };

  render() {
    return (
      <div>
        <div>{this.displayRoundWinner(this.props.winner)}</div>
        <div>{this.displayGameResults(this.props.players)}</div>
        <div>{this.displayRemaining(this.props.cardDeck)}</div>
      </div>
    );
  }
}

export default Results;
