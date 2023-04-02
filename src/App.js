import React from "react";
import "./App.css";
import { makeShuffledDeck } from "./utils.js";
import Scoreboard from "./Components/Scoreboard";
import PlayingCard from "./Components/PlayingCard";
import Result from "./Components/Result";

class App extends React.Component {
  constructor(props) {
    // Always call super with props in constructor to initialise parent class
    super(props);
    this.state = {
      // Set default value of card deck to new shuffled deck
      cardDeck: makeShuffledDeck(),
      // currCards holds the cards from the current round
      currCards: [],
      // Winner of round
      roundWinner: null,
      // Player 1 and 2 scores after round
      playerOneScore: 0,
      playerTwoScore: 0,
      // Number of rounds played
      roundNumber: 0,
      // Winner of game
      gameWinner: null,
      // Has the game started?
      startGame: false,
      // Number of games played
      gameNumber: 1,
    };
  }

  // Restart game
  handleReset = () => {
    this.setState({
      cardDeck: makeShuffledDeck(),
      currCards: [],
      roundWinner: null,
      playerOneScore: 0,
      playerTwoScore: 0,
      roundNumber: 0,
      gameNumber: this.state.gameNumber + 1,
    });
  };

  dealCards = () => {
    // Deal last two cards
    const newCurrCards = this.state.cardDeck.slice(-2);
    // Increment round number
    let newRoundNumber = this.state.roundNumber + 1;
    // Declare winner of round
    let newRoundWinner = null;
    // Assign winner to Player 1 or 2
    newCurrCards[0].rank > newCurrCards[1].rank
      ? (newRoundWinner = 1)
      : (newRoundWinner = 2);

    this.setState((state) => ({
      // Game has started
      startGame: true,
      // Remove last 2 cards from cardDeck
      cardDeck: state.cardDeck.slice(0, -2),
      // Deal last 2 cards to currCards
      currCards: newCurrCards,
      // Increment round number
      roundNumber: newRoundNumber,
      // Update winner of round
      roundWinner: newRoundWinner,
      // Update player scores
      playerOneScore:
        newRoundWinner === 1 ? state.playerOneScore + 1 : state.playerOneScore,
      playerTwoScore:
        newRoundWinner === 2 ? state.playerTwoScore + 1 : state.playerTwoScore,
      // Get winner of game
      gameWinner:
        state.playerOneScore > state.playerTwoScore
          ? (state.gameWinner = 1)
          : (state.gameWinner = 2),
    }));
  };

  render() {
    const currCardElems = this.state.currCards.map(({ name, suit }, i) => (
      // Give each list element a unique key
      <PlayingCard key={`${name}${suit}`} name={name} suit={suit}>
        <p className="player-titles">Player {i + 1}</p>
      </PlayingCard>
    ));

    // Get number of rounds left
    const roundsLeft = this.state.cardDeck.length / 2;

    // Restart game when game over
    let clickHandler = roundsLeft === 0 ? this.handleReset : this.dealCards;

    // Print welcome statement
    const printWelcome = `Let's play High Cards!`;

    // Print winner of round
    const printRoundWinner = this.state.roundWinner
      ? `PLAYER ${this.state.roundWinner} WINS!`
      : `IT'S A DRAW!`;

    // Print winner of game
    const printGameWinner = this.state.gameWinner
      ? `GAME OVER! PLAYER ${this.state.gameWinner} WINS THE GAME!`
      : `GAME OVER! IT'S A DRAW!`;

    return (
      <div className="App">
        <main className="main-ctn">
          <Scoreboard
            rounds={this.state.roundNumber}
            games={this.state.gameNumber}
            p1Score={this.state.playerOneScore}
            p2Score={this.state.playerTwoScore}
          />

          <div className="card-ctn">{currCardElems}</div>

          <Result
            roundResults={
              this.state.roundNumber === 0 ? printWelcome : printRoundWinner
            }
            gameResults={this.state.roundNumber === 26 && printGameWinner}
            clickButton={clickHandler}
            buttonText={roundsLeft === 0 ? `NEW GAME` : `DEAL`}
          />
        </main>
      </div>
    );
  }
}

export default App;
