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
  }

  dealCards = () => {
    // this.state.cardDeck.pop() modifies this.state.cardDeck array
    const newCurrCards = [this.state.cardDeck.pop(), this.state.cardDeck.pop()];
    this.setState({
      currCards: newCurrCards,
    });
  };

  // const function checkScore(){

  // }
  // Returns Boolean based on drawn cards. true if Player wins, false if Computer wins.
  // checkScore = () => {
  //   console.log("started");
  //   console.log(this.state.currCards[0].rank);
  //   if (this.state.currCards[0].rank > this.state.currCards[1].rank) {
  //     return <h1>you won!</h1>;
  //   } else {
  //     return <h1>you lost!</h1>;
  //   }
  // };
  checkScore = () => {
    console.log("started");
    if (this.state.currCards[0].rank > this.state.currCards[1].rank) {
      return <h1>hello</h1>;
    } else {
      return <h1>noo</h1>;
    }
  };

  // OLD FUNCTION
  // checkScore() {
  //   console.log("started");
  //   if (this.state.currCards[0].rank > this.state.currCards[1].rank) {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // }

  render() {
    // You can write JavaScript here, just don't try and set your state!

    ///// Not sure what kind of functions I can write here

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
          {/* <button onClick={this.dealCards}>Deal</button>{" "} */}
          <h2>{this.checkScore}</h2>
          {/* <h2>{this.checkScore ? "you won" : "you lost"}</h2> */}
        </header>
      </div>
    );
  }
}

export default App;
