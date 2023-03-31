import React from "react";
import "./App.css";
import { makeShuffledDeck } from "./utils.js";

const isArrSame = (arr1, arr2) => {
  if (arr1.length === arr2.length) {
    for (let i = 0; i < arr1.length; i++) {
      if (arr1[i] !== arr2[i]) {
        return false;
      }
    }
  } else {
    return false;
  }

  return true;
};

class App extends React.Component {
  constructor(props) {
    // Always call super with props in constructor to initialise parent class
    super(props);
    this.state = {
      // Set default value of card deck to new shuffled deck
      cardDeck: makeShuffledDeck(),
      // currCards holds the cards from the current round
      currCards: [],
      currentScorePlayer1: 0,
      currentScorePlayer2: 0,
      announcement: "",
      gameWinner: "",
    };
  }

  //code for declaration of winner at the end of each game with option to restart game

  dealCards = () => {
    this.setState((state) => ({
      // Remove last 2 cards from cardDeck
      cardDeck: state.cardDeck.slice(0, -2),
      // Deal last 2 cards to currCards
      currCards: state.cardDeck.slice(-2),
    }));
  };

  currentScore = () => {
    if (this.state.currCards.length !== 0) {
      // } else {
      //this means player1 has won the round:
      let Player1Card = this.state.currCards[0];
      let Player2Card = this.state.currCards[1];

      if (Player1Card.rank > Player2Card.rank) {
        this.setState({
          currentScorePlayer1: this.state.currentScorePlayer1 + 1,
          announcement: "Player 1 won the round",
        });
        console.log(this.state.currentScorePlayer1);

        //this means player2 has won the round:
      } else if (Player2Card.rank > Player1Card.rank) {
        this.setState({
          currentScorePlayer2: this.state.currentScorePlayer2 + 1,
          announcement: "Player 2 won the round",
        });
        console.log(this.state.currentScorePlayer2);
      } else {
        this.setState({
          announcement: "It's a Draw.",
        });
      }
    }
  };

  declareGameWinner = () => {
    if (this.state.cardDeck.length === 0) {
      if (this.state.currentScorePlayer1 > this.state.currentScorePlayer2) {
        this.setState({
          gameWinner:
            "Player 1 won the game. Please hit restart to restart game.",
        });
      } else if (
        this.state.currentScorePlayer2 > this.state.currentScorePlayer1
      ) {
        this.setState({
          gameWinner:
            "Player 2 won the game. Please hit restart to restart game.",
        });
      } else {
        this.setState({
          gameWinner:
            "It's a tie for all rounds played. Please hit restart to restart game.",
        });
      }
    }
  };

  handleClick = () => {
    this.dealCards();

    this.currentScore();
    this.declareGameWinner();
  };

  handleRestart = () => {
    this.restartGame();
  };

  restartGame = () => {
    this.setState({
      cardDeck: makeShuffledDeck(),
      currCards: [],
      currentScorePlayer1: 0,
      currentScorePlayer2: 0,
      announcement: "",
      gameWinner: "",
    });
  };

  componentDidUpdate(prevProps, prevState) {
    if (isArrSame(prevState.currCards, this.state.currCards) === false) {
      this.currentScore();
    }
    if (
      prevState.gameWinner ===
        "Player 1 won the game. Please hit restart to restart game." ||
      prevState.gameWinner ===
        "Player 2 won the game. Please hit restart to restart game." ||
      prevState.gameWinner ===
        "It's a tie for all rounds played. Please hit restart to restart game."
    ) {
      this.restartGame();
    }
  }

  render() {
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
          <button onClick={this.handleClick}>Deal</button>
          <button onClick={this.handleRestart}>Restart</button>
          <h1>{this.state.gameWinner}</h1>
          <h1>{this.state.announcement}</h1>
          <h1>Player 1's current score is {this.state.currentScorePlayer1}</h1>
          <h1>Player 2's current score is {this.state.currentScorePlayer2}</h1>
        </header>
      </div>
    );
  }
}

export default App;
