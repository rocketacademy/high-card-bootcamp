import React from "react";
import "./App.css";
import { makeShuffledDeck } from "./utils.js";
import Table from "react-bootstrap/Table";
import { PlayingCards } from "./PlayingCards";

class App extends React.Component {
  constructor(props) {
    // Always call super with props in constructor to initialise parent class
    super(props);
    this.state = {
      // Set default value of card deck to new shuffled deck
      cardDeck: makeShuffledDeck(),
      // currCards holds the cards from the current round
      currCards: [],
      score: [0, 0],
      roundsLeft: 26,
      winner: "undecided",
      gameEnded: false,
      gamesWon: [0, 0],
    };
  }

  resetGame = () => {
    this.setState((state) => {
      return {
        cardDeck: makeShuffledDeck(),
        // currCards holds the cards from the current round
        currCards: [],
        score: [0, 0],
        roundsLeft: 26,
        winner: "undecided",
        gameEnded: false,
      };
    });
  };

  computeOutcome = () => {
    this.setState((state) => {
      let cards = state.currCards;
      let currentScore = this.state.score.slice(0);
      let newScore = this.computeTurnWinner(cards, currentScore);
      let decision = this.decideWinner(newScore);
      console.log("computeOutcome function:" + decision);
      let currentGamesWon = this.state.gamesWon.slice(0);
      let updatedGamesWon = this.computeGamesWon(decision, currentGamesWon);
      console.log("computeOutcome() gamesWon variable:" + updatedGamesWon);

      return {
        // Remove last 2 cards from cardDeck
        cardDeck: [],
        // Deal last 2 cards to currCards
        currCards: [],
        score: newScore,
        winner: decision,
        gameEnded: true,
        gamesWon: updatedGamesWon,
      };
    });
  };

  dealCards = () => {
    this.setState((state) => {
      let cards = state.cardDeck.slice(-2);
      let currentScore = this.state.score.slice(0);
      let newScore = this.computeTurnWinner(cards, currentScore);
      console.log(`dealCards() state variable gamesWon: ${state.gamesWon}`);

      return {
        // Remove last 2 cards from cardDeck
        cardDeck: this.state.roundsLeft > 1 ? state.cardDeck.slice(0, -2) : [],
        // Deal last 2 cards to currCards
        currCards: state.cardDeck.slice(-2),
        score: newScore,
        roundsLeft: state.roundsLeft - 1,
      };
    });

    console.log(`card deck length: ${this.state.cardDeck.length}`);
  };

  decideWinner(currentScore) {
    let decision = "";
    if (currentScore[0] > currentScore[1]) {
      decision = "Player 1 won";
    } else if (currentScore[0] < currentScore[1]) {
      decision = "Player 2 won";
    } else if (currentScore[0] === currentScore[1]) {
      decision = "It's a tie";
    }
    return decision;
  }

  computeTurnWinner(cards, currentScore) {
    if (cards[0].rank === cards[1].rank) {
      currentScore[0]++;
      currentScore[1]++;
    } else if (cards[0].rank > cards[1].rank) {
      currentScore[0]++;
    } else {
      currentScore[1]++;
    }
    return currentScore;
  }

  computeGamesWon(winner, gamesWon) {
    if (winner === "Player 1 won") {
      gamesWon[0]++;
    } else if (winner === "Player 2 won") {
      gamesWon[1]++;
    }
    return gamesWon;
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>High Card 🚀</h1>

          <PlayingCards currCards={this.state.currCards} />
          {this.state.gameEnded ? this.state.winner : ""}
          <br />
          <button
            onClick={
              this.state.gameEnded
                ? this.resetGame
                : this.state.roundsLeft > 0
                ? this.dealCards
                : this.computeOutcome
            }
          >
            {this.state.gameEnded
              ? "reset"
              : this.state.roundsLeft > 0
              ? "Deal"
              : "Winner?"}
          </button>
        </header>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Player</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Player 1</td>

              <td>{this.state.score[0]}</td>
            </tr>
            <tr>
              <td>Player 2</td>

              <td>{this.state.score[1]}</td>
            </tr>
          </tbody>
        </Table>
        <Table striped bordered hover>
          <tbody>
            <tr>
              <td>Rounds left</td>

              <td>{this.state.roundsLeft}</td>
            </tr>
            <tr>
              <td>Winner</td>

              <td>{this.state.winner}</td>
            </tr>
          </tbody>
        </Table>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>-</th>
              <th>Player 1</th>
              <th>Player 2</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Games Won</td>

              <td>{this.state.gamesWon[0]}</td>
              <td>{this.state.gamesWon[1]}</td>
            </tr>
          </tbody>
        </Table>
      </div>
    );
  }
}

export default App;
