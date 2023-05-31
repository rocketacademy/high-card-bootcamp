import React from "react";
import { makeShuffledDeck } from "../utils.js";

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
    };
  }

  dealCards = () => {
    // Remove last 2 cards from cardDeck as game ends when cards run out.
    const newCurrCards = this.state.cardDeck.slice(-2);
    //Assign the first card to the first player
    const playerOneCard = newCurrCards[0];
    const playerTwoCard = newCurrCards[1];
    //console to see the 2 cards
    console.log(`Player One: ${playerOneCard.rank} of ${playerOneCard.suit}`);
    console.log(`Player Two: ${playerTwoCard.rank} of ${playerTwoCard.suit}`);

    let winnerOfRound = null;

    //Compare players card to determine the winner of that round
    if (playerOneCard.rank > playerTwoCard.rank) {
      // Legend: 1 == player one & 2 == player two
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

    //setState is where we update/change the mode depending on the game
    this.setState({
      //update the deck after removing the previous 2 dealt cards
      cardDeck: this.state.cardDeck.slice(0, -2),
      //update currCards to display 2 cards for that game round (1 card for each player)
      currCards: newCurrCards,
      gameRoundWinner:
        winnerOfRound === 1
          ? "Player 1 won this round"
          : "Player 2 won this round",
      numPlayerOneWins:
        winnerOfRound === 1
          ? this.state.numPlayerOneWins + 1
          : this.state.numPlayerOneWins,
      numPlayerTwoWins:
        winnerOfRound === 2
          ? this.state.numPlayerTwoWins + 1
          : this.state.numPlayerTwoWins,
      numRoundsLeft: (this.state.cardDeck.length - 2) / 2,
      currentRound: this.state.currentRound + 1,
    });
  };

  resetGame = () => {
    this.setState({
      cardDeck: makeShuffledDeck(),
      currCards: [],
      numPlayerOneWins: 0,
      numPlayerTwoWins: 0,
      gameRoundWinner: null,
      currentRound: null,
      numRoundsLeft: null,
    });
  };

  render() {
    const currCardElems = this.state.currCards.map(({ name, suit }) => (
      // Give each list element a unique key
      <div key={`${name}${suit}`}>
        {name} of {suit}
      </div>
    ));
    const roundsLeft = (
      <div>
        <p>
          Current Game Round: {this.state.currentRound} <br /> Game Rounds
          Remaining: {this.state.numRoundsLeft}
        </p>
      </div>
    );
    const scoreboard = (
      <div>
        <strong>Scoreboard:</strong>
        <br />
        Player 1 has won {this.state.numPlayerOneWins} rounds <br />
        Player 2 has won {this.state.numPlayerTwoWins} rounds
      </div>
    );

    let gameWinner = null;
    if (this.state.numPlayerOneWins > this.state.numPlayerTwoWins) {
      gameWinner = 1;
    } else if (this.state.numPlayerOneWins < this.state.numPlayerTwoWins) {
      gameWinner = 2;
    }

    const winnerMessage = `------- The winner is Player ${gameWinner}!!! -------`;

    const gameResult = gameWinner
      ? winnerMessage
      : `------- It's a tie. Play again!!! -------`;

    return (
      <div>
        {currCardElems}
        <br />
        {this.state.gameRoundWinner}
        {/* {console.log(this.state.numPlayerOneWins)}
        {console.log(this.state.numPlayerTwoWins)} */}
        <br />
        <br />
        {scoreboard}
        <br />
        {/* {gameResult} */}
        {roundsLeft}
        {this.state.currentRound === 26 ? (
          <button onClick={this.resetGame}>Reset Game</button>
        ) : (
          <button onClick={this.dealCards}>Deal</button>
        )}
        {/* <button onClick={this.dealCards}>Deal</button> */}
      </div>
    );
  }
}

export default DealCards;
