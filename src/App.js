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
      // game start
      gameStart: false,
      // game round
      gameRound: 0,
      // winner round
      roundWinner: null,
      // players' current scores
      player1CurrentScore: 0,
      player2CurrentScore: 0,
      // players' total scores
      player1Total: 0,
      player2Total: 0,
    };
  }

  dealCards = () => {
    // deal last 2 cards into newCurrCards
    const newCurrCards = this.state.cardDeck.slice(-2);
    if (newCurrCards[0].rank > newCurrCards[1].rank) {
      // render states (player1CurrentScore and player1Total)
      this.setState({
        roundWinner: 1,
        player1CurrentScore: this.state.player1CurrentScore + 1,
        player1Total: this.state.player1Total + 1,
      });
    } else if (newCurrCards[1].rank > newCurrCards[0].rank) {
      // render states (player2CurrentScore and player2Total)
      this.setState({
        roundWinner: 2,
        player2CurrentScore: this.state.player2CurrentScore + 1,
        player2Total: this.state.player2Total + 1,
      });
    } else {
      // if no winner
      this.setState({ roundWinner: 0 });
    }

    this.setState((prevState) => ({
      // Remove last 2 cards from cardDeck
      cardDeck: prevState.cardDeck.slice(0, -2),
      // pop newCurrCards into currCards array
      currCards: newCurrCards,
      gameStart: true,
      // update gameRound
      gameRound: prevState.gameRound + 1,
    }));
  };

  // reset game
  resetGame = () => {
    this.setState({
      cardDeck: makeShuffledDeck(),
      currCards: [],
      hasGameStarted: false,
      roundWinner: null,
      player1Total: 0,
      player2Total: 0,
    });
  };

  render() {
    // display cards
    const currCardElements = this.state.currCards.map(
      ({ name, suit }, index) => (
        // Give each list element a unique key
        <div key={`${name}${suit}`}>
          {/* retrieve card images */}
          <img
            src={require(`../src/assets/${name}Of${suit}.png`)}
            alt="cardImage"
          />
          <p>
            Player {index + 1}'s card is {name} of {suit}
          </p>
        </div>
      ),
    );
    // round winner's messages (2 expectations)
    const roundWinnerMessage = this.state.roundWinner
      ? `Player ${this.state.roundWinner} won this round.`
      : `No winner this round. The game continues!`;

    // individual winner's message
    // if player1CurrentScore > player2CurrentScore, player 1 wins, else player 2 wins
    const winnerMessage =
      this.state.player1CurrentScore > this.state.player2CurrentScore
        ? `Player 1 wins the game`
        : `Player 2 wins the game`;

    // players' current and total scores
    const player1CurrentRoundScore = `Player 1's current round score is: ${this.state.player1CurrentScore}`;
    const player2CurrentRoundScore = `Player 2's current round score is: ${this.state.player2CurrentScore}`;
    const player1TotalScore = `Player 1 won a total of: ${this.state.player1Total} rounds.`;
    const player2TotalScore = `Player 2 won a total of: ${this.state.player2Total} rounds.`;

    // Deal button text changes at end of game to start again
    const numRoundsLeft = this.state.cardDeck.length / 2;
    const dealButtonText = numRoundsLeft === 0 ? "Reset Game" : "Deal";

    return (
      <div className="App">
        <header className="App-header">
          <h3>High Card 🚀</h3>
          {currCardElements}
          <br />
          {/* Button changes functionality depending on game state */}
          <button
            onClick={numRoundsLeft === 0 ? this.resetGame : this.dealCards}
          >
            {dealButtonText}
          </button>
          <br />
          {/* to display messages */}
          <p>{this.state.gameStart && roundWinnerMessage}</p>
          <p>{this.state.gameStart && player1CurrentRoundScore}</p>
          <p>{this.state.gameStart && player1TotalScore}</p>
          <p>{this.state.gameStart && player2CurrentRoundScore}</p>
          <p>{this.state.gameStart && player2TotalScore}</p>

          {/* Render winner message if the game is over */}
          <p>{numRoundsLeft === 0 && winnerMessage}</p>
        </header>
      </div>
    );
  }
}

export default App;
