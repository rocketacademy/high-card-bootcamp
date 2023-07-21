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
      // comCards holds the cards for the dealer
      comCards:[],
      // player win, index 0 1 2 , win draw lose
      playerWin:[0 ,0, 0]

    };
  }

  dealCards = () => {
    // this.state.cardDeck.pop() modifies this.state.cardDeck array
    const newCurrCards = [this.state.cardDeck.pop(), this.state.cardDeck.pop()];
    const newComCards = [this.state.cardDeck.pop(), this.state.cardDeck.pop()];
    this.setState({
      currCards: newCurrCards,
      comCards: newComCards
    });
  };
  restartGame = () =>{
    this.setState({
      cardDeck: makeShuffledDeck(),
      // currCards holds the cards from the current round
      currCards: [],
      // comCards holds the cards for the dealer
      comCards:[],
      // player win, index 0 1 2 , win draw lose
      playerWin:[0 ,0, 0]
    });
  }
checkWin = () => {
  if(this.state.cardDeck.length>=4){
    
  }

}
  render() {
    // You can write JavaScript here, just don't try and set your state!
    const comCardElems = this.state.comCards.map(({ name, suit }) => (
      // Give each list element a unique key
      <div key={`${name}${suit}`}>
        {name} of {suit}
      </div>
    ));
    // You can access your current components state here, as indicated below
    const currCardElems = this.state.currCards.map(({ name, suit }) => (
      // Give each list element a unique key
      <div key={`${name}${suit}`}>
        {name} of {suit}
      </div>
    ));
      console.log(this.state.cardDeck.length)
    return (
      <div className="App">
        <header className="App-header">
          <h3>High Card 🚀 </h3>
          <h4>Deck Remaining: <br/>{this.state.cardDeck.length}</h4>
          {this.state.cardDeck.length===52?<h3>Press the deal button to start</h3>:this.state.cardDeck.length<=3?<h3>You won/lost</h3>:<h3> Current Score </h3>}
          <h5>Dealer's Cards: </h5>
          {comCardElems}
          <br/>
          <h5>My Cards: </h5>
          {currCardElems}
          <br />
          {this.state.cardDeck.length<=3?<button onClick={this.restartGame}>Restart Game</button>:<button onClick={this.dealCards}>Deal</button>}
        </header>
      </div>
    );
  }
}

export default App;
