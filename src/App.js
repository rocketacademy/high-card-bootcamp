import React from "react";
import "./App.css";
import { makeShuffledDeck } from "./utils.js";
import DisplayCards from "./PlayingCard.js";
import Button from "@mui/material/Button";

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
      player1Score: 0,
      player2Score: 0,

      remainingRounds: 26,
    };
  }

  // Code to determine who won, Player 1 or 2
  // added part to determine who won, by comparing suit when rank are the same
  determineWinner = () => {
    const { currCards, player1Score, player2Score } = this.state;

    const cardMap = {
      spade: 4,
      heart: 3,
      club: 2,
      diamond: 1,
    };

    let currWinner;
    if (currCards[0].rank === currCards[1].rank) {
      if (cardMap[currCards[0].suit] > cardMap[currCards[1].suit]) {
        currWinner = "Player 1 has won the current round";
        this.setState({ player1Score: player1Score + 1 });
      } else {
        currWinner = "Player 2 has won the current round";
        this.setState({ player2Score: player2Score + 1 });
      }
    } else if (currCards[0].rank > currCards[1].rank) {
      currWinner = "Player 1 has won the current round";
      this.setState({ player1Score: player1Score + 1 });
    } else {
      currWinner = "Player 2 has won the current round";
      this.setState({ player2Score: player2Score + 1 });
    }
    this.setState({ currWinner });
  };

  overallWinner = () => {
    const { player1Score, player2Score } = this.state;
    return player1Score === player2Score
      ? "It's a tie!"
      : player1Score > player2Score
      ? "Player 1 is the overall winner! Congrats!"
      : "Player 2 is the overall winner! Congrats!";
  };

  startNewRound = () => {
    this.setState((state) => ({
      // reset to original
      cardDeck: makeShuffledDeck(),
      currCards: [],
      currWinner: " ",
      player1Score: 0,
      player2Score: 0,
      remainingRounds: 26,
    }));
  };

  dealCards = () => {
    this.setState(
      (state) => ({
        // Remove last 2 cards from cardDeck
        cardDeck: state.cardDeck.slice(0, -2),
        // Deal last 2 cards to currCards
        currCards: state.cardDeck.slice(-2),
        //
        remainingRounds: state.remainingRounds - 1,
      }),
      () => {
        // Call determineWinner after the state has been updated
        this.determineWinner();
      }
    );
  };

  render() {
    const currCardElems = this.state.currCards.map(({ name, suit }, index) => (
      // Give each list element a unique key
      <DisplayCards
        key={`${name}${suit}`}
        name={name}
        suit={suit}
        index={index}
      />
    ));

    return (
      <div className="App">
        <header className="App-header">
          <h3>High Card 🚀</h3>
          <div style={{ display: "flex" }}>{currCardElems}</div>
          <br />
          {this.state.remainingRounds === 0 ? (
            <div>
              {this.overallWinner()}
              <br />
              <Button
                variant="contained"
                color="success"
                onClick={this.startNewRound}
              >
                Restart game
              </Button>
            </div>
          ) : (
            <div>
              <Button
                variant="contained"
                color="secondary"
                onClick={this.dealCards}
              >
                Deal
              </Button>
            </div>
          )}
          <div>
            <br /> {this.state.currWinner}
            <br />
            <br />
            Current scoreboard
            <br />
            Player 1: {this.state.player1Score}
            <br />
            Player 2: {this.state.player2Score}
            <br />
            <br />
            Remaining Rounds: {this.state.remainingRounds}
          </div>
        </header>
      </div>
    );
  }
}

export default App;
