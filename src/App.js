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
      playerOneRoundScore: 0,
      playerTwoRoundScore: 0,
      tieRoundScore: 0,
      playerOneGameScore: 0,
      playerTwoGameScore: 0,
      tieGameScore: 0,
      winner: 0,
      gameState: "START",
    };
  }

  //restart the game function..
  restartGame = () => {
    this.setState({
      cardDeck: makeShuffledDeck(),
      currCards: [],
      playerOneRoundScore: 0,
      playerTwoRoundScore: 0,
      tieRoundScore: 0,
      winner: 0,
      gameState: "START",
    });
  };

  dealCards = () => {
    // this.state.cardDeck.pop() modifies this.state.cardDeck array
    const newCurrCards = [this.state.cardDeck.pop(), this.state.cardDeck.pop()];
    let roundWinner = 0;
    if (newCurrCards[0].rank > newCurrCards[1].rank) {
      roundWinner = 1;
    } else if (newCurrCards[0].rank < newCurrCards[1].rank) {
      roundWinner = 2;
    } else if (newCurrCards[0].rank === newCurrCards[1].rank) {
      roundWinner = 3;
    }
    this.setState({
      currCards: newCurrCards,
      gameState: "PLAY",
      playerOneRoundScore:
        roundWinner === 1
          ? this.state.playerOneRoundScore + 1
          : this.state.playerOneRoundScore,
      playerTwoRoundScore:
        roundWinner === 2
          ? this.state.playerTwoRoundScore + 1
          : this.state.playerTwoRoundScore,
      tieRoundScore:
        roundWinner === 3
          ? this.state.tieRoundScore + 1
          : this.state.tieRoundScore,
      winner: roundWinner,
    });
  };

  //start of game
  gameTitle = () => {
    if (this.state.gameState === "START") {
      return (
        <div>
          <h3>🃏 Welcome to High Card!🃏</h3>
          <h3>2 players will compete to see has the highest card</h3>
        </div>
      );
    } else {
      return <div></div>;
    }
  };

  //winner!
  winner = () => {
    if (this.state.winner === 3 && this.state.gameState === "PLAY") {
      return <h4>It's a tie!</h4>;
    } else if (this.state.gameState === "PLAY") {
      return <h4>Player {this.state.winner} wins!</h4>;
    }
  };

  //check to see who has won the game
  checkGameWin = () => {
    let playerOneTotalScore = this.state.playerOneRoundScore;
    let playerTwoTotalScore = this.state.playerTwoRoundScore;
    let tieTotalScore = this.state.tieRoundScore;
    this.setState({
      playerOneGameScore:
        playerOneTotalScore > playerTwoTotalScore &&
        playerOneTotalScore > tieTotalScore
          ? this.state.playerOneGameScore + 1
          : this.state.playerOneGameScore,
      playerTwoGameScore:
        playerTwoTotalScore > playerOneTotalScore &&
        playerTwoTotalScore > tieTotalScore
          ? this.state.playerTwoGameScore + 1
          : this.state.playerTwoGameScore,
      tieGameScore:
        tieTotalScore >= playerOneTotalScore &&
        tieTotalScore >= playerTwoTotalScore
          ? this.state.tieGameScore + 1
          : this.state.tieGameScore,
    });
  };

  //players cards
  playersCards = () => {
    if (this.state.gameState === "PLAY") {
      return (
        <h4>
          Player 1s Card: {this.state.currCards[0].name} of
          {this.state.currCards[0].suit} <br />
          Player 2s Card: {this.state.currCards[1].name} of
          {this.state.currCards[1].suit}
        </h4>
      );
    } else {
      return null;
    }
  };

  //number of rounds left
  numberOfRoundsLeft = () => {
    const cardsLeft = this.state.cardDeck.length / 2;
    return <h3>There are {cardsLeft} more rounds left in this deck.</h3>;
  };

  render() {
    const dealBtn = this.state.cardDeck.length === 0 ? "Restart" : "Deal";

    return (
      <div className="App">
        <header className="App-header">
          {this.gameTitle()}
          {this.numberOfRoundsLeft()}
        </header>
        <button
          onClick={() => {
            if (this.state.cardDeck.length === 0) {
              this.restartGame();
              this.checkGameWin();
            } else {
              this.dealCards();
            }
          }}
        >
          {dealBtn}
        </button>
        <br />
        {this.playersCards()}
        {this.winner()}
        <br />
        <div className="table-container">
          <div className="game-score-container">
            <h5>Player 1 Game Score: {this.state.playerOneGameScore}</h5>
            <h5>Player 2 Game Score: {this.state.playerTwoGameScore}</h5>
            <h5>Game Ties: {this.state.tieGameScore}</h5>
          </div>
          <div className="round-score-container">
            <h5>Player 1 Round Score: {this.state.playerOneRoundScore}</h5>
            <h5>Player 2 Round Score: {this.state.playerTwoRoundScore}</h5>
            <h5>Game Ties: {this.state.tieRoundScore}</h5>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
