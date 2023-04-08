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

      // State to track who won from the current round
      currWinner: null,

      // State to track the score of each player
      scoreboard: [0, 0],
    };
  }
  // Code to determine who won, Player 1 or 2
  determineWinner = () => {
    const { currCards } = this.state;
    let s1 = this.detSuiteRank(currCards[0]);
    let s2 =this.detSuiteRank(currCards[1]);
    const currWinner =
      currCards[0].rank === currCards[1].rank
        ? (s1>s2 ? "Player 1":"Player 2")
        : currCards[0].rank > currCards[1].rank
        ? "Player 1"
        : "Player 2";

    this.setState({ currWinner });
    if (currWinner==="Player 1"){
      this.updateScore(1);
    }else if(currWinner==="Player 2"){
      this.updateScore(2);
    }
    
  };
  

  detSuiteRank =(card)=>{
  
    switch(card.suit){
      case("Hearts"):
        return 3
      case("Spades"):
        return 4
      case("Clubs"):
        return 2
      case("Diamonds"):
        return 1
      default:
        return null
    }
  }
  updateScore =(n)=>{
    const {scoreboard} = this.state
    if (n ===1){
      scoreboard[0]++
    }else if (n===2){
      scoreboard[1]++
    }
    this.setState({scoreboard})
  }

  dealCards = () => {
    // this.state.cardDeck.pop() modifies this.state.cardDeck array
    const newCurrCards = [this.state.cardDeck.pop(), this.state.cardDeck.pop()];
    this.setState({
      currCards: newCurrCards,
    },
    ()=>{
      // Call determineWinner after the state has been updated
      this.determineWinner();

    }
    );
  };

  render() {
    //Code to check the winner: if cardRank not same, return higher cardRank, if same, check for suite and return higher suite
    

    const currCardElems = this.state.currCards.map(({ name, suit }) => (
      // Give each list element a unique key
      <div key={`${name}${suit}`}>
        {name} of {suit}
      </div>
    ));

    const hideOutput =()=>{
      if(this.state.currWinner){
        return(
        <div>
          <h3>{this.state.currWinner} has won</h3>
          <p>Player 1 has {this.state.scoreboard[0]} points.</p>
          <p>Player 2 has {this.state.scoreboard[1]} points.</p>
        </div>)
      }else{
        return (<div><p>Press 'Deal' to start the game.</p></div>)
      }
    }
         
    return (
      <div className="App">
        <header className="App-header">
          <h3>High Card 🚀</h3>
          {currCardElems}
          
          <br />
          <button onClick={this.dealCards}>Deal</button>
          {hideOutput()}
          
        </header>
      </div>
    );
  }
}

export default App;
