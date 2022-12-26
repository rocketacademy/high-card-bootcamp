import React from "react";
import "./App.css";
import { makeShuffledDeck } from "./utils.js";

import Button from 'react-bootstrap/Button';
import Card from "./components/Card";
import Score from "./components/Score";

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
      player2Score: 0
    };
  }

  dealCards = () => {
    this.setState((state) => ({
      // Remove last 2 cards from cardDeck
      cardDeck: state.cardDeck.slice(0, -2),
      // Deal last 2 cards to currCards
      currCards: state.cardDeck.slice(-2),
    }));
    // Check winner of 1 match and add score
    if (this.state.cardDeck.slice(-2, -1)[0].rank > this.state.cardDeck.slice(-1)[0].rank) {
      this.setState({
        player1Score: this.state.player1Score + 1
      })
    } else if (this.state.cardDeck.slice(-2, -1)[0].rank < this.state.cardDeck.slice(-1)[0].rank) {
      this.setState({
        player2Score: this.state.player2Score + 1
      })
    }
  };

  restartGame = () => {
    this.setState({
      cardDeck: makeShuffledDeck(),
      currCards: [],
      player1Score: 0,
      player2Score: 0
    })
  }

  compareScore = () => {
    let gameWinner
    if (this.state.player1Score > this.state.player2Score) {
      gameWinner = "Player 1!";  
    } else if (this.state.player1Score < this.state.player2Score) {
      gameWinner = "Player 2!";  
    } else {
      gameWinner = "a Draw!"
    }
    return gameWinner
  }

  restart = () => {
    return (
      <div>
        <h2>Winner of the game is {this.compareScore}</h2>
        <button onClick={this.restartGame}>Restart</button>
      </div>
    );
  }


  render() {
    const currCardElems = this.state.currCards.map(({ name, suit }, index) => (
      // Give each list element a unique key
      <Card key={`${name}${suit}`} name={name} suit={suit} index={index}/>
    ));

    let winner;

    if (this.state.currCards.length !== 0) {
      if (this.state.currCards[0].rank > this.state.currCards[1].rank) {
        winner = "Player 1 wins this round"
      } else if (this.state.currCards[0].rank < this.state.currCards[1].rank) {
        winner = "Player 2 wins this round"
      } else {
        winner = "Draw"
      }
    }

    if (this.state.cardDeck.length === 0) {
      winner = "Player 1 wins the game!"
    }

    return (
      <div className="App">
        <header className="App-header">
          <h3>High Card 🚀</h3>
          {currCardElems}
          <br />
          {(this.state.currCards.length !== 0) 
          ? <Score winner={winner} p1Score={this.state.player1Score} p2Score={this.state.player2Score} /> 
          : '' }
          {this.state.cardDeck.length !== 0 
          ? <Button onClick={this.dealCards} variant="outline-primary" >Deal</Button>
          // <button onClick={this.dealCards}>Deal</button> 
          : <button onClick={this.restartGame}>Restart</button> }
          <br />
        </header>
      </div>
    );
  }
}

export default App;
