import React from "react";
import App from "../App";
import { makeShuffledDeck } from "../utils.js";

export default class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // Set default value of card deck to new shuffled deck
      cardDeck: makeShuffledDeck(),
      // currCards holds the cards from the current round
      currentCards: [],
      currentRound: 0,
      hasGameStarted: false,
      roundWinner: null,
      player1CurrScore: 0,
      player2CurrScore: 0,
      player1TotalScore: 0,
      player2TotalScore: 0,
    };
  }

  resetGame= () => {
    this.setState({
      cardDeck: makeShuffledDeck(),
      // currCards holds the cards from the current round
      currCards: [],
      currentRound: 0,
      hasGameStarted: false,
      currentRoundWinner: null,
      gameWinner: null,
      player1CurrScore: 0,
      player2CurrScore: 0,
      player1TotalScore: 0,
      player2TotalScore: 0,
    });
  }

  dealCards = () => {
    const newCurrCards = this.state.cardDeck.slice(-2);
    console.log("Deal Cards", newCurrCards);
    let newRoundWinner = null;
    let player1CurrScore = this.state.player1CurrScore;
    let player2CurrScore = this.state.player2CurrScore;
    let player1TotalScore = this.state.player1TotalScore;
    let player2TotalScore = this.state.player2TotalScore;
    // Compare ranks of the two cards
    // Player 1 Wins
    if (newCurrCards[0].rank > newCurrCards[1].rank) {
      newRoundWinner = 1;
      player1CurrScore++;
      player1TotalScore++;
    }
    // Player 2 Wins
    else if (newCurrCards[1].rank > newCurrCards[0].rank) {
      newRoundWinner = 2;
      player2CurrScore++;
      player2TotalScore++;
    } else {
      // Tie
      newRoundWinner = null;
    }
    this.setState({
      cardDeck: this.state.cardDeck.slice(0,-2),
      currentCards: newCurrCards,
      player1CurrScore: player1CurrScore,
      player2CurrScore: player2CurrScore,
      player1TotalScore: player1TotalScore,
      player2TotalScore: player2TotalScore,
      hasGameStarted: true,
      roundWinner: newRoundWinner,
      currentRound: this.state.currentRound + 1,
    }, console.log(this.state.currentRound));
  };

  render() {

    const currCardElems = this.state.currentCards.map(({name, suit}) =>
    (
      <div key={`${name}${suit}`}>
        {name} of {suit}
      </div>
    ));

    console.log(currCardElems);

    // Winner Message for Current Round
    const winMessage = `${
      this.state.roundWinner
        ? `Player ${this.state.roundWinner} Wins`
        : `No Player Wins`
    }`;

    // Player 1 Score Message
    const player1Score = `Player 1 Current Score: ${this.state.player1CurrScore}, Total Score: ${this.state.player1TotalScore}`;
    // Player 2 Score Message
    const player2Score = `Player 2 Current Score: ${this.state.player2CurrScore}, Total Score: ${this.state.player2TotalScore}`;

    // Button Deal or Reset Game
    let buttontext = "";
    buttontext = `${
      this.state.currentRound >= 25 ? "Reset Game" : "Deal Cards"
    }`;

    return (
      <div className="app">
        {this.state.currentRound > 0 ?
          currCardElems
         : 
          <p>Press Deal To Start The Game</p>
        }

        <button
          onClick={
            this.state.currentRound >= 25 ? this.resetGame : this.dealCards
          }
        >
          {buttontext}
        </button>
        <br />
        <br />
        {}
        <br />
        {this.state.currentRound > 0 && winMessage}
        <br />
        {this.state.currentRound > 0 && player1Score}
        <br />
        {this.state.currentRound > 0 && player2Score}
      </div>
    );
  }
}
