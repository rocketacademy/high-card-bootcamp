import React from "react";
import "./App.css";
import { makeShuffledDeck } from "./utils.js";

class App extends React.Component {
  constructor(props) {
    // Always call super with props in constructor to initialise parent class
    super(props);
    this.state = {
      // Set default value of card deck to new shuffled deck
      cardDeck: makeShuffledDeck(),
      // currCards holds the cards from the current round
      currCards: [],
      hasGameStarted: false,
      roundWinner: null,
      player1NumRoundsWon: 0,
      player2NumRoundsWon: 0,
    };
  }

  resetGame = () => {
    this.setState({
      cardDeck: makeShuffledDeck(),
      currCards: [],
      hasGameStarted: false,
      roundWinner: null,
      player1NumRoundsWon: 0,
      player2NumRoundsWon: 0,
    });
  };

  dealCards = () => {
    // Deal last 2 cards to currCards
    const newCurrCards = this.state.cardDeck.slice(-2);
    let newRoundWinner = null;
    if (newCurrCards[0].rank > newCurrCards[1].rank) {
      newRoundWinner = 1;
    } else if (newCurrCards[1].rank > newCurrCards[0].rank) {
      newRoundWinner = 2;
    }

    this.setState((state) => ({
      // Remove last 2 cards from cardDeck
      cardDeck: state.cardDeck.slice(0, -2),
      currCards: newCurrCards,
      hasGameStarted: true,
      roundWinner: newRoundWinner,
      // Use prev state from setState argument instead of this.state to calculate what next state should be
      // nested ternary operator to nest two if statements
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

  render() {
    const currCardElems = this.state.currCards.map(({ name, suit }) => (
      // Give each list element a unique key
      <div key={`${name}${suit}`}>
        {name} of {suit}
      </div>
    ));

    const roundWinnerMessage = this.state.roundWinner
      ? `Player ${this.state.roundWinner} won this round.`
      : `This rounds is a tie!`;
    //Placeholder text when player 1 wins a round
    const player1RoundsWonMessage = `Player 1 has won ${this.state.player1NumRoundsWon} rounds this game.`;
    //Placeholder text when player 2 wins a round
    const player2RoundsWonMessage = `Player 2 has won ${this.state.player2NumRoundsWon} rounds this game.`;
    // numRoundsLeft is the number of rounds left in the game - divide by two because two cards are drawn each round
    const numRoundsLeft = this.state.cardDeck.length / 2;
    const numRoundsLeftMessage = `There are ${numRoundsLeft} rounds left in this game!`;

    // Determine game winner
    let gameWinner = null;
    if (this.state.player1NumRoundsWon > this.state.player2NumRoundsWon) {
      gameWinner = 1;
    } else if (
      this.state.player2NumRoundsWon > this.state.player1NumRoundsWon
    ) {
      gameWinner = 2;
    }

    const gameWinnerMessage = gameWinner
      ? `Player ${gameWinner} won this game!`
      : "It's a draw!";

    // Deal button text changes at end of game to start again
    const dealButtonText = numRoundsLeft === 0 ? "Reset Game" : "Deal";

    return (
      <div className="App">
        <header className="App-header">
          <h3>High Card 🚀</h3>
          {currCardElems}
          <br />
          {/* Button changes functionality depending on game state. When number of rounds = 0, button prompts game reset, else deal cards. */}
          <button
            onClick={numRoundsLeft === 0 ? this.resetGame : this.dealCards}
          >
            {dealButtonText}
          </button>
          <br />
          <br />
          {/* Render round winner message if the game has started */}
          <p>{this.state.hasGameStarted && roundWinnerMessage}</p>
          <p>{this.state.hasGameStarted && player1RoundsWonMessage}</p>
          <p>{this.state.hasGameStarted && player2RoundsWonMessage}</p>
          <p>{this.state.hasGameStarted && numRoundsLeftMessage}</p>
          {/* Render winner message if the game is over */}
          <p>{numRoundsLeft === 0 && gameWinnerMessage}</p>
        </header>
      </div>
    );
  }
}

export default App;
