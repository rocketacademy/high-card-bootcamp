import React from "react";
import "./App.css";
import { makeShuffledDeck } from "./utils.js";

class App extends React.Component {
  constructor(props) {
    // Always call super with props in constructor to initialise parent class
    super(props);
    this.state = {
      // Set default value of card deck to new shuffled deck
      cardDeck: makeShuffledDeck(),
      // currCards holds the cards from the current round
      currCards: [],
      // game start
      gameStart: false,
      // round winner
      roundWinner: null,
      // player 1 score
      player1Score: 0,
      // player 2 score
      player2Score: 0,
      // game round number
      gameRoundNumber: 0,
      // plyaer 1 score
      player1WinGameScore: 0,
      // player 2 score
      player2WinGameScore: 0,
    };
  }

  resetGame = () => {
    this.setState((prevState) => ({
      cardDeck: makeShuffledDeck(),
      currCards: [],
      gameStart: false,
      roundWinner: null,
      player1Score: 0,
      player2Score: 0,
      gameRoundNumber: prevState.gameRoundNumber + 1,
      player1WinGameScore:
        prevState.player1Score > prevState.player2Score
          ? prevState.player1WinGameScore + 1
          : prevState.player1WinGameScore,
      player2WinGameScore:
        prevState.player2Score > prevState.player1Score
          ? prevState.player2WinGameScore + 1
          : prevState.player2WinGameScore,
    }));
  };

  dealCards = () => {
    const newCurrCards = this.state.cardDeck.slice(-2);
    let newRoundWinner = null;
    if (newCurrCards[0].rank > newCurrCards[1].rank) {
      newRoundWinner = 1;
    }
    if (newCurrCards[0].rank < newCurrCards[1].rank) {
      newRoundWinner = 2;
    }

    this.setState((state) => ({
      // Remove last 2 cards from cardDeck
      cardDeck: state.cardDeck.slice(0, -2),
      currCards: newCurrCards,
      roundWinner: newRoundWinner,
      gameStart: true,
      player1Score:
        newRoundWinner === 1 ? state.player1Score + 1 : state.player1Score,
      player2Score:
        newRoundWinner === 2 ? state.player2Score + 1 : state.player2Score,
    }));
  };

  render() {
    // Dealt Cards
    const currCardElems = this.state.currCards.map(({ name, suit }, index) => (
      // Give each list element a unique key
      <div className="play-table" key={`${name}${suit}`}>
        <p>Player {index + 1}'s cards:</p>
        <p>
          {name} of {suit}
        </p>
        <img
          className="card-image"
          src={require(`../src/images/${name}_of_${suit}.png`)}
          alt="cardimage"
        />
      </div>
    ));

    // Game Win Count Tracking Messages
    const roundWinnerMessage = this.state.roundWinner
      ? `Player ${this.state.roundWinner} won this round!`
      : `This round is a tie! Continue the game!`;
    const player1WinCountMessage = `Player 1 has won ${this.state.player1Score} rounds in this game!`;
    const player2WinCountMessage = `Player 2 has won ${this.state.player2Score} rounds in this game!`;
    const gameRoundsLeft = this.state.cardDeck.length / 2;
    const roundsLeftMessage = `There are ${gameRoundsLeft} rounds left to this game!`;
    const gameRoundsPlayedMessage = `There are ${this.state.gameRoundNumber} games played.`;
    const player1WinGameCountMessage = `Player 1 has won ${this.state.player1WinGameScore} games.`;
    const player2WinGameCountMessage = `Player 2 has won ${this.state.player2WinGameScore} games.`;

    // Determine Game Winner
    let gameWinner = null;
    if (this.state.player1Score > this.state.player2Score) {
      gameWinner = 1;
    }
    if (this.state.player2Score > this.state.player1Score) {
      gameWinner = 2;
    }

    // Game Winner Message
    const gameWinnerMessage = gameWinner
      ? `Player ${gameWinner} has won the game!`
      : `This game is a tie!`;

    //Button change
    const dealButton = gameRoundsLeft === 0 ? `Reset Game` : `Deal Cards`;

    return (
      <div className="App">
        <header className="App-header">
          <h3>High Card 🚀</h3>
          <button
            onClick={gameRoundsLeft === 0 ? this.resetGame : this.dealCards}
          >
            {dealButton}
          </button>
          <br />
          <div className="base-container">{currCardElems}</div>
          <br />
          <p>{this.state.gameStart && roundWinnerMessage}</p>
          <p>{this.state.gameStart && player1WinCountMessage}</p>
          <p>{this.state.gameStart && player2WinCountMessage}</p>
          <p>{this.state.gameStart && roundsLeftMessage}</p>
          <p>{gameRoundsLeft === 0 && gameWinnerMessage}</p>
          <p>{this.state.gameStart ? null : gameRoundsPlayedMessage}</p>
          <p>{this.state.gameStart ? null : player1WinGameCountMessage}</p>
          <p>{this.state.gameStart ? null : player2WinGameCountMessage}</p>
        </header>
      </div>
    );
  }
}

export default App;
