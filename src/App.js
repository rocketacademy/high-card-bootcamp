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
      currRoundWinner: null,
      playerOneNumOfWins: 0,
      playerTwoNumOfWins: 0,
      roundNumber: 0,
    };
  }

  dealCards = () => {
    // this.state.cardDeck.pop() modifies this.state.cardDeck array
    const newCurrCards = [this.state.cardDeck.pop(), this.state.cardDeck.pop()]; // each player gets one card
    this.setState({
      currCards: newCurrCards,
    });
    this.determineThisRoundWinner(newCurrCards);
  };
  //function to determine the winner of the round
  determineThisRoundWinner = (currCards) => {
    const newCurrRoundWinner =
      currCards[0].rank === currCards[1].rank
        ? "It's a tie!"
        : currCards[0].rank > currCards[1].rank
        ? "Player 1 wins!"
        : "Player 2 wins!";
    this.setState({ currRoundWinner: newCurrRoundWinner });
  };

  render() {
    // You can write JavaScript here, just don't try and set your state!

    // You can access your current components state here, as indicated below
    const currCardElems = this.state.currCards.map(({ name, suit }, i) => (
      // Give each list element a unique key
      <div key={`${name}${suit}`}>
        Player {i + 1} got {name} of {suit}
      </div>
    ));

    return (
      <div className="App">
        <header className="App-header">
          <h3>High Card 🚀</h3>
          {currCardElems}

          {this.state.currRoundWinner}
          <br />
          <button onClick={this.dealCards}>Deal</button>
        </header>
      </div>
    );
  }
}

export default App;
