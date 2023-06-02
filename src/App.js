// ToDo:
// FIXED:
// Overall game score is not updating if player 1 current score differs by 1 from player 2 current score
// 1 of the players' overall game score increases when it's a draw (no matter if the draw condition is specified in updateGameScores function or not)

import React from "react";
import "./styles/App.css";
import { makeShuffledDeck } from "./utils/utils.js";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import PlayingCard from "./components/PlayingCard";

class App extends React.Component {
  constructor(props) {
    // Always call super with props in constructor to initialise parent class
    super(props);
    this.state = {
      // Set default value of card deck to new shuffled deck
      cardDeck: makeShuffledDeck(),
      // currCards holds the cards from the current round
      currCards: [],
      player1CurrentScore: 0,
      player2CurrentScore: 0,
      player1GameScore: 0,
      player2GameScore: 0,
    };
  }

  updateGameScores = () => {
    console.log("updateGameScores is running");

    const { cardDeck, player1CurrentScore, player2CurrentScore } = this.state;
    console.log("decklength" + cardDeck.length);

    console.log(`player1 score:${player1CurrentScore}`);
    console.log(`player2 score:${player2CurrentScore}`);

    if (cardDeck.length === 0 && player1CurrentScore > player2CurrentScore) {
      console.log("player1 +1");
      this.setState((state) => ({
        player1GameScore: state.player1GameScore + 1,
      }));
    } else if (
      cardDeck.length === 0 &&
      player1CurrentScore < player2CurrentScore
    ) {
      console.log("player2 +1");

      this.setState((state) => ({
        player2GameScore: state.player2GameScore + 1,
      }));
    }
  };

  // The overall game scores depend on the current scores and the current scores must have been updated only then the updateGameScores method should be invoked. So the updateGameScores method has to be passed as a callback function to the setState() method inside the updateCurrentScore method after the state has been updated
  updateCurrentScores = () => {
    const { currCards } = this.state;
    if (currCards.length === 2 && currCards[0].rank > currCards[1].rank) {
      this.setState(
        (state) => ({
          player1CurrentScore: state.player1CurrentScore + 1,
        }),
        () => this.updateGameScores()
      );
    } else if (
      currCards.length === 2 &&
      currCards[0].rank < currCards[1].rank
    ) {
      this.setState(
        (state) => ({
          player2CurrentScore: state.player2CurrentScore + 1,
        }),
        () => this.updateGameScores()
      );
    }
  };

  /*
  The setState method is using the functional form, which means it accepts a function as an argument. The function is called with the PREVIOUS state as its parameter. Since it's a function and not a method of the component, we don't need to use this to access the component's state.

  This approach is useful when the new state depends on the previous state to ensure we're working with the most up-to-date state values and avoid potential issues caused by relying on this.state directly.
  */
  dealCards = () => {
    this.setState(
      (state) => ({
        // Remove last 2 cards from cardDeck
        cardDeck: state.cardDeck.slice(0, -2),
        // Deal last 2 cards to currCards
        currCards: state.cardDeck.slice(-2),
      }),
      () => {
        this.updateCurrentScores();
      }
    );
  };

  /* The cardDeck is extracted from the state using destructuring assignment (const { cardDeck } = this.state;). Then, setState is called with an object directly accessing cardDeck from this.state and using it to update cardDeck and currCards. However, this.state may not always reflect the most up-to-date state.

  In React, state updates may be asynchronous and batched for performance optimizations. When we call setState, React may batch multiple state updates together. This means that when we directly reference this.state to derive new state values, we may be working with stale or outdated state data.

  The tick function in World Clock exercise calls this.setState() which accepts an object of new Date() as argument. Using new Date() generates a new instance of the Date object representing the current date and time. It doesn't depend on any information from the previous state, so there is no need to access the previous state or perform calculations based on it.

  dealCards = () => {
    const { cardDeck } = this.state;
    this.setState({
      // Remove last 2 cards from cardDeck
      cardDeck: cardDeck.slice(0, -2),
      // Deal last 2 cards to currCards
      currCards: cardDeck.slice(-2),
    });
  };
  */

  determineWinnerEachGame = () => {
    const { cardDeck, player1CurrentScore, player2CurrentScore } = this.state;
    const isGameOver = cardDeck.length === 0;
    if (isGameOver && player1CurrentScore > player2CurrentScore) {
      return "Player 1 wins the current game!!!";
    } else if (isGameOver && player1CurrentScore < player2CurrentScore) {
      return "Player 2 wins the current game!!!";
    } else if (isGameOver && player1CurrentScore === player2CurrentScore) {
      return "The current game is a draw!!!";
    }
  };

  declareUltimateWinner = () => {
    const { cardDeck, player1GameScore, player2GameScore } = this.state;
    const isGameOver = cardDeck.length === 0;
    if (isGameOver && player1GameScore > player2GameScore) {
      return "Out of cards! Player 1 is the OVERALL WINNER!!!";
    } else if (isGameOver && player1GameScore < player2GameScore) {
      return "Out of cards! Player 2 is the OVERALL WINNER!!!";
    } else if (isGameOver && player1GameScore === player2GameScore) {
      return "Out of cards! It's a BIG FAT DRAW OVERALL!!!";
    }
  };

  resetGame = () => {
    this.setState({
      // Set default value of card deck to new shuffled deck
      cardDeck: makeShuffledDeck(),
      // currCards holds the cards from the current round
      currCards: [],
      player1CurrentScore: 0,
      player2CurrentScore: 0,
    });
  };

  render() {
    const {
      cardDeck,
      currCards,
      player1CurrentScore,
      player2CurrentScore,
      player1GameScore,
      player2GameScore,
    } = this.state;
    const currentWinner = this.determineWinnerEachGame();
    const roundCount = cardDeck.length / 2;
    const ultimateWinner = this.declareUltimateWinner();
    const isGameOver = cardDeck.length === 0;

    return (
      <div className="App">
        <header className="App-header">
          <Container>
            <h3>High Card 🚀</h3>
            <PlayingCard currCards={currCards} />
            <Button
              variant="secondary"
              onClick={isGameOver ? this.resetGame : this.dealCards}
            >
              {isGameOver ? "Continue Playing" : "Deal"}
            </Button>
            <h4>{isGameOver && currentWinner}</h4>
            <h4>
              {(player1CurrentScore > 0 || player2CurrentScore > 0) &&
                `Player 1's current score: ${player1CurrentScore} | Player 2's current score: ${player2CurrentScore}`}
            </h4>
            <h4>
              {roundCount !== 0 &&
                `${roundCount} more rounds before the card deck is depleted!`}
            </h4>
            <h4>
              {isGameOver &&
                `Player 1's overall score: ${player1GameScore} | Player 2's overall score: ${player2GameScore}`}
            </h4>
            <h4>{ultimateWinner}</h4>
          </Container>
        </header>
      </div>
    );
  }
}

export default App;
