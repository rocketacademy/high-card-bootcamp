import React from "react";
import { makeShuffledDeck } from "../utils.js";
// import Button from "@mui/material/Button";

class DealCards extends React.Component {
  constructor(props) {
    // Always call super with props in constructor to initialise parent class
    super(props);
    this.state = {
      // Set default value of card deck to new shuffled deck
      cardDeck: makeShuffledDeck(),
      // currCards holds the cards from the current round
      currCards: [],
      numPlayerOneWins: 0,
      numPlayerTwoWins: 0,
      gameRoundWinner: null,
      currentRound: 0,
      numRoundsLeft: null,
      isGameStart: false,
    };
  }

  dealCards = () => {
    // remove last 2 cards from cardDeck as game ends when cards run out.
    const newCurrCards = this.state.cardDeck.slice(-2);
    // assign the first card to the first player
    const playerOneCard = newCurrCards[0];
    const playerTwoCard = newCurrCards[1];
    // console log the 2 cards that were dealt
    console.log(`Player One: ${playerOneCard.rank} of ${playerOneCard.suit}`);
    console.log(`Player Two: ${playerTwoCard.rank} of ${playerTwoCard.suit}`);

    let winnerOfRound = null;

    // compare players card to determine the winner of that round
    if (playerOneCard.rank > playerTwoCard.rank) {
      // legend: 1 == player one & 2 == player two
      winnerOfRound = 1;
    } else if (playerOneCard.rank < playerTwoCard.rank) {
      winnerOfRound = 2;
    } else {
      if (playerOneCard.suit === "Clubs" && playerTwoCard.suit !== "Clubs") {
        winnerOfRound = 2;
      } else if (playerOneCard !== "Clubs" && playerTwoCard.suit === "Clubs") {
        winnerOfRound = 1;
      } else if (
        playerOneCard.suit === "Spades" &&
        playerTwoCard !== "Spades"
      ) {
        winnerOfRound = 1;
      } else if (
        playerOneCard.suit !== "Spades" &&
        playerTwoCard === "Spades"
      ) {
        winnerOfRound = 2;
      } else if (
        playerOneCard.suit === "Diamonds" &&
        (playerTwoCard.suit === "Spades" || playerTwoCard.suit === "Hearts")
      ) {
        winnerOfRound = 2;
      } else if (
        playerOneCard.suit === "Hearts" &&
        playerTwoCard.suit !== "Spades"
      ) {
        winnerOfRound = 1;
      } else if (
        playerTwoCard.suit === "Diamonds" &&
        (playerOneCard.suit === "Spades" || playerOneCard.suit === "Hearts")
      ) {
        winnerOfRound = 1;
      } else if (
        playerTwoCard.suit === "Hearts" &&
        playerOneCard.suit !== "Spades"
      ) {
        winnerOfRound = 2;
      } else {
        winnerOfRound = null;
      }
    }

    // setState is where we update/change the mode depending on the game
    this.setState({
      // update the deck after removing the previous 2 dealt cards
      cardDeck: this.state.cardDeck.slice(0, -2),
      // update currCards to display 2 cards for that game round (1 card for each player)
      currCards: newCurrCards,
      // determine the winner for each round and display it on browser
      gameRoundWinner:
        winnerOfRound === 1
          ? "Player 1 won this round"
          : "Player 2 won this round",
      // number of times player 1 wins
      numPlayerOneWins:
        winnerOfRound === 1
          ? this.state.numPlayerOneWins + 1
          : this.state.numPlayerOneWins,
      // number of times player 2 wins
      numPlayerTwoWins:
        winnerOfRound === 2
          ? this.state.numPlayerTwoWins + 1
          : this.state.numPlayerTwoWins,
      // display the number of game rounds left
      numRoundsLeft: (this.state.cardDeck.length - 2) / 2,
      // display the current game round
      currentRound: this.state.currentRound + 1,
      isGameStart: true,
    });
  };

  // game reset
  resetGame = () => {
    this.setState({
      cardDeck: makeShuffledDeck(),
      currCards: [],
      numPlayerOneWins: 0,
      numPlayerTwoWins: 0,
      gameRoundWinner: null,
      currentRound: null,
      numRoundsLeft: null,
      isGameStart: false,
    });
  };

  render() {
    const currCardElems = this.state.currCards.map(({ name, suit }) => (
      // Give each list element a unique key
      <div key={`${name}${suit}`}>
        {name} of {suit}
      </div>
    ));

    // display the number of rounds remaining in our browser
    const roundsLeft = (
      <div>
        <p>
          Current Game Round: {this.state.currentRound} <br /> Game Rounds
          Remaining: {this.state.numRoundsLeft}
        </p>
      </div>
    );

    // display the scoreboard in our browser
    const scoreboard = (
      <div>
        <strong>------------ Scoreboard: ------------ </strong>
        <br />
        Player 1 has won {this.state.numPlayerOneWins} rounds <br />
        Player 2 has won {this.state.numPlayerTwoWins} rounds
      </div>
    );

    // determine the final winner after 26 rounds of game
    let gameWinner = null;
    if (this.state.numPlayerOneWins > this.state.numPlayerTwoWins) {
      gameWinner = 1;
    } else if (this.state.numPlayerOneWins < this.state.numPlayerTwoWins) {
      gameWinner = 2;
    }

    // display final result - which player wins or if it's a draw
    const gameWinMessage = gameWinner
      ? `------- The winner is Player ${gameWinner}!!! -------`
      : `------- It's a draw. Play again!!! -------`;

    return (
      <div>
        {currCardElems}
        <br />
        {this.state.gameRoundWinner}
        <br />
        <br />
        {this.state.isGameStart && scoreboard}
        <br />
        {this.state.numRoundsLeft === 0 && gameWinMessage}
        <br />
        {this.state.isGameStart && roundsLeft}
        {/* enable "Reset" button once the game reached its final round */}
        {this.state.currentRound === 26 ? (
          <button onClick={this.resetGame}>Reset Game</button>
        ) : (
          <button onClick={this.dealCards}>Deal</button>
        )}
      </div>
    );
  }
}

export default DealCards;
