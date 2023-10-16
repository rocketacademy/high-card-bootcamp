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
      winner: null, // Add a winner state variable
      player1Score: 0,
      player2Score: 0,
    };

    // Define newCurrCards as a class property so it can be accessed outside dealCards()
    this.newCurrCards = [];
    this.player1 = {};
    this.player2 = {};
  }

  dealCards = () => {
    if (this.state.cardDeck.length < 2) {
      // Check if there are enough cards in the deck
      return;
    }

    // this.state.cardDeck.pop() modifies this.state.cardDeck array
    this.newCurrCards = [this.state.cardDeck.pop(), this.state.cardDeck.pop()];
    this.setState({
      currCards: this.newCurrCards,
      winner: null, // Resets the winner when dealing new cards
    });

    console.log(this.newCurrCards);
  };

  /////////////////////////////
  // IMPORTANT! DETERMINES WINNER BASED ON PLAYERSCORE
  whoWon = () => {
    if (this.state.cardDeck.length < 2) {
      return; // guard clause
    }

    /////////////
    // Extract cards and determine winner
    // extracts the two cards and saves the 2 objects into the class properties, player1 and player2
    [this.player1, this.player2] = this.newCurrCards;
    console.log(
      this.player1.suit.toLowerCase(),
      this.player2.suit.toLowerCase()
    );

    ////////////
    // Comparing card ranks
    let winner = null;
    if (this.player1.rank > this.player2.rank) {
      winner = this.player1; // player1 is declared as the winner

      // Incrementing overall player1Score
      this.setState((prevState) => ({
        player1Score: prevState.player1Score + 1,
        /** Breakdown of incrementing player1Score
         1. this.setState is a method provided by React to update state of a component. 
              When setState is called, React re-renders the component with the updated state and reflects it in rendered UI
         2. (prevState) => {...}: setState takes a function as an argument, which is the previous state, prevState.
              This ensures we are working with the most up-to-date state
         3. player1Score: prevState.player1Score + 1 -> we then increment the player1Score property by 1 based on the previous      state's value. This ensures only that part of the state is updated while the rest of the state is unchanged
         */
      }));
    } else if (this.player1.rank < this.player2.rank) {
      winner = this.player2;
      // Incrementing overall player2Score
      this.setState((prevState) => ({
        player2Score: prevState.player2Score + 1,
      }));
    }

    /////////////
    // Update the winner state variable
    this.setState({ winner }); // updates the component's state to indicate the winner of the current round.
  };

  render() {
    // You can write JavaScript here, just don't try and set your state!

    // You can access your current components state here, as indicated below
    const currCardElems = this.state.currCards.map(({ name, suit }) => (
      // Give each list element a unique key
      <div key={`${name}${suit}`}>
        {name} of {suit}
      </div>
    ));

    if (this.player1.name && this.player1.suit) {
      var player1ImageSrc = `./PNG-cards-1.3/${
        this.player1.name
      }_of_${this.player1.suit.toLowerCase()}.png`;
      var test = "./PNG-cards-1.3/7_of_spades.png";
    }

    return (
      <div className="App">
        <header className="App-header">
          <h3>High Card 🚀</h3>
          {currCardElems}
          <div>
            <div>
              <img
                src={player1ImageSrc}
                alt={`Player1 = ${this.player1.name} of ${this.player1.suit}`}
              />
              <img src={test} />
            </div>
          </div>
          <br />
          <button onClick={this.dealCards}>Deal</button>
          <button onClick={this.whoWon}>Who is the winner</button>
          {this.state.cardDeck.length < 2 ? (
            <h1>
              The overall winner is:{" "}
              {this.state.player1Score > this.state.player2Score
                ? "Player 1"
                : "Player 2"}
            </h1>
          ) : (
            <h1>
              The player that won is:{" "}
              {this.state.winner
                ? this.state.winner.name + " of " + this.state.winner.suit
                : "No winner yet"}
            </h1>
          )}
          The number of cards left in the deck is: {this.state.cardDeck.length}
          <br />
          Player 1's Score: {this.state.player1Score}
          <br />
          Player 2's Score: {this.state.player2Score}
        </header>
      </div>
    );
  }
}

export default App;
