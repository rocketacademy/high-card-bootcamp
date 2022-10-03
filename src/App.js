import React from "react";
import "./App.css";
import { PastResults } from "./components/PastResults";
import { RestartButton } from "./components/RestartButton";
import { makeShuffledDeck } from "./utils.js";
import Button from "@mui/material/Button";
import { CardIcon } from "./components/CardIcon";

class App extends React.Component {
  constructor(props) {
    // Always call super with props in constructor to initialise parent class
    super(props);
    this.state = {
      // Set default value of card deck to new shuffled deck
      cardDeck: makeShuffledDeck(),
      // currCards holds the cards from the current round
      currCards: [],
      playerOneScore: 0,
      playerTwoScore: 0,
      isCardDeckEmpty: false,
      pastRounds: [],
    };
  }

  gameRestarted = () => {
    this.setState((state) => ({
      isCardDeckEmpty: false,
      cardDeck: makeShuffledDeck(),
      currCards: [],
      pastRounds: [
        ...state.pastRounds,
        [state.playerOneScore, state.playerTwoScore],
      ],
      playerOneScore: 0,
      playerTwoScore: 0,
    }));

    console.log(this.state.pastRounds);
  };

  dealCards = () => {
    const newCurrCards = this.state.cardDeck.slice(-2);
    let newRoundWinner = null;
    // Add score to the player that wins the round. No points for draw.
    if (newCurrCards[0].rank > newCurrCards[1].rank) {
      newRoundWinner = 1;
    } else if (newCurrCards[1].rank > newCurrCards[0].rank) {
      newRoundWinner = 2;
    }

    let isDeckRefreshing = 0;
    if (this.state.cardDeck.length === 2) {
      isDeckRefreshing = 1;
    }
    this.setState((state) => ({
      // Remove last 2 cards from cardDeck
      cardDeck: state.cardDeck.slice(0, -2),
      // Deal last 2 cards to currCards
      currCards: newCurrCards,
      playerOneScore:
        newRoundWinner === 1 ? state.playerOneScore + 1 : state.playerOneScore,
      playerTwoScore:
        newRoundWinner === 2 ? state.playerTwoScore + 1 : state.playerTwoScore,
      // Restart game when card deck is empty
      isCardDeckEmpty: isDeckRefreshing === 1 ? true : false,
    }));


  };

  render() {
    const currCardElems = this.state.currCards.map(({ name, suit }, index) => (
      // Give each list element a unique key
      <div key={`${name}${suit}`}>
        <br></br>
        <div>
          Player {index + 1}: {name} of {suit}
        </div>
        <br></br>
        <div
          style={{
            border: "2px solid white",
            borderRadius: "10%",
            padding: "10px 20px",
            width: "180px",
            margin: "0 auto",
          }}
        >
          <h3 style={{ textAlign: "left" }}>{name}</h3>
          <br></br>
          <CardIcon suit={suit} />


          <br></br>
          <h3 style={{ textAlign: "right" }}>{name}</h3>
        </div>
      </div>
    ));

    return (
      <div className="App">
        <header className="App-header">
          <h3>High Card 🚀</h3>
          {currCardElems}
          <br></br>
          <h3>Current Results</h3>
          {this.state.currCards.length !== 0 &&
            (this.state.currCards[0].rank === this.state.currCards[1].rank ? (
              <div>It is a draw!</div>
            ) : this.state.currCards[0].rank > this.state.currCards[1].rank ? (
              <div>Player 1 wins!</div>
            ) : (
              <div>Player 2 wins!</div>
            ))}
          <br></br>

          <div>Player 1: {this.state.playerOneScore}</div>

          <div>Player 2: {this.state.playerTwoScore}</div>

          <br />
          <Button
            size="large"
            variant="contained"
            color="success"
            onClick={this.dealCards}
          >
            Deal
          </Button>

          {this.state.isCardDeckEmpty && (
            <RestartButton gameRestarted={this.gameRestarted} />
          )}
          {this.state.pastRounds.length > 0 && (
            <PastResults value={this.state.pastRounds} />
          )}
        </header>
      </div>
    );
  }
}

export default App;
