import React from "react";
import "./App.css";
import { makeShuffledDeck } from "./utils.js";
import PlayingCard from './Components/playingCard';

class App extends React.Component {
  constructor(props) {
    // Always call super with props in constructor to initialise parent class
    super(props);
    this.state = {
      // Set default value of card deck to new shuffled deck
      cardDeck: makeShuffledDeck(),
      // currCards holds the cards from the current round
      currCards: [],
      winnerRound: null,
      playerOneWins: 0,
      playerTwoWins: 0,
      finalWinner: null,
      numRounds: 52 / 2,  //is there a way not to hardcode this? + line 132 + line 112
      gameInProgress: false,
      playerOneTotalWins: 0,
      playerTwoTotalWins: 0
    };
  }

  dealCards = () => {
    // this.state.cardDeck.pop() modifies this.state.cardDeck array
    const newCurrCards = [this.state.cardDeck.pop(), this.state.cardDeck.pop()];
    console.log(newCurrCards);
    console.log(this.state.cardDeck.length);
    this.setState({
      currCards: newCurrCards,
      numRounds: this.state.numRounds - 1,
    });
    if (newCurrCards[0].rank > newCurrCards[1].rank) {
      this.setState({
        winnerRound: "Player 1",
        playerOneWins: this.state.playerOneWins + 1,
      });
    } else {
      this.setState({
        winnerRound: "Player 2",
        playerTwoWins: this.state.playerTwoWins + 1,
      });
    }
    if (this.state.cardDeck.length === 0) {
      this.determineWinner();
    }
  };

  determineWinner = () => {
    console.log("hello");
    if (this.state.cardDeck.length === 0) {
      if (this.state.playerOneWins > this.state.playerTwoWins) {
        this.setState({
          finalWinner: "Player 1",
          playerOneTotalWins: this.state.playerOneTotalWins + 1
        });
      } else if (this.state.playerOneWins < this.state.playerTwoWins) {
        this.setState({
          finalWinner: "Player 2",
          playerTwoTotalWins: this.state.playerTwoTotalWins + 1,
        });
      } else {
        this.setState({
          finalWinner: "It's a tie!",
          playerOneTotalWins: this.state.playerOneTotalWins + 1,
          playerTwoTotalWins: this.state.playerTwoTotalWins + 1,
        });
      }
    }
  };

  restart = () => {
    this.setState({
      // Set default value of card deck to new shuffled deck
      cardDeck: makeShuffledDeck(),
      // currCards holds the cards from the current round
      currCards: [],
      winnerRound: null,
      playerOneWins: 0,
      playerTwoWins: 0,
      finalWinner: null,
      numRounds: 52 / 2,
    });
  };

  handleClickDeal = () => {
    this.setState({
      gameInProgress: true,
    });
  };

  handleClickRestart = () => {
    this.setState({
      gameInProgress: false,
    });
  };

  render() {
    // You can write JavaScript here, just don't try and set your state!

    // You can access your current components state here, as indicated below
    const currCardElems = this.state.currCards.map(({ name, suit }) => (
      // Give each list element a unique key
      <div key={`${name}${suit}`}>
        <PlayingCard suit={suit} value={name} />
      </div>
    ));
    
    const playerOneOverallScore = `Player 1 Overall Score: ${this.state.playerOneTotalWins}`
    const playerTwoOverallScore = `Player 2 Overall Score: ${this.state.playerTwoTotalWins}`;

    const winnerMessage = this.state.winnerRound
      ? `${this.state.winnerRound} has won!`
      : `Game starting...`;
    const playerOneScore = `Player 1 Score Count: ${this.state.playerOneWins}`;
    const playerTwoScore = `Player 2 Score Count: ${this.state.playerTwoWins}`;
    const finalMessage =
      this.state.finalWinner && this.state.cardDeck.length === 0 && this.state.finalWinner !== "It's a tie!"
        ? `${this.state.finalWinner} is the ultimate winner!`
        : (this.state.finalWinner === "It's a tie!" ? "It's a tie!" : "");
    const displayButton =
      this.state.cardDeck.length === 0 ? (
        <button
          onClick={() => {
            this.restart();
            this.handleClickRestart();
          }}
        >
          Restart
        </button>
      ) : (
        <button
          onClick={() => {
            this.dealCards();
            this.handleClickDeal();
          }}
        >
          Deal
        </button>
      );
    const numRounds = `There are ${this.state.numRounds} rounds left in this game`;
    const displayText = this.state.gameInProgress ? (
      <div>
        <div className="cardDesign">
          <div className="flex-child">Player 1: {currCardElems[0]}</div>
          <div className="flex-child">Player 2: {currCardElems[1]}</div>
        </div>
        <br />
        {winnerMessage}
        <br />
        {playerOneScore}
        <br />
        {playerTwoScore}
        <br />
        {numRounds}
        <br />
      </div>
    ) : (
      ""
    );

    return (
      <div className="App">
        <header className="App-header">
          <h3>High Card 🚀</h3>
          {displayButton}
          <br />
          {displayText}
          <div className="winnerMessage">{finalMessage}</div>
          <br />
          <div className="overallScore">{playerOneOverallScore}</div>
          <br />
          <div className="overallScore">{playerTwoOverallScore}</div>
          <br />
        </header>
      </div>
    );
  }
}

export default App;
