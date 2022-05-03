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
    };
    // This binding is necessary to make `this` work in the callback
    this.dealCards = this.dealCards.bind(this);
  }

  dealCards() {
    // this.state.cardDeck.pop() modifies this.state.cardDeck array
    const newCurrCards = [this.state.cardDeck.pop(), this.state.cardDeck.pop()];
    this.setState({
      currCards: newCurrCards,
    });
  }

  render() {
    const currCardElems = this.state.currCards.map(({ name, suit }) => (
      // Give each list element a unique key
      <div key={`${name}${suit}`}>
        {name}
        {suit}
      </div>
    ));

    return (
      <div>
        <h3>Cards</h3>
        {currCardElems}
        <br />
        <button onClick={this.dealCards}>Deal</button>
      </div>
    );
  }
}

export default App;
