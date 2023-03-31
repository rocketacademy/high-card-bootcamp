import React from "react";
import "./App.css";
import PlayingCard from "./PlayingCard.js";
import { makeShuffledDeck } from "./utils.js";
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
      playerOneScore: 0,
      playerTwoScore: 0,
      cardsLeft: 52,
      isGameOver: false,
      roundWinner: null,
    };
  }

  componentDidMount = () => {
    this.setState({ cardsLeft: this.state.cardDeck.length });
  };

  dealCards = () => {
    console.log(`Start of dealCards() isGameOver: ${this.state.isGameOver}`);
    if (!this.state.isGameOver) {
      const newCurrCards = this.state.cardDeck.slice(-2);
      // compare cards
      const playerOneRank = newCurrCards[0].rank;
      const playerTwoRank = newCurrCards[1].rank;
      let playerOneRoundWon = 0;
      let playerTwoRoundWon = 0;
      let roundWinner = null;
      if (playerOneRank > playerTwoRank) {
        playerOneRoundWon += 1;
        roundWinner = 1;
      } else if (playerOneRank < playerTwoRank) {
        playerTwoRoundWon += 1;
        roundWinner = 2;
      } else {
        roundWinner = 0;
      }
      this.setState((prevState) => ({
        // Remove last 2 cards from cardDeck
        cardDeck: prevState.cardDeck.slice(0, -2),
        // Deal last 2 cards to currCards
        currCards: newCurrCards,
        playerOneScore: prevState.playerOneScore + playerOneRoundWon,
        playerTwoScore: prevState.playerTwoScore + playerTwoRoundWon,
        // this part of -2 feels like an ugly workaround
        cardsLeft: prevState.cardsLeft - 2,
        isGameOver: prevState.cardsLeft - 2 <= 0,
        roundWinner: roundWinner,
      }));
    } else {
      console.log("Game is Over");
    }
  };

  restart = () => {
    this.setState(() => ({
      // Set default value of card deck to new shuffled deck
      cardDeck: makeShuffledDeck(),
      // currCards holds the cards from the current round
      currCards: [],
      playerOneScore: 0,
      playerTwoScore: 0,
      cardsLeft: 52,
      isGameOver: false,
      roundWinner: null,
    }));
  };

  // freeze the code execution until this.dealCards() completes
  dealAuto = async () => {
    for (let i = 0; i < 25; i++) {
      await this.dealCards();
    }
  };

  render() {
    const currCardElems = this.state.currCards.map(({ name, suit }, index) => (
      // Give each list element a unique key
      <div key={`${name}${suit}`}>
        <div>Player {index + 1}</div>
        <PlayingCard rank={name} suit={suit} />
      </div>
    ));

    const dealAuto = (
      <Button variant="outlined" color="error" onClick={this.dealAuto}>
        Deal 25 times
      </Button>
    );

    let dealButton;
    // replace true with !this.state.isGameOver for conditional rendering of the button
    if (!this.state.isGameOver) {
      dealButton = (
        <Button variant="contained" onClick={this.dealCards}>
          Deal
        </Button>
      );
    } else {
      dealButton = (
        <Button variant="contained" color="success" onClick={this.restart}>
          Restart
        </Button>
      );
    }

    let displayRoundWinner;
    if (this.state.roundWinner === 1) {
      displayRoundWinner = <p>Player 1 has won this round!</p>;
    } else if (this.state.roundWinner === 2) {
      displayRoundWinner = <p>Player 2 has won this round!</p>;
    } else if (this.state.roundWinner === 0) {
      displayRoundWinner = <p>It is a draw!</p>;
    }

    return (
      <div className="App">
        <header className="App-header">
          <h3>♠️♦️ High Card ♣️♥️</h3>
          <div className="card-holder">{currCardElems}</div>

          <br />
          {dealButton}
          <br />
          {dealAuto}
          <div>
            <p>Player 1: {this.state.playerOneScore} </p>
            <p>Player 2: {this.state.playerTwoScore} </p>
            <p>Cards Left: {this.state.cardsLeft}</p>
            {displayRoundWinner}
          </div>
        </header>
      </div>
    );
  }
}

export default App;
