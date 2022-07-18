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
      roundsLeft: 26,
      player1Wins: 0,
      player2Wins: 0,
      ties: 0,
      reset: false,
      gamesPlayed: 0
    };
  }

  countGamesPlayed = () => {
    this.setState({ gamesPlayed: this.state.gamesPlayed + 1 })
  }

  reset = () => {
    this.setState(({
      // Set default value of card deck to new shuffled deck
      cardDeck: makeShuffledDeck(),
      // currCards holds the cards from the current round
      currCards: [],
      roundsLeft: 26,
      player1Wins: 0,
      player2Wins: 0,
      ties: 0,
      currentWinnerMessage: "",
      reset: true,
    }))
    console.log(this.state.player1Wins)
    console.log(this.state.player2Wins)
    console.log(this.state.roundsLeft)
  }

  dealCards = () => {
    this.setState((state) => ({
      reset: false,
      // Remove last 2 cards from cardDeck
      cardDeck: state.cardDeck.slice(0, -2),
      // Deal last 2 cards to currCards
      currCards: state.cardDeck.slice(-2),
    }));
  };

  determineRoundWinner = () => {
    if (this.state.currCards[0].rank > this.state.currCards[1].rank) {
      this.setState({ player1Wins: this.state.player1Wins + 1, roundsLeft: this.state.roundsLeft - 1, currentWinnerMessage: "Player 1 wins this round!" })
    } else if (this.state.currCards[1].rank > this.state.currCards[0].rank) {
      this.setState({ player2Wins: this.state.player2Wins + 1, roundsLeft: this.state.roundsLeft - 1, currentWinnerMessage: "Player 2 wins this round!" })
    } else { this.setState({ roundsLeft: this.state.roundsLeft - 1, ties: this.state.ties + 1, currentWinnerMessage: "This round is a tie!" }) }
  }

  determineGameWinner = () => {
    if (this.state.player1Wins > this.state.player2Wins) {
      return "Player 1 has won the game!"
    } else if (this.state.player2Wins > this.state.player1Wins) {
      return "Player 2 has won the game!"
    } else return "It's a draw!"
  }

  componentDidUpdate(_, prevState) {
    // Typical usage (don't forget to compare props):
    if (this.state.reset) {
      console.log("resetting")
    }
    else if (this.state.reset !== prevState.reset) {
      this.countGamesPlayed();
    }
    else if (this.state.currCards !== prevState.currCards) {
      this.determineRoundWinner();
    }
  }

  render() {
    const currCardElems = this.state.currCards.map(({ name, suit }) => (
      // Give each list element a unique key
      <div key={`${name}${suit}`}>
        {name} of {suit}
      </div>
    ));

    const dealButtonText = this.state.roundsLeft === 0 ? "Reset Game" : "Deal";

    return (
      <div className="App">
        <header className="App-header">
          <h3>High Card 🚀</h3>
          {currCardElems}
          <br />
          <button onClick={this.state.roundsLeft === 0 ? this.reset : this.dealCards}>{dealButtonText}</button>
          <p>{this.state.currentWinnerMessage}</p>
          <p>Player 1 has {this.state.player1Wins} wins</p>
          <p>Player 2 has {this.state.player2Wins} wins</p>
          <p>Number of times tied: {this.state.ties}</p>
          <p>Number of rounds left: {this.state.roundsLeft}</p>
          <p>{this.state.roundsLeft === 0 && this.determineGameWinner()}</p>
          <p>Games Played = {this.state.gamesPlayed}</p>
        </header>
      </div>
    );
  }
}

export default App;
