import React from "react";
import "./App.css";
import { makeShuffledDeck } from "./utils.js";
import {Scoreboard} from "./Components/Scoreboard"

class App extends React.Component {
  constructor(props) {
    // Always call super with props in constructor to initialise parent class
    super(props);
    this.state = {
      // Set default value of card deck to new shuffled deck
      cardDeck: makeShuffledDeck(),
      playerStats: {
        player1:{
          name: 'Player 1',
          card: null,
          roundScore: 0,
          gameScore: 0
        },
        player2:{
          name: 'Player 2',
          card: null,
          roundScore: 0,
          gameScore: 0
        }
      },
      roundWinner: null,
      gameWinner: null
    };
  }

  dealCardsAndDeclareWinner = () => {
    const newPlayerStats = this.state.playerStats;
    if (this.state.gameWinner) {
      Object.values(newPlayerStats).forEach((player) => {
        player.card = null;
        player.roundScore = 0;
        player.gameScore = (this.state.gameWinner === player.name) ? player.gameScore + 1 : player.gameScore
      })
      this.setState({
        cardDeck: makeShuffledDeck(),
        playerStats: newPlayerStats,
        roundWinner: null,
        gameWinner: null
      })
      return;
    } else {
      Object.values(newPlayerStats).forEach((player) => {
        player.card = this.state.cardDeck.pop()
      });
      const newRoundWinner = Object.values(newPlayerStats).reduce((leader, player) => player.card.rank > leader.card.rank ? player : leader)
      newRoundWinner.roundScore += 1;
      let newGameWinner = null;
      if (this.state.cardDeck.length < Object.keys(this.state.playerStats).length) {
        newGameWinner = Object.values(newPlayerStats).reduce((leader, player) => player.roundScore > leader.roundScore ? player : leader).name
      } else {
        newGameWinner = null;
      }
      this.setState({
        playerStats: newPlayerStats,
        roundWinner: newRoundWinner.name,
        gameWinner: newGameWinner
      })
  }
}

  render() {
    const currCardElems = Object.values(this.state.playerStats).map((player) => {
      if (player && player.card) {
        return (
          <div key={`${player.card.name}${player.card.suit}`}>
            {player.name}:  {player.card.name} of {player.card.suit}
          </div>
        )
      }      
    });
    const roundWinnerText = this.state.roundWinner ? `Round winner : ${this.state.roundWinner}` : null
    const gameWinnerText = this.state.gameWinner ? `Game winner : ${this.state.gameWinner}` : null
    const buttonText = this.state.gameWinner ? 'Next Game' : 'Deal'
    return (
      <div className="App">
        <header className="App-header">
          <h3>High Card 🚀</h3>
          {currCardElems}
          <br />
          Cards in deck: {this.state.cardDeck.length}
          <br />
          {roundWinnerText}
          <br />
          {gameWinnerText}
          <br />
          <Scoreboard {...this.state.playerStats}/>
          <br />
          <button onClick={this.dealCardsAndDeclareWinner}>{buttonText}</button>
        </header>
      </div>
    );
  }
}

export default App;

// Base
// Complete High Card with the following features.
// Determine who has won each round (Player 1 or Player 2) - Done
// Keep score during each game (how many rounds has each player won) - Done
// Declare a winner at the end of each game when the deck has run out of cards, and give the players the option to restart the game.
// Comfortable
// Add nice-to-have features.
// Style the app to clarify what each UI component is for. Clarify which card belongs to which player. Consider using React Bootstrap or MUI components as default styles.
// Create a re-usable PlayingCard component to render cards nicely. This component can use playing card images or create a custom playing card UI.
// More Comfortable
// If you have time and want to practise more.
// Allow players to keep track of scores across games, not just across rounds within a single game. - Done
