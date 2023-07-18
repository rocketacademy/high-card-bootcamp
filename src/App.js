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

      roundWinner: undefined,
      roundScores: [0, 0],
      roundsLeft: 26,
      gameWinner: undefined,
    };
  }

  dealCards = () => {
    // this.state.cardDeck.pop() modifies this.state.cardDeck array
    const newCurrCards = [this.state.cardDeck.pop(), this.state.cardDeck.pop()];
    this.setState({
      currCards: newCurrCards,
    });

    const ranks = newCurrCards.map((card) => card.rank);
    const roundScores = this.state.roundScores;

    if (ranks[0] > ranks[1]) {
      this.setState({
        roundWinner: "Player 1 won this round.",
        roundScores: [roundScores[0] + 1, roundScores[1]],
        roundsLeft: this.state.roundsLeft - 1,
      });
    } else if (ranks[0] < ranks[1]) {
      this.setState({
        roundWinner: "Player 2 won this round.",
        roundScores: [roundScores[0], roundScores[1] + 1],
        roundsLeft: this.state.roundsLeft - 1,
      });
    } else {
      this.setState({
        roundWinner: "This round is a tie!",
        roundsLeft: this.state.roundsLeft - 1,
      });
    }
  };

  render() {
    // You can write JavaScript here, just don't try and set your state!

    // You can access your current components state here, as indicated below
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
          <br />
          {this.state.roundWinner}
        </header>
      </div>
    );
  }
}

export default App;
