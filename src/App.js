import React from "react";
import "./App.css";
import { makeShuffledDeck } from "./utils.js";


//create a function to check similarity of the currcards
const isCurrCardsSame = (arr1, arr2) =>{
  for(let i=0; i<arr1.length; i++){
    if(arr1[i] !== arr2[i])
      return false;
  }   
  return true; 
}

class App extends React.Component {
  constructor(props) {
    // Always call super with props in constructor to initialise parent class
    super(props);
    this.state = {
      // Set default value of card deck to new shuffled deck
      cardDeck: makeShuffledDeck(),
      // currCards holds the cards from the current round
      currCards: [],
      player1Score: 0,
      player2Score: 0,
      announcement: "",
    };
  }

  componentDidUpdate(prevProps, prevState, snapshot){
    if(!isCurrCardsSame(this.state.currCards, prevState.currCards)){
      this.getWinner();
    }
  }

  dealCards = () => {
    this.setState((state) => ({
      // Remove last 2 cards from cardDeck
      cardDeck: state.cardDeck.slice(0, -2),
      // Deal last 2 cards to currCards
      currCards: state.cardDeck.slice(-2),
    }));
  };

  /* getPlayerCards = () =>{
    return `Player 1: ${this.player1Card}, Player 2: ${this.player2Card}`;
  } */

  getWinner = () =>{
    if(this.state.currCards.length > 0){
      let player1Card = this.state.currCards[0];
      let player2Card = this.state.currCards[1];

      console.log(
        `Player1rank: ${player1Card.rank}, player2rank: ${player2Card.rank}`        
      );
  
      if(player1Card.rank>player2Card.rank){
        console.log("I'm called");
        this.setState((prevState)=>{
          return{
            ...prevState,
            player1Score: prevState.player1Score+1,
            announcement: "Player 1 Wins!",
          };
        });
      } else if (player2Card.rank > player1Card.rank){
        console.log("I'm called");
        this.setState((prevState) =>{
          return{
            ...prevState, 
            player2Score: prevState.player2Score+1,
            announcement: "Player 2 Wins!"
          };
        });
        return "Player 2 Wins!";
      } else  {
        console.log("I'm called");
        this.setState((prevState)=>{
          return {
            ...prevState,
            announcement: "It's a Draw!"
          }
        })
      }
    /* if(arr[0].rank > arr[1].rank){
        //update player1Score's state:
        this.setState({player1Score: this.state.player1Score++})
      } else if (arr[1].rank > arr[0].rank){
        //update player2Score's state:
        this.setState({player2Score: this.state.player2Score++})
      }   */
    
  }    
}
  handleClick = () =>{
    this.dealCards();
    //this.getWinner();
  }
  render() {
    console.log(this.state.cardDeck)
    const currCardElems = this.state.currCards.map(({ name, suit }, index) => (
      // Give each list element a unique key
      <div key={`${name}${suit}`}>
        Player {index}: {name} of {suit}         
      </div>
    ));

    let elemsOnScreen;
    if(this.state.cardDeck.length > 0){
      elemsOnScreen = (
        <>
          {currCardElems}
          <br />
          <button onClick={this.handleClick}>Deal</button>

          <h1>{this.state.announcement}</h1>
          <h2>Player 1: {this.state.player1Score}</h2>
          <h2>Player 2: {this.state.player2Score}</h2>
        </>
      )

    } else {
      elemsOnScreen = (
        <>
          {currCardElems}
          <br />
          {this.state.player1Score>this.state.player2Score ? (
            <h1>Player 1 won the match!</h1>
          ) : this.state.player2Score > this.state.player1Score ? (
            <h1>Player 2 won the match!</h1>
          ) : (
            <h1>It's a Draw!</h1>
          )}
          <h1>Final Score:</h1>
          <h2>Player 1: {this.state.player1Score}</h2>
          <h2>Player 2: {this.state.player2Score}</h2>

        </>
      )
    }

     
    return (
      <div className="App">
        <header className="App-header">
          <h3>High Card 🚀</h3>
          {elemsOnScreen}
          {/* {currCardElems}
          <br />
          <button onClick={this.dealCards}>Deal</button>
          {this.getWinner(this.state.currCards)}
          <h2>{this.getPlayerScores()}</h2> */}
        </header>
      </div>
    );
  }
}

export default App;
