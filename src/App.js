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
      playerOneScore: 0,
      playerTwoScore: 0,
      cardsLeft: 52,
      isGameOver: false,
    };
  }

  dealCards = () => {
    if (!this.state.isGameOver) {
      this.setState(
        (state) => ({
          // Remove last 2 cards from cardDeck
          cardDeck: state.cardDeck.slice(0, -2),
          // Deal last 2 cards to currCards
          currCards: state.cardDeck.slice(-2),
        }),
        () => {
          this.updateCardsLeft();
          if (!this.state.isGameOver) {
            this.compareCards();
          }
        }
      );
    }
  };

  compareCards = () => {
    const playerOneRank = this.state.currCards[0].rank;
    const playerTwoRank = this.state.currCards[1].rank;
    let playerOneScore = this.state.playerOneScore;
    let playerTwoScore = this.state.playerTwoScore;
    if (playerOneRank > playerTwoRank) {
      playerOneScore += 1;
    } else if (playerOneRank < playerTwoRank) {
      playerTwoScore += 1;
    }
    this.setState((state) => ({
      playerOneScore: playerOneScore,
      playerTwoScore: playerTwoScore,
    }));
  };

  updateCardsLeft = () => {
    this.setState(
      (state) => ({
        cardsLeft: this.state.cardDeck.length,
      }),
      () => {
        this.checkGameOver();
      }
    );
  };

  checkGameOver = () => {
    if (this.state.cardsLeft <= 0) {
      this.setState((state) => ({
        isGameOver: true,
      }));
    }
  };

  componentDidUpdate = () => {};

  render() {
    const currCardElems = this.state.currCards.map(({ name, suit }, index) => (
      // Give each list element a unique key
      <div key={`${name}${suit}`}>
        Player {index + 1}: {name} of {suit}
      </div>
    ));

    /*
    for (let i = 0; i < 5; i++) {
      this.dealCards();
    }*/

    let dealButton;
    if (!this.state.isGameOver) {
      dealButton = <button onClick={this.dealCards}>Deal</button>;
    } else {
      dealButton = "-";
    }
    return (
      <div className="App">
        <header className="App-header">
          <h3>♠️♦️ High Card ♣️♥️</h3>
          {currCardElems}
          <br />
          {dealButton}
          <div>
            <p>Player 1: {this.state.playerOneScore} </p>
            <p>Player 2: {this.state.playerTwoScore} </p>
            <p>Cards Left: {this.state.cardsLeft}</p>
          </div>
        </header>
      </div>
    );
  }
}

export default App;
