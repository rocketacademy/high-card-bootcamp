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
      cardsLeft: 0,
      isGameOver: false,
    };
  }

  componentDidMount = () => {
    this.setState({ cardsLeft: this.state.cardDeck.length });
  };

  // dealCards -> updateCardsLeft -> checkGameOver
  //                ↪ !this.state.isGameOver -> this.compareCards

  dealCards = () => {
    const newCurrCards = this.state.cardDeck.slice(-2);
    // compare cards
    const playerOneRank = newCurrCards[0].rank;
    const playerTwoRank = newCurrCards[1].rank;
    let playerOneRoundWon = 0;
    let playerTwoRoundWon = 0;
    if (playerOneRank > playerTwoRank) {
      playerOneRoundWon += 1;
    } else if (playerOneRank < playerTwoRank) {
      playerTwoRoundWon += 1;
    }
    this.setState((prevState) => ({
      // Remove last 2 cards from cardDeck
      cardDeck: prevState.cardDeck.slice(0, -2),
      // Deal last 2 cards to currCards
      currCards: newCurrCards,
      playerOneScore: prevState.playerOneScore + playerOneRoundWon,
      playerTwoScore: prevState.playerTwoScore + playerTwoRoundWon,
      cardsLeft: prevState.cardsLeft - 2,
    }));
  };

  checkGameOver = () => {
    if (this.state.cardsLeft <= 0) {
      this.setState((state) => ({
        isGameOver: true,
      }));
    }
  };

  dealAuto = () => {
    for (let i = 0; i < 25; i++) {
      this.dealCards();
    }
  };

  render() {
    const currCardElems = this.state.currCards.map(({ name, suit }, index) => (
      // Give each list element a unique key
      <div key={`${name}${suit}`}>
        Player {index + 1}: {name} of {suit}
      </div>
    ));

    const dealAuto = <button onClick={this.dealAuto}>Deal 25 times</button>;

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
          {dealAuto}
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
