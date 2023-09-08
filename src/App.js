import React from "react";
import "./App.css";
import { makeShuffledDeck } from "./utils.js";
// import { Box } from "@chakra-ui/react";

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
      playerOneWins: 0,
      playerTwoWins: 0,
    };
  }

  dealCards = () => {
    if (this.state.cardDeck.length !== 0) {
      // this.state.cardDeck.pop() modifies this.state.cardDeck array
      const newCurrCards = [
        this.state.cardDeck.pop(),
        this.state.cardDeck.pop(),
      ];

      this.setState({
        currCards: newCurrCards,
        gamePhase: "DRAWN",
      });
    } else {
      this.setState({
        gamephase: "Press Reset To Play Again!",
      });
    }
  };

  ///// MY FUNCTIONS
  // Button functionality to restart that round.

  restartGame = () => {
    this.setState({
      cardDeck: makeShuffledDeck(),
      currCards: [],

      gamePhase: "START",
      playerOneScore: 0,
      playerTwoScore: 0,
      outcomeMsg: "Game Restarted",
    });
  };

  checkScore = () => {
    if (this.state.gamePhase === "END" && this.state.cardDeck.length === 0) {
      console.log("ended");
      if (this.state.playerOneScore > this.state.playerTwoScore) {
        this.setState({
          playerOneScore: this.state.playerOneScore + 1,
          playerOneWins: this.state.playerOneWins + 1,
          outcomeMsg: "Player One Wins the Match!",
        });
      } else if (this.state.playerTwoScore > this.state.playerOneScore) {
        this.setState({
          playerTwoScore: this.state.playerTwoScore + 1,
          playerTwoWins: this.state.playerTwoWins + 1,
          outcomeMsg: "Player Two Wins the Match!",
        });
      } else if (this.state.playerOneScore === this.state.playerTwoScore) {
        this.setState({
          matchesTied: this.state.matchesTied + 1,
          outcomeMsg: "It's a Tie..",
        });
      }
    }
  };

  // Returns Boolean based on drawn cards. true if Player wins, false if Computer wins.
  checkOutcome = () => {
    if (this.state.gamePhase === "DRAWN" && this.state.cardDeck.length !== 0) {
      if (this.state.currCards[0].rank > this.state.currCards[1].rank) {
        this.setState({
          gamePhase: "END",
          playerOneScore: this.state.playerOneScore + 1,
          outcomeMsg: "Player Won!",
        });
        // return "You Won!";
      } else {
        this.setState({
          gamePhase: "END",
          playerTwoScore: this.state.playerTwoScore + 1,
          outcomeMsg: "Computer Won!",
        });
        // return "You Lost!";
      }
    } else if (
      this.state.gamePhase === "END" &&
      this.state.cardDeck.length === 2
    ) {
      console.log("ended branch");
    }
  };

  roundCheck = () => {};

  render() {
    // You can write JavaScript here, just don't try and set your state!

    ///// Q1. Not sure what kind of functions I can write here, versus above, outside of the render function.
    ///// Q2. When can we use const / let etc?
    ///// Q3. Is there a difference in writing: functionname = (input) => { }  vs functionname(input){ } ? I am quite lost cause I thought it was const functionname(input){ }

    // const redSuit = {
    //   textAlign: "center",
    //   color: "red",
    //   fontSize: 50,
    // };

    // You can access your current components state here, as indicated below
    const currCardElems = this.state.currCards.map(({ name, suit }) => (
      // Give each list element a unique key
      <div
        className="indivCard text-4xl font-medium shadow-md"
        key={`${name}${suit}`}
      >
        {suit}
        <br />
        {name}
        <br />
        {suit}
      </div>
    ));

    const outputMessage = (
      <h1 className="text-5xl font-bold tracking-tight text-slate-900">
        {this.state.outcomeMsg}
      </h1>
    );

    return (
      <div className="App">
        <div className="titlecard gap-10">
          <h2 className="text-3xl font-bold dark:text-white block max-w-sm bg-white border border-gray-200 rounded-lg shadow p-5">
            Player One
            <br /> Round Score:
            <br /> {this.state.playerOneScore}
          </h2>
          <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl  pt-5">
            HIGH CARD 🚀
          </h1>
          <h2 className="text-3xl font-bold dark:text-white block max-w-sm bg-white border border-gray-200 rounded-lg shadow p-5">
            Player Two <br />
            Round Score: <br />
            {this.state.playerTwoScore}
          </h2>
        </div>
        <div className="menu">
          <button
            className=" text-2xl bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
            onClick={this.dealCards}
          >
            DEAL
          </button>
          <button
            className=" text-2xl bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
            onClick={this.restartGame}
          >
            RESET
          </button>
        </div>
        <header className="App-header">
          <div className="showcard">
            {/* <Card card={this.state.currCards[0]} /> */}
            <h1>{currCardElems[0]}</h1>
          </div>
          {this.checkOutcome()}
          {outputMessage}
          <div className="showcard">
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
        {/* {this.checkOutcome()}
        {outputMessage} */}
        <div className="basecard text-xl font-bold p-10 gap-10">
          <h2>
            Cards Remaining:
            <br />
            {this.state.cardDeck.length}
          </h2>
          <h2 className="text-3xl">
            Score Tally:
            <br />
            {this.state.playerOneWins} - {this.state.playerTwoWins}
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
