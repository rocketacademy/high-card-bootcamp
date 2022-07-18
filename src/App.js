import React from "react";
import "./App.css";
import { makeShuffledDeck } from "./utils.js";
import PlayingCard from "./PlayingCard";

class App extends React.Component {
  constructor(props) {
    // Always call super with props in constructor to initialise parent class
    super(props);
    this.state = {
      // Set default value of card deck to new shuffled deck
      cardDeck: makeShuffledDeck(),
      // currCards holds the cards from the current round
      currCards: [],
      winnerMsg:"",
      playerTie:0,
      player1Wins:0,
      player2Wins:0,
      roundsLeft:26,
      overallWinner:"",
      reset:false,
      gamesPlayed:0
    };
  }

  // dealcard, comparecards,getoverallwinner,reset
  //component did update (put all the func here)

  dealCards = () => {
    console.log(this.state.reset,"deal cards")
    this.setState((state) => ({
     
      // Remove last 2 cards from cardDeck
      cardDeck: state.cardDeck.slice(0, -2),
      // Deal last 2 cards to currCards
      currCards: state.cardDeck.slice(-2),
    }));
  };
  
  //Functions we need: compareCards(get winnerMsg,increase PlayerWins/ties,RoundsLeft-1),
  compareCards = ()=> {
     console.log(this.state.reset,"compare cards")
    if(this.state.currCards[0].rank>this.state.currCards[1].rank){
      this.setState({
        player1Wins:this.state.player1Wins+1,
        roundsLeft:this.state.roundsLeft-1,
        winnerMsg:"Player 1 Wins!"
      })
    }
   else if(this.state.currCards[0].rank<this.state.currCards[1].rank){
      this.setState({
        player2Wins:this.state.player2Wins+1,
         roundsLeft:this.state.roundsLeft-1,
        winnerMsg:"Player 2 Wins!"
      })
    }
   else if(this.state.currCards[0].rank===this.state.currCards[1].rank){
   this.setState({
        playerTie:this.state.playerTie+1,
 roundsLeft:this.state.roundsLeft-1,
        winnerMsg:"Both Players Tie!"
      }) 
    }
  }
  //findOverallWinner (compare counts)
findOverallWinner = ()=>{
  console.log("find overallwinner",this.state.reset)
  //compare players Win counts 
  if (this.state.player1Wins>this.state.player2Wins){
    this.setState({
    //  reset:true,
      overallWinner:"Player 1 is overall winner!"
    })
  }
  if (this.state.player1Wins<this.state.player2Wins){
    this.setState({
     // reset:true,
      overallWinner:"Player 2 is overall winner!"
    })
  }
  else if (this.state.player1Wins===this.state.player2Wins){
    this.setState({
     // reset:true,
      overallWinner:"Both have a tie overall!"
    })
  }
   this.setState({
    reset:true
   })
}

//reset function 
resetGame=()=>{
  console.log("resetgame func")
  this.setState({ 
    cardDeck: makeShuffledDeck(),
      // currCards holds the cards from the current round
      currCards: [],
      winnerMsg:"",
      playerTie:0,
      player1Wins:0,
      player2Wins:0,
      roundsLeft:26,
      overallWinner:"",
      reset:false
  })
}

gamesPlayed=()=>{
  console.log("gamesplayed+1")
this.setState({
  gamesPlayed:this.state.gamesPlayed+1
})
}
  //componentDidUpdate( put these functions in: compareCards, findOverallWinner,resetfunc,gamesplayed)
componentDidUpdate(prevProps,prevState){
  //resetfunc
  if(this.state.reset){
    console.log("lifecycle reset condition")
    // this.resetGame();
  }
 else if (this.state.reset!==prevState.reset){
   this.gamesPlayed();
  }
 else if (this.state.currCards!==prevState.currCards){
    this.compareCards();
 // this.findOverallWinner();
  }
  else if (this.state.roundsLeft===0){
     this.findOverallWinner();
  }
}
  
  render() {
     
       const currCardElems = this.state.currCards.map(({ name, suit }, index) => (
      // Give each list element a unique key
      <div key={`${name}${suit}`}>
         <p>Player: {index + 1}</p>
        {name} of {suit}<br></br>
      </div>
    ));

    return (
      <div className="App">
        <header className="App-header">
           
          <div className="card-output">
            <h3>High Card 🚀</h3>
          {/* <h2>{currCardElems}</h2> */}
           <PlayingCard currCard={this.state.currCards} />

        {/* Trying to display each element individually 
          <h2>Player1</h2>
        <h1> {this.state.currCards[0]} </h1>
          <h2>Player2</h2>
          <h1> {this.state.currCards[1]}</h1> */}

         
          <button onClick={this.state.roundsLeft===0 ? this.resetGame : this.dealCards}>{this.state.roundsLeft===0 ? `Reset` : `Deal`}</button>
</div><div className="leaderboard">
<h2>Results: {this.state.winnerMsg}</h2>

<h3>Player 1 Win Count: {this.state.player1Wins}  </h3>
<h3>Player 2 Win Count: {this.state.player2Wins}  </h3>
<h3>Player Tie Count: {this.state.playerTie} </h3>
<h3>Rounds Left: {this.state.roundsLeft}  </h3>
<h3>Games Played: {this.state.gamesPlayed}  </h3>
<h3>{this.state.roundsLeft=== 0 ? `Overall Winner: ${this.state.overallWinner}` : null}</h3>
</div>
        </header>
      </div>
    );
  }
}

export default App;
