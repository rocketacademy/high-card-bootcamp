import React from "react";
import "./App.css";
import { makeShuffledDeck } from "./utils.js";
import Game from "./Components/Game";
import Startmenu from "./Components/Startmenu";

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
      cardDeck: makeShuffledDeck(),
      // // currCards holds the cards from the current round
      currCards: [],
      name: "",
      gameMode: "start",
    };
  }

  // Upon receiving data, gameMode will be changed to "Game"

  changeGameMode = (newGameMode) => {
    this.setState({
      gameMode: newGameMode.game
    });
  }

  changeName= (newName) => {
    this.setState({
      name: newName
    });
    console.log(this.state.name)
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h3>High Card 🚀</h3>
          <br />
          {this.state.gameMode === "start" && (
            <Startmenu
              onClick={this.changeGameMode}
              onChange={this.changeName}
            />
          )}
          {this.state.gameMode === "Game" && (
            <Game getGameMode={this.state.gameMode} name={this.state.name} />
          )}
        </header>
      </div>
    );
  }
}

export default App;
