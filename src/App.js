import React from "react";
import "./App.css";
import { makeShuffledDeck } from "./utils.js";
import { imageMap } from "./images";

const RANK_MAP = {
  2: "Two",
  3: "Three",
  4: "Four",
  5: "Five",
  6: "Six",
  7: "Seven",
  8: "Eight",
  9: "Nine",
  10: "Ten",
  11: "Jack",
  12: "Queen",
  13: "King",
  14: "Ace",
};

// Determine who has won each round (Player 1 or Player 2)
// Keep score during each game (how many rounds has each player won)
// Declare a winner at the end of each game when the deck has run out of cards, and give the players the option to restart the game.

class App extends React.Component {
  constructor(props) {
    // Always call super with props in constructor to initialise parent class
    super(props);
    this.state = {
      // Set default value of card deck to new shuffled deck
      cardDeck: makeShuffledDeck(),
      // currCards holds the cards from the current round
      currCards: [],
      winnerOfRound: 0,
      message: "",
      playerOneScore: 0,
      playerTwoScore: 0,
      numOfRounds: 26,
    };
  }

  dealCards = () => {
    this.setState((state) => ({
      // Remove last 2 cards from cardDeck
      cardDeck: state.cardDeck.slice(0, -2),
      // Deal last 2 cards to currCards
      currCards: state.cardDeck.slice(-2),
    }));
  };

  // check for winner using rank
  // ask MS how to tidy this up
  checkWinner = () => {
    if (this.state.currCards.length > 1) {
      if (this.state.currCards[0].rank > this.state.currCards[1].rank) {
        this.setState({
          winnerOfRound: 1,
          numOfRounds: this.state.numOfRounds - 1,
          playerOneScore: this.state.playerOneScore + 1,
          message: "Player 1 wins this round!",
        });
      } else if (this.state.currCards[0].rank < this.state.currCards[1].rank) {
        this.setState({
          winnerOfRound: 2,
          numOfRounds: this.state.numOfRounds - 1,
          playerTwoScore: this.state.playerTwoScore + 1,
          message: "Player 2 wins this round!",
        });
      } else {
        this.setState({
          winnerOfRound: 0,
          numOfRounds: this.state.numOfRounds - 1,
          message: "It's a tie!",
        });
      }
    } else console.log("cards are not dealt yet.");
  };

  // react method takes two arguments
  componentDidUpdate = (prevProp, prevState) => {
    if (prevState.currCards !== this.state.currCards) {
      this.checkWinner();
    }
  };

  finalGameWinner = () => {
    if (this.state.playerOneScore > this.state.playerTwoScore) {
      return "Player 1 wins the game!";
    } else if (this.state.playerOneScore < this.state.playerTwoScore) {
      return "Player 2 wins the game!";
    } else {
      return "It's a game tie between player 1 & 2.";
    }
  };

  resetGame = () => {
    this.setState({
      // Set default value of card deck to new shuffled deck
      cardDeck: makeShuffledDeck(),
      // currCards holds the cards from the current round
      currCards: [],
      winnerOfRound: 0,
      message: "",
      playerOneScore: 0,
      playerTwoScore: 0,
      numOfRounds: 26,
    });
  };

  render() {
    // followed along zoom recording to display cards
    const currCardElems = this.state.currCards.map(
      ({ name, suit, image, rank }, index) => {
        console.log(suit);
        const imageName = `${suit.toLowerCase()}${RANK_MAP[rank]}`;
        console.log(imageName);
        return (
          // Give each list element a unique key
          <div key={`${name}${suit}`}>
            <b>Player {index + 1}:</b> {name} of {suit}
            <br />
            <br />
            <img
              src={imageMap[imageName]}
              alt={`${name}${suit}`}
              width="80px"
            />
          </div>
        );
      }
    );

    //display button text
    let buttonText = this.state.numOfRounds === 0 ? "Reset Game" : "Deal";

    // set conditional buttons
    return (
      <div className="App">
        <header className="App-header">
          <h3>High Card 🚀</h3>
          {currCardElems}
          <br />
          <button
            onClick={
              this.state.numOfRounds === 0 ? this.resetGame : this.dealCards
            }
          >
            {buttonText}
          </button>
          <br />
          {this.state.message}
          <br />
          <br />

          {this.state.numOfRounds <= 25 && (
            <div>
              Player 1 has won {this.state.playerOneScore} round(s). <br />
              Player 2 has won {this.state.playerTwoScore} round(s). <br />
              Number of rounds remaining: {this.state.numOfRounds}
            </div>
          )}

          {/* if game has ended, compute final game winner --> not too sure why this one requires brackets() */}
          {this.state.numOfRounds === 0 && (
            <div>
              <br />
              <b>{this.finalGameWinner()}</b>
              <br />
            </div>
          )}
        </header>
      </div>
    );
  }
}

export default App;
