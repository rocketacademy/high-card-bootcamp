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

      player1score: 0,
      player2score: 0,
      total1score: 0,
      total2score: 0,

      gameState: false,

      isGameEndShown: false,
    };
  }

  dealCards = () => {

    this.setState((state) => ({
      // Remove last 2 cards from cardDeck
      cardDeck: state.cardDeck.slice(0, -2),
      // Deal last 2 cards to currCards
      currCards: state.cardDeck.slice(-2),
    }));

    console.log(this.state.cardDeck)
    console.log(this.state.currCards)
  };

  getWinner = () => {
    if(this.state.currCards == 0)return
    //compare number for winner
    if(this.state.currCards[0].rank > this.state.currCards[1].rank){ //if player 1 beats player 2
      this.setState((state) => ({
        player1score: state.player1score + 1
      }))
    }
    if (this.state.currCards[1].rank > this.state.currCards[0].rank){ //if player 2 beats player 1
      this.setState((state) => ({
        player2score: state.player2score + 1
      }))
    }
  }

  gameEnd = () => {
    

    if(this.state.player1score > this.state.player2score){ //p1 wins
      this.setState({
        total1score : this.state.total1score + 1
      })
    }
    
    
    if (this.state.player2score > this.state.player1score) { //p2 wins
      this.setState({
        total2score : this.state.total2score + 1
      })
    }
    console.log(this.state)
    if(this.state.cardDeck.length === 0){
      
      this.setState((state)=>({
        isGameEndShown : true
      }))
    }
  }

  //or gameEnd func could go in here
      //when game end show a button? change a state here which another button uses conditional rendering on to appear
      // this.setState((state)=>(
      //   state.gameState = true
      // ))
      //or
      // this.setState(()=>({
      //   gameState: true
      // }))
      // console.log(this.state.gameState)
      
    
  

    dealButtonClicky = () => {
      this.dealCards();
      // setTimeout(() =>{
      //   this.getWinner();
      //   console.log("timeout")
      // },20)
      this.getWinner();
      
      console.log(this.state)
      console.log(this.state.cardDeck.length)
      // if(this.state.cardDeck.length === 0){
      //   {endButton}
      // }\
      if(this.state.cardDeck.length === 0){
        this.gameEnd()
      }
      

    }

    restartButtonClicky = () => {
      this.setState({
        cardDeck: makeShuffledDeck(),
        isGameEndShown: false,
        player1score:0,
        player2score:0,
      })
    }


  render() {
    const currCardElems = this.state.currCards.map(({ name, suit }) => (
      // Give each list element a unique key
      <div key={`${name}${suit}`}>
        {name} of {suit}
      </div>

    
    ));

    // const endButton = <button onClick={()=>({})}>Restart</button>
    
    return (
      <div className="App">
        <header className="App-header">
          <div style={{padding:"50px", minWidth:"50vw", backgroundColor:"aliceblue "}}>
            <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between", minWidth:"50vh", marginTop:"50px"}}>
              <p>Player1 Wins: {this.state.total1score}</p>
              <p>Player2 Wins: {this.state.total2score}</p>
            </div>
            <h3 style={{backgroundColor:"#282c34", color:"white", paddingBlock:"15px", borderRadius:"15px"}}>High Card 🚀</h3>
            {/* {currCardElems} */}
            
            <br />
            <div>{this.state.isGameEndShown?<button className="Button" onClick={() => {this.restartButtonClicky()}}>Restart</button> : <button className="Button" onClick={() => {this.dealButtonClicky()}}>Deal</button>}</div>

            Cards Left: {this.state.cardDeck.length}
            <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between", minWidth:"50vh", marginTop:"50px"}}>
              <div style={{border:"solid black", padding:"15px", minWidth:"30%"}}>
                <p>Player1</p>
                <p>card:{currCardElems[0]}</p>
                <p>score:{this.state.player1score}</p>
              </div>
              <div style={{border:"solid black", padding:"15px", minWidth:"30%"}}>
                <p>Player2</p>
                <p>card:{currCardElems[1]}</p>
                <p>Score:{this.state.player2score}</p>
              </div>
            </div>
            
          </div>
        </header>
      </div>
    );
  }
}

export default App;
