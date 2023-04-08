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
      // State to track who won from the current round
      currWinner: " ",
      // State to track the score of each player
      currScore: [0, 0],
      // State to track number of rounds remaining
      remainingRounds: 26,
    };
  }

  dealCards = () => {
    this.setState(
      (state) => ({
        // Remove last 2 cards from cardDeck
        cardDeck: state.cardDeck.slice(0, -2),
        // Deal last 2 cards to currCards
        currCards: state.cardDeck.slice(-2),
        // Reduce remaining rounds by 1
        remainingRounds: state.remainingRounds - 1,
      }),
      () => {
        // Call determineWinner after the state has been updated
        this.determineWinner();
        // Call updateScore after the state has been updated
        this.updateScore();
      }
    );
  };

  // Code to determine who won, Player 1 or 2
  determineWinner = () => {
    const { currCards } = this.state;
    const currWinner =
      currCards[0].rank === currCards[1].rank
        ? "No player has won this round"
        : currCards[0].rank > currCards[1].rank
        ? "Player 1 has won this round"
        : "Player 2 has won this round";

    // Code to keep score of how many rounds each Player has won
    this.setState({ currWinner });
  };

  updateScore = () => {
    // Within each method, we need to tell the computer that a particular const is referring to one of its states
    const { currCards, currScore } = this.state;

    if (currCards[0].rank > currCards[1].rank) {
      currScore[0]++;
    } else if (currCards[0].rank < currCards[1].rank) {
      currScore[1]++;
    } else {
    }

    this.setState({ currScore });
  };

  handleRestart = () => {
    this.setState({
      cardDeck: makeShuffledDeck(),
      currCards: [],
      currWinner: " ",
      currScore: [0, 0],
      remainingRounds: 26,
    });
  };

  render() {
    const { currScore, cardDeck, currCards, remainingRounds } = this.state;

    const currCardElems = this.state.currCards.map(({ name, suit }) => (
      // Give each list element a unique key
      <div key={`${name}${suit}`}>
        {name} of {suit}
      </div>
    ));

    const playerScores = currScore.map((score, index) => (
      <li key={`player${index + 1}`}>
        Player {index + 1}: {score}
      </li>
    ));

    const gameWinner =
      currScore[0] > currScore[1]
        ? "Player 1 has won the game"
        : currScore[0] < currScore[1]
        ? "Player 2 has won the game"
        : "Both players are tied";

    return (
      <div className="App">
        <header className="App-header">
          <h3>High Card 🚀</h3>
          {currCardElems}
          <br />
          {remainingRounds === 0 ? (
            <div>
              {gameWinner}
              <br />
              <br />
              <button onClick={this.handleRestart}>Restart</button>
            </div>
          ) : (
            <div>
              <button onClick={this.dealCards}>Deal</button>
              <br />
              <br />
              {this.state.currWinner}
            </div>
          )}
          <br />
          Current score: <br />
          {playerScores}
          <p>Remaining rounds: {this.state.remainingRounds}</p>
        </header>
      </div>
    );
  }
}

export default App;
