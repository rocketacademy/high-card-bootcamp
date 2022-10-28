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
      score: {
      player1CurrScore: 0,
      player2CurrScore: 0,
      player1TotalRoundsWon: 0,
      player2TotalRoundsWon: 0,
      }
    };
  }

  resetGame= () => {
    if (this.state.score.player1CurrScore > this.state.score.player2CurrScore) {
      this.state.score.player1TotalRoundsWon++
    } else if (this.state.score.player2CurrScore > this.state.score.player1CurrScore) {
      this.state.score.player2TotalRoundsWon++
    }
    console.log('Player 1 Total', this.state.score.player1TotalRoundsWon)
    console.log("Player 2 Total", this.state.score.player2TotalRoundsWon);

    this.setState(
      {
        cardDeck: makeShuffledDeck(),
        // currCards holds the cards from the current round
        currCards: [],
        currentRound: 0,
        hasGameStarted: false,
        currentRoundWinner: null,
        gameWinner: null,
        score: {
          player1CurrScore: 0,
          player2CurrScore: 0,
          player1TotalRoundsWon: this.state.score.player1TotalRoundsWon,
          player2TotalRoundsWon: this.state.score.player2TotalRoundsWon
        },
      },
      console.log(this.state.player1CurrScore)
    );
  }

  dealCards = () => {
    const newCurrCards = this.state.cardDeck.slice(-2);
    console.log("Deal Cards", newCurrCards);
    let newRoundWinner = null;
    let score = this.state.score;
    // Compare ranks of the two cards
    // Player 1 Wins
    if (newCurrCards[0].rank > newCurrCards[1].rank) {
      newRoundWinner = 1;
      score.player1CurrScore++;
    }
    // Player 2 Wins
    else if (newCurrCards[1].rank > newCurrCards[0].rank) {
      newRoundWinner = 2;
      score.player2CurrScore++;
    } else {
      // Tie
      newRoundWinner = null;
    }

    this.setState({
      cardDeck: this.state.cardDeck.slice(0,-2),
      currentCards: newCurrCards,
      score: score,
      hasGameStarted: true,
      roundWinner: newRoundWinner,
      currentRound: this.state.currentRound + 1,
    }, console.log(this.state.currentRound));
  };

  render() {

    const currCardElems = this.state.currentCards.map(({ name, suit }, i) => (
      <div key={`${name}${suit}`}>
        <img src={require(`../assets/${name}Of${suit}.png`)} alt="card" />
        <p>
          Player {i + 1} : {name} of {suit}
        </p>
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
    const player1Score = `Player 1 Current Score: ${this.state.score.player1CurrScore}, Total Score: ${this.state.score.player1TotalRoundsWon}`;
    // Player 2 Score Message
    const player2Score = `Player 2 Current Score: ${this.state.score.player2CurrScore}, Total Score: ${this.state.score.player2TotalRoundsWon}`;

    // Button Deal or Reset Game
    let buttontext = "";
    buttontext = `${
      this.state.currentRound >= 25 ? "Reset Game" : "Deal Cards"
    }`;

    return (
      <div className="app">
        {this.state.currentRound ? (
          currCardElems
        ) : (
          <p>Press Deal To Start The Game</p>
        )}
        <button style={{fontSize:25}}
          onClick={
            this.state.currentRound >= 25 ? this.resetGame : this.dealCards
          }
        >
          {buttontext}
        </button>
        <br />
        {}
        <br />
        {this.state.currentRound > 0 && winMessage}
        <br />
        {this.state.currentRound > 0 && player1Score}
        <br />
        {this.state.currentRound > 0 && player2Score}
        <br />
      </div>
    );
  }
}

// Line 110 & 111 -> falsy values 
// Line 127 - 131 -> falsy & truthy values