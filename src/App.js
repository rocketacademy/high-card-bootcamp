import React from "react";
import "./App.css";
import StartMenu from "./startMenu";


class App extends React.Component {
  constructor(props) {
    // Always call super with props in constructor to initialise parent class
    super(props);
    this.state = {
      // currCards holds the cards from the current round
      currCards: [],
      gameMode: "start",  //
      winner: null,
      currentgame: 0,
      numberOfPlayers: 0,
      numberOfGames: 0,
      playerScore: [0, 0, 0, 0, 0, 0],  
    };
  }

  receiveDataFromSMtoApp = (childData) => {
    this.setState({ 
      gameMode: childData.game,
      numberOfPlayers: childData.players,
      numberOfGames: childData.games,
    });
  }


  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h3>High Card 🚀</h3>
          <br />
          {this.state.gameMode === 'start' && <StartMenu receiveData={this.receiveDataFromSMtoApp}/>}
          {this.state.gameMode === 'Game' && <p>THE TEST IS SUCCESSFUL</p>}
        </header>
      </div>
    );
  }
}

export default App;
