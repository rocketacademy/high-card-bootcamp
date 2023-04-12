import React from "react";
import "./App.css";
import { makeShuffledDeck } from "./utils.js";
import Box from "@mui/material/Box";
// import { requirePropFactory } from "@mui/material";

class App extends React.Component {
  constructor(props) {
    // Always call super with props in constructor to initialise parent class
    super(props);
    this.state = {
      // Set default value of card deck to new shuffled deck
      cardDeck: makeShuffledDeck(),
      // currCards has cards from the current round
      currCards: [],
      // the nimber of times player 1 won
      player1Won: 0,
      // the number of times player 2 won
      player2Won: 0,
      // winner of current round
      winnerOfRound: null,
    };
  }

  dealCards = () => {
    const drawCardsArray = [
      this.state.cardDeck.pop(),
      this.state.cardDeck.pop(),
    ];

    let newWinner = null;
    if (drawCardsArray[0].rank > drawCardsArray[1].rank) {
      newWinner = 1;
    } else if (drawCardsArray[1].rank > drawCardsArray[0].rank) {
      newWinner = 2;
    } else if (drawCardsArray[1].rank === drawCardsArray[0].rank) {
      newWinner = 3;
    }

    this.setState((state) => ({
      winnerOfRound: newWinner,
      currCards: drawCardsArray,
      player1Won: newWinner === 1 ? state.player1Won + 1 : state.player1Won,
      player2Won: newWinner === 2 ? state.player2Won + 1 : state.player2Won,
    }));
  };

  // restart game
  handleGameRestart = () => {
    this.setState({
      cardDeck: makeShuffledDeck(),
      currCards: [],
      player1Won: 0,
      player2Won: 0,
      winnerOfRound: null,
    });
  };

  render() {
    const currCardElems = this.state.currCards.map(({ name, suit }) => (
      // Give each list element a unique key
      <div class="row" key={`${name}${suit}`}>
        <img
          src={require(`./PNG-cards-1.3/${name}_of_${suit}.png`)}
          alt="card"
          height="10%"
          width="10%"
        />{" "}
      </div>
    ));

    let winningMessage = "";

    if (this.state.winnerOfRound === 3) {
      winningMessage = "It is a tie.";
    } else if (
      this.state.winnerOfRound === 2 ||
      this.state.winnerOfRound === 1
    ) {
      winningMessage = `This round's winner: Player ${this.state.winnerOfRound}`;
    }

    const player1TotalScore = `Player 1 has won ${this.state.player1Won} rounds.`;
    const player2TotalScore = `Player 2 has won ${this.state.player2Won} rounds.`;
    const numRoundsLeft = this.state.cardDeck.length / 2;
    const numberOfRoundsLeftMessage = `There are ${numRoundsLeft} rounds left to play.`;

    let winner = null;
    if (this.state.player1Won > this.state.player2Won) {
      winner = 1;
    } else if (this.state.player1Won < this.state.player2Won) {
      winner = 2;
    }

    let overallWinnerMessage = "";

    if (winner === 1) {
      overallWinnerMessage = "Player 1 won the game";
    } else if (winner === 2) {
      overallWinnerMessage = "Player 2 won the game";
    } else {
      overallWinnerMessage = "It is a tie.";
    }
    return (
      <div className="App">
        <header className="App-header">
          <h3>High Card 🚀</h3>
          {currCardElems}

          <br />

          {numRoundsLeft === 0 ? (
            <div>
              {overallWinnerMessage}
              <br />
              <br />
              <button className="Button" onClick={this.handleGameRestart}>
                Restart
              </button>
            </div>
          ) : (
            <div>
              <button className="Button" onClick={this.dealCards}>
                Deal
              </button>
            </div>
          )}

          <br />
          {this.state.winnerOfRound !== null && (
            <Box
              sx={{
                width: 300,
                height: 40,
                borderRadius: "10px",
                backgroundColor: "goldenrod",
              }}
            >
              {winningMessage}
            </Box>
          )}
          <br />
          {player1TotalScore}
          <br />
          {player2TotalScore}

          <br />
          {numberOfRoundsLeftMessage}
          <br />
        </header>
      </div>
    );
  }
}

export default App;
