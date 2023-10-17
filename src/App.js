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
      winner: "",
      score: [0, 0],
    };
  }

  dealCards = () => {
    // this.state.cardDeck.pop() modifies this.state.cardDeck array
    const newCurrCards = [this.state.cardDeck.pop()];
    const newComputerCurrCards = [this.state.cardDeck.pop()];
    this.setState(
      {
        currCards: newCurrCards,
        currComputerCards: newComputerCurrCards,
      },
      () => this.determineWinner(),
      () => this.updateScore()
    );
  };

  determineWinner = () => {
    const playerRank = this.state.currCards[0].rank;
    const computerRank = this.state.currComputerCards[0].rank;
    if (playerRank > computerRank) {
      this.setState({ winner: "Player" });
    } else if (playerRank === computerRank) {
      this.setState({ winner: "Draw" });
    } else {
      this.setState({ winner: "Computer" });
    }
  };

  updateScore = () => {
    let playerScore = this.state.score[0];
    let computerScore = this.state.score[1];
    const currWinner = this.state.winner;
    if (currWinner === "Player") {
      this.setState({ score: [(playerScore += 1), computerScore] });
    } else if (currWinner === "Computer") {
      this.setState({ score: [playerScore, (computerScore += 1)] });
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
    const currComputerCardElems = this.state.currComputerCards.map(
      ({ name, suit }) => (
        // Give each list element a unique key
        <div key={`${name}${suit}`}>
          {name} of {suit}
        </div>
      )
    );
    const currWinner = this.state.winner;
    const currScore = `Player score: ${this.state.score[0]}, Computer Score: ${this.state.score[1]}`;

    return (
      <div className="App">
        <header className="App-header">
          <h3>High Card 🚀</h3>
          Player Hand: {currCardElems}
          <br />
          Computer Hand: {currComputerCardElems}
          <br />
          {currWinner}
          <br />
          {currScore}
          <button onClick={this.dealCards}>Deal</button>
        </header>
      </div>
    );
  }
}

export default App;
