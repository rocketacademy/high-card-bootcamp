import React from "react";

import { Alert } from "react-bootstrap";
import "./App.css";
import { makeShuffledDeck } from "./utils.js";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "./logo.png";

class App extends React.Component {
  constructor(props) {
    // Always call super with props in constructor to initialise parent class
    super(props);
    this.state = {
      // Set default value of card deck to new shuffled deck
      cardDeck: makeShuffledDeck(),
      // currCards holds the cards from the current round
      currCards: [],
      indexWinner: -1,
      player1Score: 0,
      player2Score: 0,
      roundWinner: null,
      gameStart: true,
    };
  }

  dealCards = () => {
    // this.state.cardDeck.pop() modifies this.state.cardDeck array
    const newCurrCards = [this.state.cardDeck.pop(), this.state.cardDeck.pop()];

    this.setState(
      {
        currCards: newCurrCards,
      },
      () => {
        this.determineWinner();
      }
    );
  };

  reset = () => {
    this.setState({
      cardDeck: makeShuffledDeck(),
      // currCards holds the cards from the current round
      currCards: [],
      indexWinner: -1,
      player1Score: 0,
      player2Score: 0,
      restart: false,
      roundWinner: null,
    });
  };

  determineWinner = () => {
    //compare rank
    //return winner, either index 0 or 1.
    let temp = -1;

    if (this.state.currCards === null) {
      temp = -1;
    } else if (this.state.currCards[0].rank > this.state.currCards[1].rank) {
      temp = 0;
    } else if (this.state.currCards[1].rank > this.state.currCards[0].rank) {
      temp = 1;
    } else {
      temp = 99;
    }

    this.setState(
      {
        indexWinner: temp,
      },
      () => {
        this.countScore();
      }
    );
  };

  countScore = () => {
    const tempCounter = [0, 0];
    //if indexWinner is 0, add +1 to count index 0, vice versa
    if (this.state.indexWinner === 0) {
      tempCounter[0]++;
    } else if (this.state.indexWinner === 1) {
      tempCounter[1]++;
    }

    this.setState((prevState) => ({
      player1Score: prevState.player1Score + tempCounter[0],
      player2Score: prevState.player2Score + tempCounter[1],
    }));

    this.setState(() => {
      this.checkWinner();
    });
  };

  checkWinner = () => {
    let tempWinner = -1;
    if (this.state.player1Score > this.state.player2Score) {
      tempWinner = 0;
    } else if (this.state.player2Score > this.state.player1Score) {
      tempWinner = 1;
    } else {
      tempWinner = -1;
    }

    this.setState({
      roundWinner: tempWinner,
    });
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

    const imageCard = this.state.currCards.map(({ name, suit }) => (
      <img
        src={require(`./PNG/${name.toLowerCase()}_of_${suit.toLowerCase()}.png`)}
        alt={`${name} of ${suit}`}
        style={{ height: "100px" }}
      />
    ));

    const numRoundsLeft = this.state.cardDeck.length / 2;
    const gameWinnerMessage =
      this.state.roundWinner === -1
        ? "Tie"
        : `🏆Player ${this.state.roundWinner + 1} WON!🏆`;

    return (
      <div className="App">
        <header className="App-header">
          <h3>High Card 🚀</h3>

          {/* {currCardElems} */}
          {/* showing players card */}
          {imageCard[0]}
          <p>Player 1</p>
          {imageCard[1]}
          <p>Player 2</p>

          <br />

          {numRoundsLeft > 0 ? (
            <button onClick={this.dealCards}>Deal</button>
          ) : (
            <button onClick={this.reset}>Reset</button>
          )}

          <p>
            {this.state.indexWinner === -1
              ? ""
              : this.state.indexWinner === 99
              ? `Tie`
              : `Player ${this.state.indexWinner + 1} won!`}
          </p>

          <p>
            Player 1 🏆{this.state.player1Score} -- Player 2 🏆
            {this.state.player2Score}
          </p>

          <p>There are {numRoundsLeft} rounds left</p>

          <h1>{numRoundsLeft === 0 && gameWinnerMessage}</h1>
        </header>
      </div>
    );
  }
}

export default App;
