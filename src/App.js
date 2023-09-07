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

      gamePhase: "START",
      playerOneScore: 0,
      playerTwoScore: 0,
    };
  }

  dealCards = () => {
    // this.state.cardDeck.pop() modifies this.state.cardDeck array
    const newCurrCards = [this.state.cardDeck.pop(), this.state.cardDeck.pop()];
    this.setState({
      currCards: newCurrCards,
      gamePhase: "WEIRD",
    });
  };

  ///// MY FUNCTIONS
  // Returns Boolean based on drawn cards. true if Player wins, false if Computer wins.
  checkOutcome = () => {
    if (this.state.gamePhase === "WEIRD") {
      if (this.state.currCards[0].rank > this.state.currCards[1].rank) {
        this.setState({
          gamePhase: "END",
          playerOneScore: this.state.playerOneScore + 1,
        });
        return "You Won!";
      } else {
        this.setState({
          gamePhase: "END",
          playerTwoScore: this.state.playerTwoScore + 1,
        });
        return "You Lost!";
      }
    } else {
      return null;
    }
  };

  render() {
    // You can write JavaScript here, just don't try and set your state!

    ///// Q1. Not sure what kind of functions I can write here, versus above, outside of the render function.
    ///// Q2. When can we use const / let etc?
    ///// Q3. Is there a difference in writing: functionname = (input) => { }  vs functionname(input){ } ? I am quite lost cause I thought it was const functionname(input){ }

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
          <button
            onClick={() => {
              this.dealCards();
            }}
          >
            Deal
          </button>{" "}
          <h1>
            {this.state.currCards.length !== 0 && this.stategamePhase === "END"
              ? this.checkOutcome()
              : null}
          </h1>
          {/* <button onClick={this.dealCards}>Deal</button>{" "} */}
          {/* <h1>{this.checkOutcome()}</h1> */}
          {/* <h1>{resultMsg}</h1> */}
        </header>
      </div>
    );
  }
}

export default App;
