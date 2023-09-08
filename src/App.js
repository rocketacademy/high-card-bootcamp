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
    // this.state.cardDeck.pop() modifies this.state.cardDeck array
    // newCurrCards contains how many cards are generated
    const newCurrCards = this.state.cardDeck.slice(-2);
    let newRoundWinner = null;
    if (newCurrCards[0].rank > newCurrCards[1].rank) {
      newRoundWinner = 1;
    } else if (newCurrCards[0].rank < newCurrCards[1].rank) {
      newRoundWinner = 2;
    }

    this.setState((state) => ({
      cardDeck: state.cardDeck.slice(0, -2),
      currCards: newCurrCards,
      hasGameStarted: true,
      roundWinner: newRoundWinner,
      player1NumRoundsWon:
        newRoundWinner === 1
          ? state.player1NumRoundsWon + 1
          : state.player1NumRoundsWon,
      player2NumRoundsWon:
        newRoundWinner === 2
          ? state.player2NumRoundsWon + 1
          : state.player2NumRoundsWon,
    }));
    console.log(newCurrCards);
  };

  render() {
    // You can write JavaScript here, just don't try and set your state!
    // compare var 1 and var 2 names
    //compare var 1 and var 2 suits
    //if var 1 > var 2, add to player 1, vice versa
    //display the win counts
    // You can access your current components state here, as indicated below
    const currCardElems = this.state.currCards.map(({ name, suit }) => (
      // Give each list element a unique key
      <div key={`${name}${suit}`}>
        {name} of {suit}
      </div>
    ));

    const roundWinnerMessage = this.state.roundWinner
      ? `Player ${this.state.roundWinner} won this round.`
      : `This round is a tie!`;
    const player1RoundsWonMessage = `Player 1 has won ${this.state.player1NumRoundsWon} rounds this game.`;
    const player2RoundsWonMessage = `Player 2 has won ${this.state.player2NumRoundsWon} rounds this game.`;
    const numRoundsLeft = this.state.cardDeck.length / 2;
    const numRoundsLeftMessage = `There are ${numRoundsLeft} rounds left in this game!`;

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

    const dealButtonText = numRoundsLeft === 0 ? "Reset Game" : "Deal";

    return (
      <div className="App">
        <header className="App-header">
          <h3>High Card 🚀</h3>
          {currCardElems}
          <br />
          <button
            onClick={numRoundsLeft === 0 ? this.resetGame : this.dealCards}
          >
            {dealButtonText}
          </button>
          <br />
          <p>{this.state.hasGameStarted && roundWinnerMessage}</p>
          <p>{this.state.hasGameStarted && player1RoundsWonMessage}</p>
          <p>{this.state.hasGameStarted && player2RoundsWonMessage}</p>
          <p>{this.state.hasGameStarted && numRoundsLeftMessage}</p>
          <p>{numRoundsLeft === 0 && gameWinnerMessage}</p>
        </header>
      </div>
    );
  }
}

export default App;

// newDeck.slice(-2);
// if (newCurrCards[0].rank > newCurrCards[1].rank) {
//   playerOne += 1;
// } else if (newCurrCards[0].rank < newCurrCards[1].rank) {
//   playerTwo += 1;
// } else if (newCurrCards[0].rank === newCurrCards[1].rank) {
//   if (newCurrCards[0].sRank > newCurrCards[1].sRank) {
//     playerOne += 1;
//   } else {
//     playerTwo += 1;
//   }
// }
