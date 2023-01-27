import React from "react";
import { Typography } from "@mui/material";

class Instructions extends React.Component {
  displayRoundWinner = (players) => {
    const playersCardRank = [];

    players.forEach((player) => {
      playersCardRank.push(player.cards[0].rank);
    });

    let winningStatement = this.generateWinnerStatement(
      this.props.checkWinner(playersCardRank)
    );

    winningStatement += "this round!";

    return winningStatement;
  };

  displayNextStep = (cardDeck, players) => {
    const balanceCards = cardDeck.length;
    const numOfPlayers = players.length;

    if (balanceCards < numOfPlayers) {
      return (
        <div>
          <Typography variant="body1" style={{ fontWeight: "bold" }}>
            {this.displayFinalWinner(this.props.players)}
          </Typography>
          <Typography variant="body1">
            <br />
            There are no more cards left for this game.
            <br />
            Click on New Game to start next game!
          </Typography>
        </div>
      );
    } else {
      return (
        <Typography variant="body1">
          Click Deal to play the next round!
        </Typography>
      );
    }
  };

  generateWinnerStatement = (playersWithMaxScore) => {
    let winner = "";
    //If all players score the same final results
    if (
      this.props.players.length === playersWithMaxScore.length ||
      playersWithMaxScore.length === 0
    ) {
      winner = "It's a Draw, no winners for ";
    } else {
      // If there is at least 1 winner
      for (let i = 0; i < playersWithMaxScore.length; i += 1) {
        if (i === playersWithMaxScore.length - 1) {
          winner += `Player ${playersWithMaxScore[i]} won this `;
        } else {
          winner += `Player ${playersWithMaxScore[i]} and `;
        }
      }
    }
    return winner;
  };

  displayFinalWinner = (players) => {
    const finalScores = [];

    //Calculate the scores for each player for the game
    players.map((player) => {
      finalScores.push(
        player.score.reduce((accuVal, currVal) => accuVal + currVal, 0)
      );
    });

    let winningStatement = this.generateWinnerStatement(
      this.props.checkWinner(finalScores)
    );

    winningStatement += "this game!";

    return winningStatement;
  };

  render() {
    return (
      <div>
        <Typography variant="body1">
          {this.displayRoundWinner(this.props.players)}
        </Typography>
        {this.displayNextStep(this.props.cardDeck, this.props.players)}
      </div>
    );
  }
}

export default Instructions;
