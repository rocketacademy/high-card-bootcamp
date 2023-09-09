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
          score: 0,
          card: null
        },
        player2:{
          name: 'Player 2',
          score: 0,
          card: null
        }
      },
      // currCards holds the cards from the current round
      currCards: [],
      //playerScore keeps track of score - convert to object
      playerScores: [0,0],
      playerNames:['Player 1', 'Player 2'], // convert to object
      roundWinner:null
    };
  }

  dealCardsAndDeclareWinner = () => {
    // this.state.cardDeck.pop() modifies this.state.cardDeck array
    const newPlayerStats = this.state.playerStats;
    Object.values(newPlayerStats).forEach((player)=>{
      player.card = this.state.cardDeck.pop()
    });
    const ranks = Object.values(newPlayerStats).map((player)=>player.card.rank);
    const winnerIndex = ranks.indexOf(Math.max(...ranks))
    const newRoundWinner =Object.values(newPlayerStats).reduce((leader, player)=>player.card.rank>leader.card.rank ? player:leader)
    newRoundWinner.score += 1;
    this.setState({
    playerStats:newPlayerStats,
    roundWinner:newRoundWinner.name
    })
  }

  render() {
    // You can write JavaScript here, just don't try and set your state!
  
    // You can access your current components state here, as indicated below
    const currCardElems = this.state.currCards.map(({ name, suit }) => (
      // Give each list element a unique key
      <div key={`${name}${suit}`}>
        {name} of {suit}
      </div> //add in {this.state.currCards.map(()) when i extract this out as a component
    ));

    //
    //return
    //winner has higher card rank; find max rank
    //const roundWinner = this.determineRoundWinner(this.state.currCards, this.state.playerNames);
    const winnerText = this.state.roundWinner ? `Winner : ${this.state.roundWinner}` : null
    return (
      <div className="App">
        <header className="App-header">
          <h3>High Card 🚀</h3>
          {currCardElems}
          <br />
          {winnerText}
          <br />
          <Scoreboard {...this.state.playerStats}/>
          <br />
          <button onClick={this.dealCardsAndDeclareWinner}>Deal</button>
          {this.state.playerStats.player1.score}
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
// Allow players to keep track of scores across games, not just across rounds within a single game.
