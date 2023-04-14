import React from "react";
import "./App.css";
import { makeShuffledDeck } from "./utils.js";
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';

class App extends React.Component {
  constructor(props) {
    // Always call super with props in constructor to initialise parent class
    super(props);
    this.state = {
      // Set default value of card deck to new shuffled deck
      cardDeck: makeShuffledDeck(),
      // currCards holds the cards from the current round
      currCards: [],
      // set conditions before game start such as game not started, no round winners nor any games won by either player
      hasGameStarted: false,
      roundWinner: null,
      player1GamesWon: 0,
      player2GamesWon: 0,
    };
  }

  // reset the game under a new state
  resetGame = () => {
    this.setState({
      cardDeck: makeShuffledDeck(),
      currCards: [],
      hasGameStarted: false,
      roundWinner: null,
      player1GamesWon: 0,
      player2GamesWon: 0,
    });
  }

  dealCards = () => {
    // determine the round winner once cards are dealt
    const newCurrCards = [this.state.cardDeck.pop(), this.state.cardDeck.pop()];
    let newRoundWinner = null;
    if (newCurrCards[0].rank > newCurrCards[1].rank){
      newRoundWinner = 1;
    } else if (newCurrCards[1].rank > newCurrCards[0].rank){
      newRoundWinner = 2;
    }
  
    this.setState((state) => ({
      // Remove last 2 cards from cardDeck
      // this.state.cardDeck.pop()
      // cardDeck: state.cardDeck.slice(0, -2),
      // Deal last 2 cards to currCards
      currCards: newCurrCards,
      // once cards dealt, game starts and to track games won
      hasGameStarted: true,
      roundWinner: newRoundWinner,
      player1GamesWon: newRoundWinner === 1
        ? state.player1GamesWon + 1
        : state.player1GamesWon,
      player2GamesWon: newRoundWinner === 2
        ? state.player2GamesWon + 1
        : state.player2GamesWon,
    }));
  };

  render() {
    const currCardElems = this.state.currCards.map(({ name, suit }) => (
      // Give each list element a unique key
      //<div key={`${name}${suit}`}>
      //  {name} of {suit}
      <div class="image" key={`${name}${suit}`}>
        <img
          src={require(`./PNG-cards-1.3/${name}_of_${suit}.png`)}
          alt={`${name} of ${suit}`}
          style={{
            alignSelf: "center",
            maxWidth: 125,
          }}
        />
      </div>
    ));

    // round winner message which player won or is the round tied
    const roundWinnerMessage = this.state.roundWinner
      ? `Player ${this.state.roundWinner} won this round!`
      : 'This is a tied round!'

    // player 1 & 2 games won message
    const player1GamesWonMessage = `Player 1 has won ${this.state.player1GamesWon} games!`;
    const player2GamesWonMessage = `Player 2 has won ${this.state.player2GamesWon} games!`;
    
    // number of games left and message
    const numGamesLeft = this.state.cardDeck.length/2;
    const numGamesLeftMessage = `There are ${numGamesLeft} games left!`;

    // determine whole game winner
    let gameWinner = null;
    if (this.state.player1GamesWon > this.state.player2GamesWon){
      gameWinner = 1;
    } else if (
      this.state.player2GamesWon > this.state.player1GamesWon
    ) {
      gameWinner = 2;
    }
    const gameWinnerMessage = gameWinner
      ? `This game is won by Player ${gameWinner}!`
      : `This game is a draw!`
    
    // change deal button text at the end and restart again  
    const dealButtonText = numGamesLeft === 0
      ? `Reset Game`
      : `Deal`
      
    return (
      <div className="App">
        <header className="App-header">
          <h3>High Card <span role="img" aria-label="Rocket">🚀</span></h3>
          {currCardElems}
          <br />
          <Button onClick={numGamesLeft === 0 ? this.resetGame : this.dealCards} variant="success">{dealButtonText}</Button>
          <br />
          <p>{this.state.hasGameStarted && roundWinnerMessage}</p>
          <p>{this.state.hasGameStarted && player1GamesWonMessage}</p>
          <p>{this.state.hasGameStarted && player2GamesWonMessage}</p>
          <p>{this.state.hasGameStarted && numGamesLeftMessage}</p>
          <p>{numGamesLeft === 0 && gameWinnerMessage}</p>
        </header>
      </div>
    );
  }
}

export default App;
