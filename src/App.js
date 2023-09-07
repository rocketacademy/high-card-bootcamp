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
    });
  };

  ///// MY FUNCTIONS
  // Returns Boolean based on drawn cards. true if Player wins, false if Computer wins.
  checkScore = () => {
    console.log("started");
    if (this.state.currCards[0].rank > this.state.currCards[1].rank) {
      console.log("returning hello");
      return "you lost";
    } else {
      console.log("returning nooo");
      return false;
    }
  };

  // After getting the bool, setState to record individual scores.
  // Possibly output the round outcome as a string as well.
  outcome = (bool) => {
    if (bool) {
      this.setState({
        playerOneScore: this.state.playerOneScore + 1,
      });
      return <h1>"You Won!</h1>;
    } else {
      this.setState({
        playerTwoScore: this.state.playerTwoScore + 1,
      });
      return <h1>"You Lost!</h1>;
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
              this.outcome(this.checkScore());
            }}
          >
            Deal
          </button>{" "}
          {/* <button onClick={this.dealCards}>Deal</button>{" "} */}
          {/* <h2>{this.checkScore ? "you won" : "you lost"}</h2> */}
        </header>
      </div>
    );
  }
}

export default App;
