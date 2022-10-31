import React from "react";
import "./App.css";
import { makeShuffledDeck } from "./utils.js";
import Player from "./Components/Player";
import Scoreboard from "./Components/Scoreboard";

// A deck of 52 cards

// 2 players
// Every round, highest cards wins the round
// After 26 rounds, player with more round won, wins the match

class App extends React.Component {
  constructor(props) {
    // Always call super with props in constructor to initialise parent class
    super(props);
    this.state = {
      // Set default value of card deck to new shuffled deck
      cardDeck: makeShuffledDeck(),
      // currCards holds the cards from the current round
      currCards: [],
      P1Score: 0,
      P2Score: 0,
      dealButtonEnabled: false,
      P1Wins: 0,
      P2Wins: 0,
    };
  }

  dealCards = () => {
    console.log(this.state.dealButtonEnabled);
    console.log(this.state.cardDeck);
    if (!(this.state.cardDeck.length == 0)) {
      this.setState(
        (state) => ({
          // Remove last 2 cards from cardDeck
          cardDeck: state.cardDeck.slice(0, -2),
          // Deal last 2 cards to currCards
          currCards: state.cardDeck.slice(-2),
        }),
        () => this.checkScore()
      );
    } else {
      this.setState(
        (state) => ({ dealButtonEnabled: true }),
        () => this.gameMatch()
      );
      console.log("Reach this else statement");
    }
  };

  checkScore = () => {
    //console.log(props);
    let P1CardRank = "";
    let P2CardRank = "";
    console.log(this.state.currCards);
    if (!(this.state.currCards.length === 0)) {
      console.log("Check Score running");

      P1CardRank = this.state.currCards[0]["rank"];
      P2CardRank = this.state.currCards[1]["rank"];
      if (P1CardRank > P2CardRank) {
        this.setState({
          P1Score: this.state.P1Score + 1,
        });
      } else {
        this.setState({
          P2Score: this.state.P2Score + 1,
        });
      }
    }
  };

  gameMatch = () => {
    if (this.state.P1Score > this.state.P2Score) {
      console.log("Reach first condition");
      this.setState({
        P1Wins: this.state.P1Wins + 1,
      });
    } else if (this.state.P2Score > this.state.P1Score) {
      console.log("Reach second condition");

      this.setState({
        P2Wins: this.state.P2Wins + 1,
      });
    } else {
      console.log("Reach third condition");

      this.setState({
        P1Wins: this.state.P1Wins + 1,
        P2Wins: this.state.P2Wins + 1,
      });
    }
  };

  reset = () => {
    this.setState((state) => ({
      cardDeck: makeShuffledDeck(),
      // currCards holds the cards from the current round
      currCards: [],
      P1Score: 0,
      P2Score: 0,
      dealButtonEnabled: false,
    }));
  };

  render() {
    console.log(this.state.P1Score);
    console.log(this.state.P2Score);

    const currCardElems = this.state.currCards.map(({ name, suit }) => (
      // Give each list element a unique key
      <div key={`${name}${suit}`}>
        {name} of {suit}
      </div>
    ));

    return (
      <div className="App">
        <header className="App-header">
          <h3>High Card 🚀</h3>

          {currCardElems}
          <Scoreboard
            P1Score={this.state.P1Score}
            P2Score={this.state.P2Score}
            P1Wins={this.state.P1Wins}
            P2Wins={this.state.P2Wins}
          />
          <Player playerID={1} cards={currCardElems} />
          <Player playerID={2} cards={currCardElems} />
          <br />
          <button
            onClick={() => {
              this.dealCards();
            }}
            disabled={this.state.dealButtonEnabled}
          >
            Deal
          </button>
          <button onClick={this.reset}>Restart</button>
        </header>
      </div>
    );
  }
}

export default App;
