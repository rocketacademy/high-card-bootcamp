import React from "react";
import "./App.css";
import { makeShuffledDeck } from "./utils.js";
import PlayingCard from "./cardimages";

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
      roundWinner: "",
      score: [0, 0],
      overallWinner: "",
      roundsLeft: 26,
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
        roundsLeft: this.state.roundsLeft - 1,
      },
      () => this.determineWinner()
    );
    if (this.state.cardDeck.length === 0) {
      this.setState(() => this.determineOverallWinner());
    }
  };

  determineWinner = () => {
    const playerRank = this.state.currCards[0].rank;
    const computerRank = this.state.currComputerCards[0].rank;
    let playerScore = this.state.score[0];
    let computerScore = this.state.score[1];
    if (playerRank > computerRank) {
      this.setState({
        roundWinner: "Player",
        score: [(playerScore += 1), computerScore],
      });
    } else if (playerRank === computerRank) {
      this.setState({ roundWinner: "Draw" });
    } else {
      this.setState({
        roundWinner: "Computer",
        score: [playerScore, (computerScore += 1)],
      });
    }
  };

  determineOverallWinner = () => {
    const playerFinalScore = this.state.score[0];
    const computerFinalScore = this.state.score[1];

    if (playerFinalScore > computerFinalScore) {
      this.setState({ overallWinner: "Player wins" });
    } else if (playerFinalScore === computerFinalScore) {
      this.setState({ overallWinner: "It's a draw" });
    } else {
      this.setState({ overallWinner: "Computer wins" });
    }
  };

  restartGame = () => {
    this.setState({
      cardDeck: makeShuffledDeck(),
      currCards: [],
      currComputerCards: [],
      roundWinner: "",
      score: [0, 0],
      overallWinner: "",
      roundsLeft: 26,
    });
  };

  render() {
    // You can write JavaScript here, just don't try and set your state!

    // You can access your current components state here, as indicated below
    const currCardElems = this.state.currCards.map(({ name, suit }) => (
      // Give each list element a unique key
      <>
        <div key={`${name}${suit}`}>{/*{name} of {suit}*/}</div>
        <div>
          <PlayingCard value={name} suit={suit} />
        </div>
      </>
    ));
    const currComputerCardElems = this.state.currComputerCards.map(
      ({ name, suit }) => (
        // Give each list element a unique key
        <>
          <div key={`${name}${suit}`}>{/* {name} of {suit}*/}</div>
          <div>
            <PlayingCard value={name} suit={suit} />
          </div>
        </>
      )
    );
    const currWinner = this.state.roundWinner;
    const currScore = `Player score: ${this.state.score[0]}, Computer Score: ${this.state.score[1]}`;
    const overallWinner = this.state.overallWinner;
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
          <br />
          Rounds Left: {this.state.roundsLeft}
          <br />
          {overallWinner}
          <br />
          {overallWinner ? (
            <button onClick={this.restartGame}>Restart</button>
          ) : (
            <button onClick={this.dealCards}>Deal</button>
          )}
        </header>
      </div>
    );
  }
}

export default App;
