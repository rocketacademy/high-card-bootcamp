import React from "react";
import "./App.css";
import { makeShuffledDeck } from "./utils.js";

const maxRounds = 11;

function TallyScores({ player1Score, player2Score, roundsLeft }) {
  var para_top = (
    <p>
      Player 1 has won {player1Score} rounds. <br /> <br />
      Player 2 has won {player2Score} rounds. <br /> <br />
    </p>
  );

  var para_bottom = "";
  if (roundsLeft === 0) {
    if (player1Score > player2Score) {
      para_bottom = <p> Player 1 wins this game!</p>;
    } else if (player1Score < player2Score) {
      para_bottom = <p>Player 2 wins this game!</p>;
    } else {
      para_bottom = <p>It's a tie!</p>;
    }
  } else {
    para_bottom = <p>There are {roundsLeft} rounds left.</p>;
  }

  return (
    <>
      {para_top}
      {para_bottom}
    </>
  );
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
      gameStarted: false,
      winner: "",
      player1Score: 0,
      player2Score: 0,
      roundsLeft: maxRounds,
    };
  }

  // Deal two cards - first card is for Player 1 and second card is for Player 2
  dealCards = () => {
    // this.state.cardDeck.pop() modifies this.state.cardDeck array
    const newCurrCards = [this.state.cardDeck.pop(), this.state.cardDeck.pop()];
    let winner = "";
    if (newCurrCards[0].rank > newCurrCards[1].rank) {
      winner = "Player 1";
    } else if (newCurrCards[0].rank < newCurrCards[1].rank) {
      winner = "Player 2";
    } else {
      winner = "Nobody";
    }

    this.setState((state) => ({
      currCards: newCurrCards,
      gameStarted: true,
      winner: winner,
      player1Score:
        winner === "Player 1" ? state.player1Score + 1 : state.player1Score,
      player2Score:
        winner === "Player 2" ? state.player2Score + 1 : state.player2Score,
      roundsLeft: state.roundsLeft - 1,
    }));
  };

  resetGame = () => {
    this.setState({
      // Reset the whole game -  new shuffled deck - also the control variables
      cardDeck: makeShuffledDeck(),
      currCards: [],
      gameStarted: false,
      winner: "",
      player1Score: 0,
      player2Score: 0,
      roundsLeft: maxRounds,
    });
  };

  render() {
    let gameStarted = this.state.gameStarted;
    let winner = this.state.winner;
    let buttonCaption = this.state.roundsLeft > 0 ? "Deal" : "Reset Game";
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
          <button
            onClick={() => {
              this.state.roundsLeft > 0 ? this.dealCards() : this.resetGame();
            }}
          >
            {buttonCaption}
          </button>
          <br />
        </header>
        <main className="Main-body">
          <div>
            {gameStarted
              ? `${winner} wins this round.`
              : `The game has NOT yet started.`}
          </div>
          <br />
          {gameStarted && (
            <TallyScores
              player1Score={this.state.player1Score}
              player2Score={this.state.player2Score}
              roundsLeft={this.state.roundsLeft}
            />
          )}
        </main>
      </div>
    );
  }
}

export default App;
