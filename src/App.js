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
      playerOneRoundsWon: 0,
      playerTwoRoundsWon: 0,
      roundWinner: "",
    };
  }

  dealCards = () => {
    const cardsDealt = this.state.cardDeck.slice(-2);
    let whoWon = "Draw";
    if (cardsDealt[0].rank > cardsDealt[1].rank) {
      whoWon = "Player One";
    } else if (cardsDealt[0].rank < cardsDealt[1].rank) {
      whoWon = "Player Two";
    }

    this.setState((state) => ({
      // Remove last 2 cards from cardDeck
      cardDeck: state.cardDeck.slice(0, -2),
      // Deal last 2 cards to currCards
      currCards: cardsDealt,
      roundWinner: whoWon,
    }));

    if (whoWon === "Player One") {
      this.setState((state) => ({
        playerOneRoundsWon: state.playerOneRoundsWon + 1,
      }));
    } else if (whoWon === "Player Two") {
      this.setState((state) => ({
        playerTwoRoundsWon: state.playerTwoRoundsWon + 1,
      }));
    }
  };

  render() {
    const currCardElems = this.state.currCards.map(({ name, suit }) => (
      // Give each list element a unique key
      <div key={`${name}${suit}`}>
        {name} of {suit}
      </div>
    ));

    return (
      <div className="App">
        <header className="App-header">
          <h3>High Card 🚀</h3>
          {currCardElems}
          <br />
          <button onClick={this.dealCards}>Deal</button>
          <p>Winner: {this.state.roundWinner}</p>
          <p>Player One Rounds Won: {this.state.playerOneRoundsWon}</p>
          <p>Player Two Rounds Won: {this.state.playerTwoRoundsWon}</p>
        </header>
      </div>
    );
  }
}

export default App;
