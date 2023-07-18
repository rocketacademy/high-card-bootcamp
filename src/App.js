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

      roundWinner: undefined,
      roundScores: [0, 0],
      roundsLeft: 26,
      gameWinner: undefined,
      gameOver: false,
    };
  }

  dealCards = () => {
    // this.state.cardDeck.pop() modifies this.state.cardDeck array
    const newCurrCards = [this.state.cardDeck.pop(), this.state.cardDeck.pop()];
    this.setState({
      currCards: newCurrCards,
    });

    const ranks = newCurrCards.map((card) => card.rank);

    this.setState(
      (prevState) => {
        if (ranks[0] > ranks[1]) {
          return {
            roundWinner: "Player 1 won this round.",
            roundScores: [
              prevState.roundScores[0] + 1,
              prevState.roundScores[1],
            ],
            roundsLeft: prevState.roundsLeft - 1,
          };
        } else if (ranks[0] < ranks[1]) {
          return {
            roundWinner: "Player 2 won this round.",
            roundScores: [
              prevState.roundScores[0],
              prevState.roundScores[1] + 1,
            ],
            roundsLeft: prevState.roundsLeft - 1,
          };
        } else {
          return {
            roundWinner: "This round is a tie.",
            roundsLeft: prevState.roundsLeft - 1,
          };
        }
      },
      () => {
        if (this.state.roundsLeft === 0) {
          this.endGame();
        }
      }
    );
  };

  endGame = () => {
    const roundScores = this.state.roundScores;
    if (roundScores[0] > roundScores[1]) {
      this.setState({ gameWinner: "Player 1 won!" });
    } else if (roundScores[0] < roundScores[1]) {
      this.setState({ gameWinner: "Player 2 won!" });
    } else {
      this.setState({ gameWinner: "it's a draw!" });
    }
  };

  render() {
    // You can write JavaScript here, just don't try and set your state!

    // You can access your current components state here, as indicated below
    const currCardElems = this.state.currCards.map(({ name, suit }) => (
      // Give each list element a unique key
      <div key={`${name}${suit}`}>
        {name} of {suit}
      </div>
    ));

    return (
      <div className="App">
        <header className="App-header">
          <h3>High Card 🚀</h3>
          {currCardElems}
          <br />
          {this.state.gameWinner && (
            <>
              <div>{"Game over, " + this.state.gameWinner}</div>
              <br />
            </>
          )}
          <button onClick={this.dealCards}>Deal</button>
          <br />
          <div>{this.state.roundWinner}</div>
          <br />
          <div>
            Score: {this.state.roundScores[0]}-{this.state.roundScores[1]} with{" "}
            {this.state.roundsLeft} rounds left
          </div>
        </header>
      </div>
    );
  }
}

export default App;
