import React from "react";
import "./App.css";
import { makeShuffledDeck } from "./utils.js";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cardDeck: makeShuffledDeck(),
      currCards: [],
      player1Score: 0,
      player2Score: 0,
      gameOver: false,
      outcome: "",
    };
  }

  restartGame = () => {
    this.setState({
      cardDeck: makeShuffledDeck(),
      currCards: [],
      player1Score: 0,
      player2Score: 0,
      gameOver: false,
      outcome: "",
    });
  };

  dealCards = () => {
    let cards = this.state.cardDeck;
    this.setState({
      cardDeck: cards.slice(0, -2),
      currCards: cards.slice(-2),
    });
  };

  updateScore = () => {
    let cards = this.state.cardDeck;
    let p1Card = cards[this.state.cardDeck.length - 2];
    let p2Card = cards[this.state.cardDeck.length - 1];
    let p1Score = this.state.player1Score + this.addScore(p1Card, p2Card);
    let p2Score = this.state.player2Score + this.addScore(p2Card, p1Card);
    if (cards.length === 2) {
      let result = "";
      if (p1Score === p2Score) {
        result = "It's a draw!";
      } else if (p1Score > p2Score) {
        result = "Player 1 wins!";
      } else {
        result = "Player 2 wins!";
      }
      this.setState({
        gameOver: true,
        outcome: result,
      });
    }
    this.setState({
      player1Score: p1Score,
      player2Score: p2Score,
    });
  };

  playRound = () => {
    this.dealCards();
    this.updateScore();
  };

  addScore = (card1, card2) => {
    return card1.rank > card2.rank ? 1 : 0;
  };

  getScoreTally = () => {
    return this.state.gameOver
      ? `Game Over! ${this.state.outcome}`
      : `Player 1: ${this.state.player1Score}, Player 2: ${this.state.player2Score}`;
  };

  render() {
    const currCardElems = this.state.currCards.map(({ name, suit }, index) => (
      // Give each list element a unique key
      <div key={`${name}${suit}`}>
        Player {index + 1}: {name} of {suit}
      </div>
    ));

    return (
      <div className="App">
        <header className="App-header">
          <h3>High Card 🚀</h3>
          {currCardElems}
          <br />
          <button onClick={this.playRound} disabled={this.state.gameOver}>
            Deal
          </button>
          <button onClick={this.restartGame} disabled={!this.state.gameOver}>
            Restart
          </button>

          <h2>{this.getScoreTally()}</h2>
        </header>
      </div>
    );
  }
}

export default App;
