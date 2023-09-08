import React from "react";
import "./App.css";
import { makeShuffledDeck } from "./utils.js";

// import Card from "./Card.js";

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
      outcomeMsg: "",

      matchesTied: 0,
      matchesPlayed: 0,
      playerOneWins: 0,
      playerTwoWins: 0,
    };
  }

  dealCards = () => {
    // this.state.cardDeck.pop() modifies this.state.cardDeck array
    const newCurrCards = [this.state.cardDeck.pop(), this.state.cardDeck.pop()];

    this.setState({
      currCards: newCurrCards,
      gamePhase: "DRAWN",
    });
  };

  ///// MY FUNCTIONS
  // Button functionality to restart that round.
  restartGame = () => {
    this.setState = {
      cardDeck: makeShuffledDeck(),
      currCards: [],

      gamePhase: "START",
      playerOneScore: 0,
      playerTwoScore: 0,
      outcomeMsg: "Game Restarted",
    };
  };

  // Returns Boolean based on drawn cards. true if Player wins, false if Computer wins.
  checkOutcome = () => {
    if (this.state.gamePhase === "DRAWN") {
      if (this.state.currCards[0].rank > this.state.currCards[1].rank) {
        this.setState({
          gamePhase: "END",
          playerOneScore: this.state.playerOneScore + 1,
          outcomeMsg: "Player Won",
        });
        // return "You Won!";
      } else {
        this.setState({
          gamePhase: "END",
          playerTwoScore: this.state.playerTwoScore + 1,
          outcomeMsg: "Computer Won",
        });
        // return "You Lost!";
      }
    } else {
      return null;
    }
  };

  roundCheck = () => {};

  render() {
    // You can write JavaScript here, just don't try and set your state!

    ///// Q1. Not sure what kind of functions I can write here, versus above, outside of the render function.
    ///// Q2. When can we use const / let etc?
    ///// Q3. Is there a difference in writing: functionname = (input) => { }  vs functionname(input){ } ? I am quite lost cause I thought it was const functionname(input){ }

    const redSuit = {
      color: "red",
    };

    // You can access your current components state here, as indicated below
    const currCardElems = this.state.currCards.map(({ name, suit }) => (
      // Give each list element a unique key
      <div class="indivCard" key={`${name}${suit}`}>
        {{ suit } == "♥️" || { suit } == "♦️" ? (
          <font style={redSuit}>{suit}</font>
        ) : (
          { suit }
        )}
        <br />
        {name}
        <br />
        {suit}
      </div>
    ));

    const outputMessage = <h1>{this.state.outcomeMsg}</h1>;

    return (
      <div className="App">
        {" "}
        <div class="titlecard">
          <h2>
            Player One Score:
            <br /> {this.state.playerOneScore}
          </h2>
          <h1>High Card 🚀</h1>
          <h2>
            Player Two Score: <br />
            {this.state.playerTwoScore}
          </h2>
        </div>
        <button onClick={this.dealCards}>Deal</button>
        <header className="App-header">
          <div class="showcard">
            {/* <Card card={this.state.currCards[0]} /> */}
            <h1>{currCardElems[0]}</h1>
          </div>
          <div class="showcard">
            <h1>{currCardElems[1]}</h1>
          </div>
          {/* <button onClick={this.dealCards}>Deal</button>{" "} */}
          {/* <button
            onClick={() => {
              this.dealCards();
            }}
          >
            Deal
          </button>{" "} */}
        </header>
        {this.checkOutcome()}
        {outputMessage}
        <div class="basecard">
          <h2>
            Cards Remaining:
            <br />
            {this.state.cardDeck.length}
          </h2>
          <h2>
            Matches Played:
            <br />
            {this.state.matchesPlayed}
          </h2>
          <h2>
            Matches Tied:
            <br />
            {this.state.matchesTied}
          </h2>
        </div>
      </div>
    );
  }
}

export default App;
