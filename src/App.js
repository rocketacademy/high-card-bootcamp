import React from "react";
import "./App.css";
import { makeShuffledDeck } from "./utils.js";

class App extends React.Component {
  // each time deal button is pressed
  // the card state is an array of two cards, the first and second card
  // The game: Take two cards,
  // Deal - deals two cards
  // need an array to track of # of rounds. Have a score state [0,0]

  constructor(props) {
    // Always call super with props in constructor to initialise parent class
    super(props);
    this.state = {
      // Set default value of card deck to new shuffled deck
      cardDeck: makeShuffledDeck(),
      // currCards holds the cards from the current round
      currCards: [],
    };
    this.scoreState = [0, 0];
    this.rounds = this.cardDeck.size();
  }

  //
  dealCards = () => {
    // this.state.cardDeck.pop() modifies this.state.cardDeck array
    const newCurrCards = [this.state.cardDeck.pop(), this.state.cardDeck.pop()];
    // creates a new array, with 2 cards from the deck
    // newCurrCards is the 2 new cards
    // whereas
    this.setState({
      currCards: newCurrCards,
    });
    // determine which player has won the game
    if (this.state.currCards[0].rank > this.state.currCards[1].rank) {
      // Player A wins, update the score
      this.scoreState[0] = this.scoreState[0] + 1;
    } else if (this.state.currCards[0].rank < this.state.currCards[1].rank) {
      // Player B wins, update the score
      this.scoreState[1] = this.scoreState[1] + 1;
    } else {
      // Tie, no update to the score
    }
  };

  render() {
    // You can write JavaScript here, just don't try and set your state!
    // ! Why cannot set state here?

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
          <div>Remaining cards: </div>
          <div>
            Player 1:{this.scoreState[0]} vs. Player 2:{this.scoreState[1]}
          </div>
          <br />
          <button onClick={this.dealCards}>Deal</button>
        </header>
      </div>
    );
  }
}

export default App;
