import React from "react";
import { Typography } from "@mui/material";

class Instructions extends React.Component {
  displayRoundWinner = (winner) => {
    if (winner !== null) {
      return `${winner} won this round!`;
    } else {
      return "It's a draw!";
    }
  };

  displayNextStep = (cardDeck) => {
    // const winner = this.displayFinalWinner(this.props.players);
    if (cardDeck.length <= 0) {
      return (
        <Typography variant="body1">
          There are not more cards left for this game.
          <br />
          {this.displayFinalWinner(this.props.players)}
          <br />
          Click on New Game to start a new game!
        </Typography>
      );
    } else {
      return (
        <Typography variant="body1">
          Click Deal to play the next round!
        </Typography>
      );
    }
  };

  displayFinalWinner = (players) => {
    const finalScores = [];
    const playersWithMaxScore = [];
    let maxScore = 0;
    let winner = "Winner of this game is ";

    //Calculate the scores for each player for the game
    players.map((player) => {
      finalScores.push(
        player.score.reduce((accuVal, currVal) => accuVal + currVal, 0)
      );
    });

    //Loop through final score array to get the max score
    finalScores.forEach((score) => {
      if (score > maxScore) {
        maxScore = score;
      }
    });

    //Check if there is more than 1 max score
    finalScores.forEach((score, index) => {
      if (score === maxScore) {
        playersWithMaxScore.push(index + 1);
      }
    });

    //Update return statement based on number of winners for the game

    //If there is only 2 players and both players score the same final results
    if (this.props.players.length === 2 && playersWithMaxScore.length === 2) {
      winner = "It's a Draw, there are no winners for this game!";
    } else {
      // If there are 2 or more players
      for (let i = 0; i < playersWithMaxScore.length; i += 1) {
        if (i === playersWithMaxScore.length - 1) {
          winner += `Player ${playersWithMaxScore[i]}`;
        } else {
          winner += `Player ${playersWithMaxScore[i]} and `;
        }
      }
    }

    return winner;
  };

  render() {
    return (
      <div>
        <Typography variant="body1">
          {this.displayRoundWinner(this.props.winner)}
        </Typography>

        {this.displayNextStep(this.props.cardDeck)}
      </div>
    );
  }
}

export default Instructions;
