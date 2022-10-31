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
      roundWinner: null,
      player1NumRoundsWon: 0,
      player2NumRoundsWon: 0,
      player1Hand: [],
      player2Hand: [],

      playerProfile: {
        player1: { id: 1, currHand: [], gamesWon: 0 },
        player2: { id: 2, currHand: [], gamesWon: 0 },
      },
    };
  }
  // I need a new var GameWons to keep track of total rounds won;
  // if (numRoundsLeft == 0 && player1NumRoundsWon > player2NumRoundsWon){state.playerProfile.player1.gamesWon +1}
  // else if (numRoundsLeft == 0 && player2NumRoundsWon > player1NumRoundsWon){state.playerProfile.player2.gamesWon +1}
  // a display <p> to show player1 gamesWon: and player2 gamesWon:
  //
  resetGame = () => {
    if (
      this.state.cardDeck.length == 0 &&
      this.state.player1NumRoundsWon > this.state.player2NumRoundsWon
    ) {
      this.state.playerProfile.player1.gamesWon += 1;
    } else if (
      this.state.cardDeck.length == 0 &&
      this.state.player2NumRoundsWon > this.state.player1NumRoundsWon
    ) {
      this.state.playerProfile.player2.gamesWon += 1;
    }
    this.setState({
      cardDeck: makeShuffledDeck(),
      currCards: [],
      hasGameStarted: false,
      roundWinner: null,
      player1NumRoundsWon: 0,
      player2NumRoundsWon: 0,
      player1Hand: [],
      player2Hand: [],
      playerProfile: this.state.playerProfile,
    });
  };

  dealCards = () => {
    // Deal last 2 cards to currCards
    // const newPlayer1Hand = [this.state.cardDeck.pop()];
    // const newPlayer2Hand = [this.state.cardDeck.pop()];
    let player1 = this.state.playerProfile.player1.currHand;
    let player2 = this.state.playerProfile.player2.currHand;
    player1 = [this.state.cardDeck.pop()];
    player2 = [this.state.cardDeck.pop()];
    //const newCurrCards = this.state.cardDeck.slice(-2);
    let newRoundWinner = null;
    if (player1[0].rank > player2[0].rank) {
      newRoundWinner = 1;
    } else if (player2[0].rank > player1[0].rank) {
      newRoundWinner = 2;
    }

    this.setState((state) => ({
      // Remove last 2 cards from cardDeck
      cardDeck: state.cardDeck.slice(0, -2),
      player1Hand: player1,
      player2Hand: player2,
      hasGameStarted: true,
      roundWinner: newRoundWinner,
      // Use prev state from setState argument instead of this.state to calculate what next state should be
      player1NumRoundsWon:
        newRoundWinner === 1
          ? state.player1NumRoundsWon + 1
          : state.player1NumRoundsWon,
      player2NumRoundsWon:
        newRoundWinner === 2
          ? state.player2NumRoundsWon + 1
          : state.player2NumRoundsWon,
    }));
  };

  render() {
    const currCardPlayer1 = this.state.player1Hand.map(({ name, suit }) => (
      // Give each list element a unique key
      <div key={`${name}${suit}`}>
        Player 1:
        <p>
          <img
            src={require(`./Cards/PlayingCards/${name} of ${suit}.png`)}
            alt="card"
          />
        </p>
        <p>
          {name} of {suit}
        </p>
      </div>
    ));

    const currCardPlayer2 = this.state.player2Hand.map(({ name, suit }) => (
      // Give each list element a unique key
      <div key={`${name}${suit}`}>
        Player 2:
        <p>
          <img
            src={require(`./Cards/PlayingCards/${name} of ${suit}.png`)}
            alt="card"
          />
        </p>
        <p>
          {name} of {suit}
        </p>
      </div>
    ));
    const roundWinnerMessage = this.state.roundWinner
      ? `Player ${this.state.roundWinner} won this round.`
      : `This rounds is a tie!`;
    const player1RoundsWonMessage = `Player 1 has won ${this.state.player1NumRoundsWon} rounds this game.`;
    const player2RoundsWonMessage = `Player 2 has won ${this.state.player2NumRoundsWon} rounds this game.`;
    const numRoundsLeft = this.state.cardDeck.length / 2;
    const numRoundsLeftMessage = `There are ${numRoundsLeft} rounds left in this game!`;
    const player1GamesWon = `Player 1 Game(s) Won:  ${this.state.playerProfile.player1.gamesWon}`;
    const player2GamesWon = `Player 2 Game(s) Won:  ${this.state.playerProfile.player2.gamesWon}`;
    // Determine game winner
    let gameWinner = null;
    if (this.state.player1NumRoundsWon > this.state.player2NumRoundsWon) {
      gameWinner = 1;
    } else if (
      this.state.player2NumRoundsWon > this.state.player1NumRoundsWon
    ) {
      gameWinner = 2;
    }
    const gameWinnerMessage = gameWinner
      ? `Player ${gameWinner} won this game!`
      : "It's a draw!";

    // Deal button text changes at end of game to start again
    const dealButtonText = numRoundsLeft === 0 ? "Reset Game" : "Deal";

    return (
      <div className="App">
        <header className="App-header">
          <h3>High Card 🚀</h3>
          <div className="container text-center">
            <div class="row align-items-start">
              <div class="col">{currCardPlayer1}</div>
              <div class="col">{currCardPlayer2}</div>
            </div>
          </div>

          <br />
          {/* Button changes functionality depending on game state */}
          <button
            onClick={numRoundsLeft === 0 ? this.resetGame : this.dealCards}
          >
            {dealButtonText}
          </button>
          <br />
          <p>{this.state.hasGameStarted && roundWinnerMessage}</p>
          <p>{this.state.hasGameStarted && player1RoundsWonMessage}</p>
          <p>{this.state.hasGameStarted && player2RoundsWonMessage}</p>
          <p>{this.state.hasGameStarted && numRoundsLeftMessage}</p>
          <p>{this.state.hasGameStarted && player1GamesWon}</p>
          <p>{this.state.hasGameStarted && player2GamesWon}</p>
          {/* Render winner message if the game is over */}
          <p>{numRoundsLeft === 0 && gameWinnerMessage}</p>
        </header>
      </div>
    );
  }
}

export default App;
