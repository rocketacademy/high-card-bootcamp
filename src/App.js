import React from "react";
import "./App.css";
import { makeShuffledDeck } from "./utils.js";
import Card from "./Components/Card";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cardDeck: makeShuffledDeck(),
      currCards: [],
      player1Score: 0,
      player2Score: 0,
      gameOver: false,
      handWinner: "",
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
      handWinner: "",
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
    let result = "";
    let finalResult = "";

    if (this.addScore(p1Card, p2Card) === this.addScore(p2Card, p1Card)) {
      result = "You draw this hand!";
    } else if (this.addScore(p1Card, p2Card) === 1) {
      result = "Player 1 wins this hand!";
    } else {
      result = "Player 2 wins this hand!";
    }

    if (cards.length === 2) {
      if (p1Score === p2Score) {
        finalResult = "It's a draw!";
      } else if (p1Score > p2Score) {
        finalResult = "Player 1 wins!";
      } else {
        finalResult = "Player 2 wins!";
      }
      this.setState({
        gameOver: true,
        outcome: finalResult,
      });
    }
    this.setState({
      player1Score: p1Score,
      player2Score: p2Score,
      handWinner: result,
    });
  };

  playRound = () => {
    this.dealCards();
    this.updateScore();
  };

  addScore = (card1, card2) => {
    return card1.rank > card2.rank ? 1 : 0;
  };

  currentWinner = () => {
    let output = "";
    if (!this.state.gameOver) {
      if (this.state.handWinner === "") {
        output = "Click deal to begin!";
      } else {
        output = this.state.handWinner;
      }
    }
    return output;
  };

  getScoreTally = () => {
    return this.state.gameOver
      ? `Game Over! ${this.state.outcome}`
      : `Player 1: ${this.state.player1Score} • Player 2: ${this.state.player2Score}`;
  };

  render() {
    const currCardElems = this.state.currCards.map(
      ({ name, suit, emoji }, index) => (
        // Give each list element a unique key
        <div key={`${name}${suit}`}>
          <p>Player {index + 1}:</p>
          <Card name={name} emoji={emoji} suit={suit} />
        </div>
      )
    );

    return (
      <div>
        <div className="playing-area">
          <div className="buttons">
            <button onClick={this.playRound} disabled={this.state.gameOver}>
              Deal
            </button>
            <button onClick={this.restartGame} disabled={!this.state.gameOver}>
              Restart
            </button>
          </div>
          <div className="cards">{currCardElems}</div>
          <br />
          <div className="scores">
            <h4>{this.currentWinner()}</h4>
            <h4>{this.getScoreTally()}</h4>
          </div>
        </div>
        <h1 id="high">High</h1>
        <h1 id="card">Card</h1>
      </div>
    );
  }
}

export default App;
