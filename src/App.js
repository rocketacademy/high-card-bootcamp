import React from "react";
import "./App.css";
import { makeShuffledDeck } from "./utils.js";
import {PiSmileyBold,PiSmileyMehBold,PiSmileySadBold} from 'react-icons/fa'

class App extends React.Component {
  constructor(props) {
    // Always call super with props in constructor to initialise parent class
    super(props);
    this.state = {
      // Set default value of card deck to new shuffled deck
      cardDeck: makeShuffledDeck(),
      // currCards holds the cards from the current round
      currCards: [],
      // comCards holds the cards for the dealer
      comCards:[],
      // player win, index 0 1 2 > win draw lose
      playerWin:[0 ,0, 0],
      // current win message
      currWinMsg:"" ,
    };
  }

  dealCards = () => {
    // this.state.cardDeck.pop() modifies this.state.cardDeck array
    const newCurrCards = [this.state.cardDeck.pop(), this.state.cardDeck.pop()];
    this.setState({
      currCards: newCurrCards,
    });
  }
  restartGame = () =>{
    this.setState({
      cardDeck: makeShuffledDeck(),
      // currCards holds the cards from the current round
      currCards: [],
      // comCards holds the cards for the dealer
      playerWin:[0 ,0, 0],
    });
  }
displayScore = () =>{
   return <div>Wins: {this.state.playerWin[0]} Draws: {this.state.playerWin[1]} Losses: {this.state.playerWin[2]}</div>
}
checkCurrWin = () => {
  const currWin = this.state.playerWin.map((x)=>(x));  
    if (this.state.currCards[0].rank>this.state.currCards[1].rank){
      currWin[0] += 1;
      this.setState({
        playerWin: currWin,
        currWinMsg: "You won this round!" ,
      });
    } else if(this.state.currCards[0].rank===this.state.currCards[1].rank){
      currWin[1] += 1;
      this.setState({
        playerWin: currWin,
        currWinMsg: "You drew this round!",
      });
    } else {
      currWin[2] += 1;
      this.setState({
        playerWin: currWin,
        currWinMsg: "You lost this round!",
      });
    };
    console.log("currwin:",currWin,"playerwin:",this.state.playerWin)
}
checkFinalWin = ()=>{
  if(this.state.playerWin[0] > this.state.playerWin[2]){
   return <h3>You won!<br/></h3>
  }else if (this.state.playerWin[0] < this.state.playerWin[2]){
    return <h3>You won!<br/></h3>
  } else {
    return <h3>It's a draw!<br/></h3>
  };
}
  render() {
    // You can access your current components state here, as indicated below
    const currCardElems = this.state.currCards.map(({ name, suit }) => (
      // Give each list element a unique key
      <div key={`${name}${suit}`}>
        {name} of {suit}
      </div>
    ));
    // console.log("playerWin:",this.state.playerWin,"currWin");
    return (
      <div className="App">
        <header className="App-header">
          <h3>High Card 🚀 </h3>
          <h4>Deck Remaining: <br/>{this.state.cardDeck.length}</h4>
          {this.state.cardDeck.length===52?<h3>Press the deal button to start</h3>:this.state.cardDeck.length<=1?<h3>{this.checkFinalWin()}<br/>Final Score: {this.displayScore()}</h3>:<h3> {this.state.currWinMsg} <br/> Current Score: <br/> {this.displayScore()}  </h3>}
          <h5>Dealer's Cards: </h5>
          {currCardElems[1]}
          <br/>
          <h5>My Cards: </h5>
          {currCardElems[0]}
          <br />
          {this.state.cardDeck.length<=1?<button onClick={this.restartGame}>Restart Game</button>:<button onClick={()=>{this.dealCards();setTimeout(() => {this.checkCurrWin()}, 500);}}>Deal</button>}
        </header>
      </div>
    );
  }
}

export default App;
