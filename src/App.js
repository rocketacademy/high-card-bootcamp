import React from "react";
import "./App.css";
import { makeShuffledDeck } from "./utils.js";
import Game from "./Components/Game";

{
  /*
1. A total of two cards will be dealed to the players
2. The player with a card that has a higher value will win the round
3. Keep track of the score during each game
4. Declare the winner when the deck has ran out of cards
5. Create a button to reset the game
*/
}

/* 
1. Game Component (Reset, Deal Cards, Button, )
2. Constants (Image)
*/

class App extends React.Component {
  constructor(props) {
    // Always call super with props in constructor to initialise parent class
    super(props);
    this.state = {
      // Set default value of card deck to new shuffled deck
      // cardDeck: makeShuffledDeck(),
      // // currCards holds the cards from the current round
      currCards: [],
      gameMode: "game",
    };
  }

  receiveGameMode = (game) => {
    this.setState({
      gameMode: game,
    });
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h3>High Card 🚀</h3>
          <br />
          <Game />
        </header>
      </div>
    );
  }
}

export default App;
