import React from "react";
import "./App.css";
import { makeShuffledDeck } from "./utils.js";
import PlayingCard from "./playingcard";

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
      currWinner: null,

      // State to track the score of each player
      scoreboard: [0, 0],
    };
  }
  // Code to determine who won, Player 1 or 2
  determineWinner = () => {
    const { currCards } = this.state;
    let s1 = this.detSuiteRank(currCards[0]);
    let s2 = this.detSuiteRank(currCards[1]);
    const currWinner =
      currCards[0].rank === currCards[1].rank
        ? s1 > s2
          ? "Player 1"
          : "Player 2"
        : currCards[0].rank > currCards[1].rank
        ? "Player 1"
        : "Player 2";

    this.setState({ currWinner });
    if (currWinner === "Player 1") {
      this.updateScore(1);
    } else if (currWinner === "Player 2") {
      this.updateScore(2);
    }

    
  };

  detSuiteRank = (card) => {
    switch (card.suit) {
      case "Hearts":
        return 3;
      case "Spades":
        return 4;
      case "Clubs":
        return 2;
      case "Diamonds":
        return 1;
      default:
        return null;
    }
  };
  updateScore = (n) => {
    const { scoreboard } = this.state;
    if (n === 1) {
      scoreboard[0]++;
    } else if (n === 2) {
      scoreboard[1]++;
    }
    this.setState({ scoreboard });
  };

  dealCards = () => {
    // this.state.cardDeck.pop() modifies this.state.cardDeck array
    if (this.state.cardDeck !== []) {
      const newCurrCards = [
        this.state.cardDeck.pop(),
        this.state.cardDeck.pop(),
      ];
      // console.log(this.state.cardDeck);
      this.setState(
        {
          currCards: newCurrCards,
        },
        () => {
          // Call determineWinner after the state has been updated
          this.determineWinner();
        }
      );
    } else {
      return (
        <p>
          The deck is out of cards. Please click 'restart to restart the game.
        </p>
      );
    }
  };

  restartGame = () => {
    this.setState({
      cardDeck: makeShuffledDeck(),
      currCards: [],
      currWinner: null,
      scoreboard: [0, 0],
    });
  };
  render() {
    //Code to check the winner: if cardRank not same, return higher cardRank, if same, check for suite and return higher suite

    const { cardDeck, currCards, currWinner, scoreboard } = this.state;
    const currCardElems = currCards.map(({ name, suit }, index) => (
      // Give each list element a unique key //{name} of {suit}

      <div key={`${name}${suit}`}>
        Player {index + 1} have: {PlayingCard(currCards[index])}
      </div>
    ));

    const hideOutput = () => {
      if (currWinner) {
        return (
          <div>
            <h5>{currWinner} has won this round</h5>
            <p>Player 1 has {scoreboard[0]} points.</p>
            <p>Player 2 has {scoreboard[1]} points.</p>
          </div>
        );
      } else {
        return (
          <div>
            <p>Press 'Deal' to start the game.</p>
          </div>
        );
      }
    };

    const gameWinner =
      scoreboard[0] > scoreboard[1] ? (
        <h3>Player 1 has won this game</h3>
      ) : scoreboard[0] < scoreboard[1] ? (
        <h3>Player 2 has won this game</h3>
      ) : (
        <h3>Both players are tied</h3>
      );

    return (
      <div className="App">
        <header className="App-header">
          <h3>High Card 🚀</h3>
          {currCardElems}
          {hideOutput()}
          <br />
          {cardDeck.length === 0 ? (
            <div>
              {gameWinner}
              <p>Press Restart to restart the game</p>
            </div>
          ) : (
            <button onClick={this.dealCards}>Deal</button>
          )}
          <br />
          <br />
          {cardDeck.length === 0 ? <br /> : <p>Reset the game:</p>}

          <button onClick={this.restartGame}>Restart</button>
        </header>
      </div>
    );
  }
}

export default App;
