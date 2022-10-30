import React from "react";
import "./App.css";
import { makeShuffledDeck } from "./utils.js";

const compareCards = (card1, card2) => {
  const getScore = card1.rank > card2.rank ? 1 : 0;
  return getScore;
};

const thisRoundWinner = (card1, card2) => {
  let getWinner = "This round ended in a draw.";
  if (card1.rank > card2.rank) {
    getWinner = "Player One wins this round";
  } else if (card1.rank < card2.rank) {
    getWinner = "Player Two wins this round";
  }
  return getWinner;
};

class App extends React.Component {
  constructor(props) {
    // Always call super with props in constructor to initialise parent class
    super(props);
    this.state = {
      // Set default value of card deck to new shuffled deck
      cardDeck: makeShuffledDeck(),
      // currCards holds the cards from the current round
      currCards: [],
      playerOneScore: 0,
      playerTwoScore: 0,
    };
  }

  dealCards = () => {
    this.setState((state) => ({
      // Remove last 2 cards from cardDeck
      cardDeck: state.cardDeck.slice(0, -2),
      // Deal last 2 cards to currCards
      currCards: state.cardDeck.slice(-2),
      playerOneScore:
        state.playerOneScore +
        compareCards(state.cardDeck.at(-2), state.cardDeck.at(-1)),

      playerTwoScore:
        state.playerTwoScore +
        compareCards(state.cardDeck.at(-1), state.cardDeck.at(-2)),
    }));
  };

  restartGame = () => {
    this.setState({
      cardDeck: makeShuffledDeck(),
      currCards: [],
      playerOneScore: 0,
      playerTwoScore: 0,
    });
  };

  render() {
    const currCardElems = this.state.currCards.map(({ name, suit }) => (
      // Give each list element a unique key
      <div key={`${name}${suit}`}>
        {name} of {suit}
      </div>
    ));

    let grandWinner = "Game ended in a Draw";

    if (this.state.playerOneScore > this.state.playerTwoScore) {
      grandWinner = "Player One won the game!";
    } else if (this.state.playerOneScore < this.state.playerTwoScore) {
      grandWinner = "Player Two won the game!";
    }

    return (
      <div className="App">
        <header className="App-header">
          <h3>High Card 🚀</h3>
          {currCardElems}
          <br />
          {this.state.cardDeck.length ? (
            <button onClick={this.dealCards}>Deal</button>
          ) : (
            <div>
              <button onClick={this.restartGame}>Restart</button>
              <p>{grandWinner}</p>
            </div>
          )}
          <p>
            {this.state.currCards.length === 2 &&
              thisRoundWinner(
                this.state.currCards.at(0),
                this.state.currCards.at(1)
              )}
          </p>
          <p>Player One Score: {this.state.playerOneScore}</p>
          <p>Player Two Score: {this.state.playerTwoScore}</p>
          <p>Cards remaining: {this.state.cardDeck.length}</p>
        </header>
      </div>
    );
  }
}

export default App;
