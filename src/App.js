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
      hasGameStarted: false,
      currRoundWinner: null,
      playerOneNumOfWins: 0,
      playerTwoNumOfWins: 0,
      roundNumber: 0,
    };
  }

  dealCards = () => {
    // this.state.cardDeck.pop() modifies this.state.cardDeck array
    const newCurrCards = [this.state.cardDeck.pop(), this.state.cardDeck.pop()]; // each player gets one card
    this.setState({
      currCards: newCurrCards,
    });
    this.determineThisRoundWinner(newCurrCards);
  };
  //function to determine the winner of the round
  determineThisRoundWinner = (currCards) => {
    let newCurrRoundWinner = null;
    if (currCards[0].rank > currCards[1].rank) newCurrRoundWinner = 1;
    if (currCards[1].rank > currCards[0].rank) newCurrRoundWinner = 2;
    this.setState({
      currRoundWinner: newCurrRoundWinner,
      hasGameStarted: true,
    });
    this.keepScore(newCurrRoundWinner);
  };
  //function to keep track of the score
  keepScore = (currRoundWinner) => {
    if (currRoundWinner == 1)
      this.setState({ playerOneNumOfWins: this.state.playerOneNumOfWins + 1 });

    if (currRoundWinner == 2)
      this.setState({ playerTwoNumOfWins: this.state.playerTwoNumOfWins + 1 });
  };

  render() {
    // You can write JavaScript here, just don't try and set your state!

    // You can access your current components state here, as indicated below
    const currCardElems = this.state.currCards.map(({ name, suit }, i) => (
      // Give each list element a unique key
      <div key={`${name}${suit}`}>
        <p>
          Player {i + 1} got {name} of {suit}
        </p>
      </div>
    ));
    const currRoundWinnerOutput = this.state.currRoundWinner
      ? `Player ${this.state.currRoundWinner} won this round.`
      : `It's a tie!`;
    const playerOneNumOfWinsOutput = `Player 1 has ${this.state.playerOneNumOfWins} wins.`;
    const playerTwoNumOfWinsOutput = `Player 2 has ${this.state.playerTwoNumOfWins} wins.`;

    return (
      <div className="App">
        <header className="App-header">
          <h3>High Card 🚀</h3>
          {currCardElems}
          <p>{this.state.hasGameStarted && currRoundWinnerOutput}</p>
          <p>{this.state.hasGameStarted && playerOneNumOfWinsOutput}</p>
          <p>{this.state.hasGameStarted && playerTwoNumOfWinsOutput}</p>

          <br />
          <button onClick={this.dealCards}>Deal</button>
        </header>
      </div>
    );
  }
}

export default App;
