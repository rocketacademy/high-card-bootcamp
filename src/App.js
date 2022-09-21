import React from "react";
import "./App.css";
import { makeShuffledDeck } from "./utils.js";
import Table from "react-bootstrap/Table";

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
    };
  }

  resetGame = () => {
    this.setState((state) => ({
      cardDeck: makeShuffledDeck(),
      // currCards holds the cards from the current round
      currCards: [],
      score: [0, 0],
      roundsLeft: 26,
      winner: "undecided",
      gameEnded: false,
    }));
  };

  computeOutcome = () => {
    this.setState((state) => {
      let cards = state.currCards;
      let currentScore = this.state.score.slice(0);
      console.log(cards);
      if (cards[0].rank === cards[1].rank) {
        currentScore[0]++;
        currentScore[1]++;
      } else if (cards[0].rank > cards[1].rank) {
        currentScore[0]++;
      } else {
        currentScore[1]++;
      }

      let decision = "";
      if (currentScore[0] > currentScore[1]) {
        decision = "Player 1 won";
      } else if (currentScore[0] < currentScore[1]) {
        decision = "Player 2 won";
      } else if (currentScore[0] === currentScore[1]) {
        decision = "It's a tie";
      }

      return {
        // Remove last 2 cards from cardDeck
        cardDeck: [],
        // Deal last 2 cards to currCards
        currCards: [],
        score: currentScore,
        winner: decision,
        gameEnded: true,
      };
    });
  };

  dealCards = () => {
    if (this.state.roundsLeft > 1) {
      this.setState((state) => {
        let cards = state.cardDeck.slice(-2);
        let currentScore = this.state.score.slice(0);
        console.log(cards);
        if (cards[0].rank === cards[1].rank) {
          currentScore[0]++;
          currentScore[1]++;
        } else if (cards[0].rank > cards[1].rank) {
          currentScore[0]++;
        } else {
          currentScore[1]++;
        }

        return {
          // Remove last 2 cards from cardDeck
          cardDeck: state.cardDeck.slice(0, -2),
          // Deal last 2 cards to currCards
          currCards: state.cardDeck.slice(-2),
          score: currentScore,
          roundsLeft: state.roundsLeft - 1,
        };
      });

      console.log(`card deck length: ${this.state.cardDeck.length}`);
      console.log(this.state.currCards[0]);
    } else if (this.state.roundsLeft === 1) {
      this.setState((state) => {
        let cards = state.cardDeck.slice(-2);
        let currentScore = this.state.score.slice(0);
        console.log(cards);
        if (cards[0].rank === cards[1].rank) {
          currentScore[0]++;
          currentScore[1]++;
        } else if (cards[0].rank > cards[1].rank) {
          currentScore[0]++;
        } else {
          currentScore[1]++;
        }

        return {
          // Remove last 2 cards from cardDeck
          cardDeck: [],
          // Deal last 2 cards to currCards
          currCards: state.cardDeck.slice(-2),
          score: currentScore,
          roundsLeft: state.roundsLeft - 1,
        };
      });
    }
  };

  computeRoundWinner(currCards) {
    let cards = currCards;
    console.log(cards);
    if (cards[0].rank === cards[1].rank) {
      this.setState((state) => ({
        score: [state.score[0] + 1, state.score[1] + 1],
      }));
    } else if (cards[0].rank > cards[1].rank) {
      this.setState((state) => ({
        score: [state.score[0] + 1, state.score[1]],
      }));
    } else {
      this.setState((state) => ({
        score: [state.score[0], state.score[1] + 1],
      }));
    }
  }

  render() {
    const currCardElems = this.state.currCards.map(({ name, suit }, index) => (
      // Give each list element a unique key
      <div key={`${name}${suit}`}>
        Player {index + 1}: {name} of {suit}
      </div>
    ));

    return (
      <div className="App">
        <header className="App-header">
          <h3>High Card 🚀</h3>
          {currCardElems}
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
      </div>
    );
  }
}

export default App;
