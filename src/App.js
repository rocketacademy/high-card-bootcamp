import React from "react";
import "./App.css";
import StartMenu from "./startMenu";
import Game from "./game"


class App extends React.Component {
  constructor(props) {
    // Always call super with props in constructor to initialise parent class
    super(props);
    this.state = {
      // currCards holds the cards from the current round
      currCards: [],
      gameMode: "start",  //
      numberOfGames: 0,  
    };
  }

  receiveDataFromSMtoApp = (childData) => {
    this.setState({ 
      gameMode: childData.game,
      numberOfGames: childData.games,
    });
  }

  receiveMode = (gameData) => {
    this.setState({
      gameMode: gameData,
    })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h3>High Card 🚀</h3>
          <br />
          {this.state.gameMode === 'start' && <StartMenu receiveData={this.receiveDataFromSMtoApp}/>}
          {this.state.gameMode === 'Game' && <Game games={this.state.numberOfGames} getGameMode = {this.receiveMode}/>}
        </header>
      </div>
    );
  }
}

export default App;
