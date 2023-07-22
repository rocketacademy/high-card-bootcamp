import React from "react";
import "./App.css";
import { makeShuffledDeck } from "./utils.js";
import Button from "@mui/material/Button";

//This line defines a new class component named App that extends React.Component.
//It allows us to create a reusable component with state and lifecycle methods provided by React.
class App extends React.Component {
  constructor(props) {
    // Always call super with props in constructor to initialise parent class
    super(props);
    //This line initializes the initial state of the component.
    //State is an object that stores data that can change over time and triggers re-rendering when updated.
    this.state = {
      // Set default value of card deck to new shuffled deck
      cardDeck: makeShuffledDeck(),
      // currCards holds the cards from the current round
      currCards: [],
      hasGameStarted: false,
      roundWinner: null,
      playerOneWon: 0,
      playerTwoWon: 0,
      roundTie: 0,
      noOfRoundsLeftInGame: 26,
    };
  }

  dealCards = () => {
    // this.state.cardDeck.pop() modifies this.state.cardDeck array
    const newCurrCards = [this.state.cardDeck.pop(), this.state.cardDeck.pop()];

    let newRoundWinner = null;
    if (newCurrCards[0].rank > newCurrCards[1].rank) {
      newRoundWinner = 1;
      this.setState((state) => ({
        playerOneWon: state.playerOneWon + 1,
      }));
    } else if (newCurrCards[1].rank > newCurrCards[0].rank) {
      newRoundWinner = 2;
      this.setState((state) => ({
        playerTwoWon: state.playerTwoWon + 1,
      }));
    } else {
      newRoundWinner = null;
      this.setState((state) => ({
        roundTie: state.roundTie + 1,
      }));
    }

    //This is using the 'setState' function to update the component's state. It takes a function as an argument, which receives the current state as its parameter.
    this.setState((state) => ({
      hasGameStarted: true,
      currCards: newCurrCards,
      roundWinner: newRoundWinner,
      noOfRoundsLeftInGame: state.noOfRoundsLeftInGame - 1,
    }));
  };

  resetGame = () => {
    this.setState((state) => ({
      cardDeck: makeShuffledDeck(),
      // currCards holds the cards from the current round
      currCards: [],
      hasGameStarted: false,
      roundWinner: null,
      playerOneWon: 0,
      playerTwoWon: 0,
      roundTie: 0,
      noOfRoundsLeftInGame: 26,
    }));
  };

  render() {
    //const currCardElems: This declares a constant variable named currCardElems, which will hold the result of the map function.
    //this.state.currCards.map(...): This is an array method called map. It is used on the this.state.currCards array, which contains card objects with properties like name and suit.
    //The map method loops through each element in the array and performs a specified function on each element.
    //({ name, suit }) => ...: This is an arrow function used as the callback function for the map method. It is used to define how each element in the array should be transformed. In this case, we are destructuring the card object to get the name and suit properties for each card.
    //we are using the map function's second argument index to determine the position of the card in the currCards array.
    //<div key={${name}${suit}}>: This creates a new div element for each card. The key attribute is added to help React efficiently update and render the list of elements when they change. The key is a unique identifier for each element.
    //{name} of {suit}: This is the content inside the div element. It displays the name and suit of the card.
    const currCardElems = this.state.currCards.map(({ name, suit }, index) => (
      // Give each list element a unique key
      <div key={`${name}${suit}`}>
        {index === 0 ? "Player 1: " : "Player 2: "}
        {name} of {suit}
      </div>
    ));

    const roundWinnerMessage = this.state.roundWinner
      ? `Player ${this.state.roundWinner} won this round.`
      : `This rounds is a tie!`;
    const player1RoundsWonMessage = `Player 1 has won ${this.state.playerOneWon} rounds this game.`;
    const player2RoundsWonMessage = `Player 2 has won ${this.state.playerTwoWon} rounds this game.`;
    const noOfTieInTheGameMessage = `Number of tie in the game: ${this.state.roundTie}.`;
    const noOfRoundLeftMessage = `There are ${this.state.noOfRoundsLeftInGame} rounds left in this game!`;
    //Then, display last output: player 1 or 2 won this game! OR It's a draw!
    let overallWinnerMessage = "";
    if (this.state.noOfRoundsLeftInGame === 0) {
      if (this.state.playerOneWon > this.state.playerTwoWon) {
        overallWinnerMessage = `Player 1 won this game!`;
      } else if (this.state.playerTwoWon > this.state.playerOneWon) {
        overallWinnerMessage = `Player 2 won this game!`;
      } else if (this.state.playerOneWon === this.state.playerTwoWon) {
        overallWinnerMessage = `It's a draw!`;
      }
    }

    const buttonText =
      this.state.noOfRoundsLeftInGame > 0 ? "Deal" : "Reset Game";

    return (
      <div className="App">
        <header className="App-header">
          <h3>High Card 🚀</h3>
          {currCardElems}
          <br />
          <Button
            variant="contained"
            color="secondary"
            onClick={
              this.state.noOfRoundsLeftInGame > 0
                ? this.dealCards
                : this.resetGame
            }
          >
            {buttonText}
          </Button>
          <p>{this.state.hasGameStarted && roundWinnerMessage}</p>
          <p>{this.state.hasGameStarted && player1RoundsWonMessage}</p>
          <p>{this.state.hasGameStarted && player2RoundsWonMessage}</p>
          <p>{this.state.hasGameStarted && noOfTieInTheGameMessage}</p>
          <p>{this.state.hasGameStarted && noOfRoundLeftMessage}</p>
          <p>{this.state.noOfRoundsLeftInGame === 0 && overallWinnerMessage}</p>
        </header>
      </div>
    );
  }
}

export default App;
