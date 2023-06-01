import React from "react";
import "./App.css";
import { makeShuffledDeck } from "./utils.js";
import vibingcat from "./vibingcat.gif";

class App extends React.Component {
  constructor(props) {
    // Always call super with props in constructor to initialise parent class
    super(props);
    this.state = {
      // Set default value of card deck to new shuffled deck
      cardDeck: makeShuffledDeck(),
      // currCards holds the cards from the current round
      currCards: [],
      playerScore: 0,
      computerScore: 0,
      setWinner: null,
      playerRoundScore: 0,
      computerRoundScore: 0,
      activeGame: false,
    };
  }
  prepareSet = () => {
    let perRoundWinner;
    if (this.state.playerScore > this.state.computerScore) {
      perRoundWinner = "Player";
    } else if (this.state.computerScore > this.state.playerScore) {
      perRoundWinner = "Computer";
    }

    this.setState((state) => ({
      cardDeck: makeShuffledDeck(),
      currCards: [],
      playerRoundScore:
        perRoundWinner === "Player"
          ? state.playerRoundScore + 1
          : state.playerRoundScore,
      computerRoundScore:
        perRoundWinner === "Computer"
          ? state.computerRoundScore + 1
          : state.computerRoundScore,
      setWinner: null,
      playerScore: 0,
      computerScore: 0,
      activeGame: false,
    }));
  };
  dealCards = () => {
    const drawnCards = this.state.cardDeck.slice(-2);
    let winner = "draw";
    if (drawnCards[0].rank > drawnCards[1].rank) {
      winner = "player";
    } else if (drawnCards[1].rank > drawnCards[0].rank) {
      winner = "computer";
    }

    this.setState((state) => ({
      cardDeck: state.cardDeck.slice(0, -2),
      setWinner: winner,
      currCards: drawnCards,
      playerScore:
        winner === "player"
          ? this.state.playerScore + 1
          : this.state.playerScore,
      computerScore:
        winner === "computer"
          ? this.state.computerScore + 1
          : this.state.computerScore,
      activeGame: true,
    }));
  };

  render() {
    const currCardElems = this.state.currCards.map(({ name, suit }, index) => (
      // Give each list element a unique key
      <div key={`${name}${suit}`}>
        {index === 0 ? "Player " : "Computer "}Card: {name} of {suit}
      </div>
    ));
    let roundWinnerMessage;
    let currentSetWinner;
    if (this.state.setWinner === "player") {
      currentSetWinner = <div>The Player has won this Set!</div>;
    } else if (this.state.setWinner === "computer") {
      currentSetWinner = <div>The Computer has won this Set!</div>;
    } else {
      currentSetWinner = <div>No One had won this round! It is a Draw!</div>;
    }
    let scoresScenario;
    if (this.state.playerScore === this.state.computerScore) {
      scoresScenario = <div>The Scores are currently tied!</div>;
      roundWinnerMessage = <div>It is a Draw!</div>;
    } else if (this.state.playerScore > this.state.computerScore) {
      scoresScenario = <div>The Player is currently leading!</div>;
      roundWinnerMessage = <div>The Player has won the round!</div>;
    } else {
      scoresScenario = <div>The Computer is currently Leading!</div>;
      roundWinnerMessage = <div>The Computer has won the round!</div>;
    }
    let gameScoreDisplay = (
      <h4>
        Game Score:
        <br />
        Player: {this.state.playerScore} | Computer: {this.state.computerScore}
        <br />
        {scoresScenario}
      </h4>
    );
    const cardsLeft = (
      <h4>
        There are {this.state.cardDeck.length} cards until the end of the round!
      </h4>
    );

    return (
      <div className="App">
        <header className="App-header">
          <h4>
            <img src={vibingcat} alt=""></img>
            <br />
            Abel's Variant of High Card
          </h4>
          {this.state.cardDeck.length !== 0 ? currCardElems : undefined}
          <br />
          {this.state.cardDeck.length !== 0 ? (
            <button onClick={this.dealCards}>Deal!</button>
          ) : (
            <button onClick={this.prepareSet}>Onto the Next Set!</button>
          )}
          {this.state.activeGame && this.state.cardDeck.length !== 0
            ? currentSetWinner
            : undefined}
          {this.state.activeGame && this.state.cardDeck.length !== 0
            ? gameScoreDisplay
            : undefined}
          {this.state.activeGame && this.state.cardDeck.length !== 0
            ? cardsLeft
            : undefined}
          {this.state.cardDeck.length === 0 ? (
            <div>
              The round has concluded! {currentSetWinner}
              {gameScoreDisplay}
              {roundWinnerMessage}
            </div>
          ) : null}
          {this.state.playerRoundScore >= 1 ||
          this.state.computerRoundScore >= 1 ? (
            <div>
              Overall Game Score!
              <br />
              Player: {this.state.playerRoundScore}
              <br />
              Computer: {this.state.computerRoundScore}
            </div>
          ) : null}
        </header>
      </div>
    );
  }
}

export default App;
