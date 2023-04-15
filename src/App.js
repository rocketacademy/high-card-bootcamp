import React from "react";
import "./App.css";
import { makeShuffledDeck } from "./utils.js";

import "bootstrap/dist/css/bootstrap.min.css";
import Table from "react-bootstrap/Table";

class App extends React.Component {
  constructor(props) {
    // Always call super with props in constructor to initialise parent class
    super(props);
    this.state = {
      // Set default value of card deck to new shuffled deck
      cardDeck: makeShuffledDeck(),
      // currCards holds the cards from the current round
      currCards: [],
      player1NumRoundsWon: 0,
      player2NumRoundsWon: 0,
      roundWinner: null,
      gameStart: false,
    };
  }

  dealCards = () => {
    console.log(this.state);
    // Deal last 2 cards to currCards
    // .slice(-2) means select from the end of the array.
    const newCurrCards = this.state.cardDeck.slice(-2);
    // logic to determine round winnner
    let newRoundWinner = null;
    if (newCurrCards[0].rank > newCurrCards[1].rank) {
      newRoundWinner = 1;
    } else if (newCurrCards[1].rank > newCurrCards[0].rank) {
      newRoundWinner = 2;
    }

    this.setState((state) => ({
      // Remove last 2 cards from cardDeck
      cardDeck: state.cardDeck.slice(0, -2),
      //assign last 2 cards to currCards array
      currCards: newCurrCards,
      gameStart: true,
      roundWinner: newRoundWinner,
      // Use prev state from setState argument instead of this.state to calculate what next state should be
      player1NumRoundsWon:
        newRoundWinner === 1
          ? state.player1NumRoundsWon + 1
          : state.player1NumRoundsWon,
      player2NumRoundsWon:
        newRoundWinner === 2
          ? state.player2NumRoundsWon + 1
          : state.player2NumRoundsWon,
    }));
  };

  componentDidUpdate() {
    setTimeout(() => {
      console.log(JSON.stringify(this.state.currCards));
    }, 1000);
  }

  // resets game
  resetRound = () => {
    this.setState({
      cardDeck: makeShuffledDeck(),
      // currCards holds the cards from the current round
      currCards: [],
      player1NumRoundsWon: 0,
      player2NumRoundsWon: 0,
      roundWinner: null,
      gameStart: false,
    });
  };

  render() {
    const currCardElems = this.state.currCards.map(({ name, suit }) => (
      // Give each list element a unique key
      <div key={`${name}${suit}`}>
        {name} of {suit}
      </div>
    ));

    // round outcome messgae
    let roundWonMsg = "";
    if (this.state.roundWinner === 1) {
      roundWonMsg = `Player 1 wins!`;
    } else if (this.state.roundWinner === 2) {
      roundWonMsg = `Player 2 wins!`;
    } else {
      roundWonMsg = `Its a tie!`;
    }

    // game outcome message
    let gameWonMsg = "";
    if (this.state.player1NumRoundsWon > this.state.player2NumRoundsWon) {
      gameWonMsg = `Player 1 wins this entire game!`;
    } else if (
      this.state.player2NumRoundsWon > this.state.player1NumRoundsWon
    ) {
      gameWonMsg = `Player 2 wins this entire game!`;
    } else {
      gameWonMsg = `The entire game is a tie!`;
    }

    // Deal button text changes at end of game to start again
    const dealButtonText = this.state.cardDeck.length === 0 ? "Reset" : "Deal";

    return (
      <div className="App">
        <header className="App-header">
          <h3>High Card 🚀</h3>
          {currCardElems}
          <br />
          <button
            onClick={
              this.state.cardDeck.length === 0
                ? this.resetRound
                : this.dealCards
            }
          >
            {dealButtonText}
          </button>
          <br />
          <p>{this.state.gameStart && roundWonMsg}</p>
          <p>{this.state.cardDeck.length === 0 && gameWonMsg}</p>
          <Table striped bordered hover variant="dark">
            <thead>
              <tr>
                <td colSpan={2}>
                  Rounds Left : {this.state.cardDeck.length / 2}
                </td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>Player 1's Score</th>
                <th>Player 2's Score</th>
              </tr>{" "}
              <tr>
                <td> {this.state.player1NumRoundsWon}</td>
                <td> {this.state.player2NumRoundsWon}</td>{" "}
              </tr>
            </tbody>{" "}
          </Table>
          {/* <p>Player 1 Score: {this.state.player1NumRoundsWon}</p>
          <p> Player 2 Score: {this.state.player2NumRoundsWon}</p> */}
          {/* Render winner message if the game is over */}
          {/* <p>{this.state.cardDeck.length / 2 === 0 && gameWinnerMessage}</p> */}
        </header>
      </div>
    );
  }
}
export default App;
