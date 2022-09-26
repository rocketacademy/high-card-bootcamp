import React from "react";
import "./App.css";
import { makeShuffledDeck } from "./utils.js";

function RoundWinner(props) {
  if (props.p1RoundsWon > props.p2RoundsWon) {
    return "Player One wins overall, click on button to reset game.";
  } else if (props.p1RoundsWon < props.p2RoundsWon) {
    return "Player Two wins overall, click on button to reset game.";
  } else if (props.p1RoundsWon === props.p2RoundsWon) {
    return "This round ended with a draw, click on button to reset game.";
  }
}

class App extends React.Component {
  constructor(props) {
    // Always call super with props in constructor to initialise parent class
    super(props);
    this.state = {
      // Set default value of card deck to new shuffled deck
      cardDeck: makeShuffledDeck(),
      // currCards holds the cards from the current round
      currCards: [],
      playerOneRoundsWon: 0,
      playerTwoRoundsWon: 0,
      roundWinner: "",
      roundStarted: false,
      endOfRound: false,
      roundsPlayed: 0,
    };
  }

  resetRound = () => {
    this.setState(() => ({
      cardDeck: makeShuffledDeck(),
      currCards: [],
      playerOneRoundsWon: 0,
      playerTwoRoundsWon: 0,
      roundsPlayed: 0,
      endOfRound: false,
    }));
  };

  dealCards = () => {
    const cardsDealt = this.state.cardDeck.slice(-2);
    let whoWon = "Draw";
    if (cardsDealt[0].rank > cardsDealt[1].rank) {
      whoWon = "Player One";
      this.setState((state) => ({
        playerOneRoundsWon: state.playerOneRoundsWon + 1,
      }));
    } else if (cardsDealt[0].rank < cardsDealt[1].rank) {
      whoWon = "Player Two";
      this.setState((state) => ({
        playerTwoRoundsWon: state.playerTwoRoundsWon + 1,
      }));
    }

    this.setState((state) => ({
      // Remove last 2 cards from cardDeck
      cardDeck: state.cardDeck.slice(0, -2),
      // Deal last 2 cards to currCards
      currCards: cardsDealt,
      roundWinner: whoWon,
      roundStarted: true,
      endOfRound: state.roundsPlayed === 25 ? true : false,
      roundsPlayed: state.roundsPlayed + 1,
    }));
  };

  render() {
    const currCardElems = this.state.currCards.map(({ name, suit }) => (
      // Give each list element a unique key
      <div key={`${name}${suit}`}>
        {name} of {suit}
      </div>
    ));

    let button;
    let endRound = this.state.endOfRound;
    if (endRound) {
      button = <button onClick={this.resetRound}>Reset Game</button>;
    } else {
      button = <button onClick={this.dealCards}>Deal Cards</button>;
    }

    return (
      <div className="App">
        <header className="App-header">
          <h3>High Card 🚀</h3>
        </header>
        <main className="App-main">
          {currCardElems}
          <br />
          {button}
          {this.state.roundStarted && (
            <>
              <p>Winner: {this.state.roundWinner}</p>
              <p>Player One Rounds Won: {this.state.playerOneRoundsWon}</p>
              <p>Player Two Rounds Won: {this.state.playerTwoRoundsWon}</p>
            </>
          )}
          {this.state.endOfRound && (
            <p>
              <RoundWinner
                p1RoundsWon={this.state.playerOneRoundsWon}
                p2RoundsWon={this.state.playerTwoRoundsWon}
              />
            </p>
          )}
        </main>
      </div>
    );
  }
}

export default App;
