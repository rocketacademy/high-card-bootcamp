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
      currComputerCards: [],
    };
  }

  dealCards = () => {
    // this.state.cardDeck.pop() modifies this.state.cardDeck array
    const newCurrCards = [this.state.cardDeck.pop(), this.state.cardDeck.pop()];
    const newComputerCurrCards = [
      this.state.cardDeck.pop(),
      this.state.cardDeck.pop(),
    ];
    this.setState({
      currCards: newCurrCards,
      currComputerCards: newComputerCurrCards,
    });
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
    const currComputerCardElems = this.state.currComputerCards.map(
      ({ name, suit }) => (
        // Give each list element a unique key
        <div key={`${name}${suit}`}>
          {name} of {suit}
        </div>
      )
    );

    return (
      <div className="App">
        <header className="App-header">
          <h3>High Card 🚀</h3>
          Player Hand: {currCardElems}
          <br />
          Computer Hand: {currComputerCardElems}
          <br />
          <button onClick={this.dealCards}>Deal</button>
        </header>
      </div>
    );
  }
}

export default App;
