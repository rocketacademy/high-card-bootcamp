import React from "react";
import "./App.css";
import { makeShuffledDeck } from "./utils.js";
import Card from "./Components/Card";

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

  componentDidUpdate = (prevProps, prevState) => {
    if (!isArrSame(prevState.currCards, this.state.currCards)) {
      this.updateScore();
    }
  };
  updateScore = () => {
    if (this.state.currCards.length !== 0) {
      let p1Card = this.state.currCards[0];
      let p2Card = this.state.currCards[1];
      let result = "";
      let finalResult = "";

      if (p1Card.rank === p2Card.rank) {
        result = "You draw this hand!";
      } else if (p1Card.rank > p2Card.rank) {
        result = "Player 1 wins this hand!";
        this.setState({
          player1Score: this.state.player1Score + 1,
        });
      } else {
        result = "Player 2 wins this hand!";
        this.setState({
          player2Score: this.state.player2Score + 1,
        });
      }

      this.setState({ handWinner: result });

      if (this.state.cardDeck.length === 0) {
        if (this.state.player1Score === this.state.player2Score) {
          finalResult = "It's a draw!";
        } else if (this.state.player1Score > this.state.player2Score) {
          finalResult = "Player 1 wins!";
        } else {
          finalResult = "Player 2 wins!";
        }
        this.setState({
          gameOver: true,
          outcome: finalResult,
        });
      }
    }
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
    let currCardElems;
    if (this.state.currCards.length !== 0) {
      currCardElems = this.state.currCards.map(
        ({ name, suit, emoji }, index) => (
          <div key={`${name}${suit}`}>
            <p>Player {index + 1}:</p>
            <Card name={name} emoji={emoji} suit={suit} />
          </div>
        )
      );
    } else {
      currCardElems = <h2>HIGH CARD</h2>;
    }

    return (
      <div>
        <div className="playing-area">
          <div className="buttons">
            <button onClick={this.dealCards} disabled={this.state.gameOver}>
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
