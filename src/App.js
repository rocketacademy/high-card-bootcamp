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
      // Creating a state of player X wins
      winState: 0, 
      playerOneScore: 0, //Initializing of the player 1 score
      playerTwoScore: 0, //Initializing of the player 2 score
      gameStart: 0,
      buttonName: "Deal",
      overallWinner: null,
    };
    console.log(this.state);
  }

  // The logic of state changes upon button press
  dealCards = () => {
    //Synchrohous
    // Deal last 2 cards to currCards
    let currCards = this.state.cardDeck.slice(-2); //It's a copy so it doesn't affect the state
    let cardDeck = this.state.cardDeck.slice(0, -2); //Copy of the carddeck
    let winnerState = 0; //Local variable
    let buttonName = "Deal";
    let gameStart = 1;
    let overallWinner = null;
    let playerOneScore =this.state.playerOneScore;
    let playerTwoScore = this.state.playerTwoScore;

    if (currCards[0].rank > currCards[1].rank) {
      winnerState = 1;
    } else if (currCards[1].rank > currCards[0].rank) {
      winnerState = 2;
    }
    else{
      winnerState = 0; //Draw
    }

    //Change the button name if length of carddeck is ending
    if (cardDeck.length ===0){
      buttonName = "Restart";
      cardDeck = makeShuffledDeck(); //restart the deck
      gameStart = 0; 
      winnerState = 0;
      playerOneScore=0;
      playerTwoScore=0;


      if (playerOneScore>playerTwoScore){
        overallWinner = 1;
      }
      if (playerOneScore<playerTwoScore){
        overallWinner = 2;
      }
      else {
        overallWinner = 0;
      }
      
    }
    //console.log(this.state);
    /////////////////////////////////////////////// Setting State
    this.setState((state) => ({ //asynchronous
      // Remove last 2 cards from cardDeck
      cardDeck: cardDeck,
      currCards: currCards,

      playerOneScore: winnerState === 1 //Conduct an if else condition within the state setting
      ? playerOneScore + 1
      : playerOneScore,

      playerTwoScore: winnerState === 2 //Conduct an if else condition within the state setting
      ? playerTwoScore + 1
      : playerTwoScore,

      winState: winnerState,
      gameStart: gameStart, //Show gamestart
      buttonName: buttonName,
      overallWinner: overallWinner,
    }));
    console.log(`Within DealCards but After setState: ${JSON.stringify(this.state.currCards)}`);
  };

  //When something updates, this will activate (go read)
  componentDidUpdate() { 
    console.log(`componentDidUpdate: ${JSON.stringify(this.state.currCards)}`)
  }

  render() {
    const currCardElems = this.state.currCards.map(({ name, suit }) => (
      // Give each list element a unique key
      <div key={`${name}${suit}`}>
        {name} of {suit}
      </div>
    ));

    //Generating html output for winner statement and overall winner
    let winnerStatement = null;
    let overallWinStatement= null;
    if (this.state.gameStart===1){
      winnerStatement=((this.state.winState ===0) ? <h3>It's a draw!</h3> : (this.state.winState ===1) ? <h3>Player 1 Wins!</h3>:<h3>Player 2 Wins!</h3>);
      overallWinStatement = <div></div>;
    }
    
    else{
      winnerStatement = <div></div>;
      if (this.state.overallWinner===null){
        overallWinStatement = <div></div>;
      }
      else{
        overallWinStatement=((this.state.overallWinner ===0) ? <h3>Both Champions!🎉</h3> : (this.state.overallWinner ===1) ? <h3>Champion: Player ONE!🎉</h3>:<h3>Champion: Player TWO!🎉</h3>);
      }
      }
      
    //Creating table scoreboard
    const data = [
      { playerOne: this.state.playerOneScore, playerTwo: this.state.playerTwoScore}
    ]

    return (
      <div className="App">
        <header className="App-header">
          <h3>High Card 🚀</h3>
          {currCardElems}
          <br />
          {winnerStatement}
          {overallWinStatement}
          <br />
          <table id="scoreTable">
          <tr>
            <th>Player 1</th>
            <th>Player 2</th>
          </tr>
          {data.map((val, key) => {
          return (
            <tr key={key}>
              <td>{val.playerOne}</td>
              <td>{val.playerTwo}</td>
            </tr>
          )
          }
          )}
          </table>
          <br />
          <button onClick={this.dealCards}>{this.state.buttonName}</button>
          
        </header>
      </div>
    );
  }
}

export default App;
