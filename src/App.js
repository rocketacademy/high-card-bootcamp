import React from "react";
import "./App.css";
import { makeShuffledDeck } from "./utils.js";

class App extends React.Component {
  // each time deal button is pressed
  // the card state is an array of two cards, the first and second card
  // The game: Take two cards,
  // Deal - deals two cards
  // need an array to track of # of rounds. Have a score state [0,0]

  constructor(props) {
    // Always call super with props in constructor to initialise parent class
    super(props);
    this.state = {
      // Set default value of card deck to new shuffled deck
      cardDeck: makeShuffledDeck(),
      // currCards holds the cards from the current round
      currCards: [],
      // Increment score for Player A, Player B, tie
      scoreState: [0, 0, 0],
      roundWinner: null, // winner of current round
      pastWins: [0, 0],
    };
  }

  // restart Game
  restartGame = () => {
    const { scoreState, pastWins } = this.state;
    if (scoreState[0] > scoreState[1]) {
      pastWins[0] = pastWins[0] + 1;
    } else {
      pastWins[1] = pastWins[1] + 1;
    }

    this.setState({
      // if player 1 wins, then increment pastWins[0] by 1, then increment pastWins[0] by 1
      // {(scoreState[0] > scoreState[1])
      //                     ? pastWins[0] = pastWins[0] + 1,
      //                     : pastWins[1] = pastWins[1] + 1,

      cardDeck: makeShuffledDeck(),
      currCards: [],
      scoreState: [0, 0, 0],
      roundWinner: null,
    });
  };

  //
  dealCards = () => {
    // this.state.cardDeck.pop() modifies this.state.cardDeck array
    const newCurrCards = [this.state.cardDeck.pop(), this.state.cardDeck.pop()];
    // creates a new array, with 2 cards from the deck
    // newCurrCards is the 2 new cards
    // whereas
    this.setState({
      currCards: newCurrCards,
    });

    // Update state somewhere else
    // determine which player has won the game
    if (this.state.currCards[0].rank > this.state.currCards[1].rank) {
      // Player A wins, update the score for player A
      this.state.scoreState[0] = this.state.scoreState[0] + 1;
      console.log("Player A wins");
    } else if (this.state.currCards[0].rank < this.state.currCards[1].rank) {
      // Player B wins, update the score for player B
      this.state.scoreState[1] = this.state.scoreState[1] + 1;
      console.log("Player B wins");
    } else {
      // Tie, no update to the score
      this.state.scoreState[2] = this.state.scoreState[2] + 1;
      console.log("Tie");
    }
  };

  render() {
    // You can write JavaScript here, just don't try and set your state!
    // ! Why cannot set state here?

    // You can access your current components state here, as indicated below
    const currCardElems = this.state.currCards.map(({ name, suit }) => (
      // Give each list element a unique key
      <div key={`${name}${suit}`}>
        {name} of {suit}
      </div>
    ));

    const numRoundsLeft = this.state.cardDeck.length / 2;
    const numRoundsLeftMsg = `There are ${numRoundsLeft} rounds left in the game!`;

    return (
      <div className="App">
        <header className="App-header">
          <h3>High Card 🚀</h3>
          {currCardElems}
          <div>
            Round Number:{" "}
            {this.state.scoreState[0] +
              this.state.scoreState[1] +
              this.state.scoreState[2] +
              1}
          </div>
          <div>{numRoundsLeftMsg}</div>

          <div>
            Player A has won {this.state.scoreState[0]} rounds this game
          </div>
          <div>
            Player B has won {this.state.scoreState[1]} rounds this game{" "}
          </div>
          <br />
          <div>
            {
              // Check if game over
              numRoundsLeft === 0 ? (
                <div>
                  {" "}
                  <div>Game Over</div>
                  <div>
                    {this.state.scoreState[0] > this.state.scoreState[1]
                      ? "Player A wins"
                      : "Player B wins"}
                  </div>
                  <button onClick={this.restartGame}>Restart</button>
                </div>
              ) : (
                <button onClick={this.dealCards}>Deal</button>
              )
            }
          </div>
          <div>Player A has won {this.state.pastWins[0]} games in past</div>
          <div>Player B has won {this.state.pastWins[1]} games in past </div>
        </header>
      </div>
    );
  }
}

export default App;
