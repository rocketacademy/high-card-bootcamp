import React from "react";
import "./App.css";
import { makeShuffledDeck } from "./utils";
import { imageMap } from "./images/images";

const rank_names = {
  2: "two",
  3: "three",
  4: "four",
  5: "five",
  6: "six",
  7: "seven",
  8: "eight",
  9: "nine",
  10: "ten",
  11: "jack",
  12: "queen",
  13: "king",
  14: "ace",
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cardDeck: makeShuffledDeck(),
      currCards: [],
      roundWinner: null,
      playerOneWins: 0,
      playerTwoWins: 0,
      roundsRemaining: null,
    };
  }

  dealCards = () => {
    //create the array for comparison
    const newCards = this.state.cardDeck.slice(-2);

    let currentRoundWinner = null;
    if (newCards[0].rank > newCards[1].rank) {
      currentRoundWinner = 1;
    } else if (newCards[0].rank < newCards[1].rank) {
      currentRoundWinner = 2;
    } else if (newCards[0].rank === newCards[1].rank) {
      currentRoundWinner = 0;
    }
    this.setState((state) => ({
      cardDeck: state.cardDeck.slice(0, -2),
      currCards: state.cardDeck.slice(-2),
      roundWinner: currentRoundWinner,
      playerOneWins:
        currentRoundWinner === 1
          ? this.state.playerOneWins + 1
          : this.state.playerOneWins,
      playerTwoWins:
        currentRoundWinner === 2
          ? this.state.playerTwoWins + 1
          : this.state.playerTwoWins,
    }));
  };

  restart = () => {
    this.setState({
      cardDeck: makeShuffledDeck(),
      currCards: [],
      roundWinner: null,
      playerOneWins: 0,
      playerTwoWins: 0,
    });
  };

  render() {
    const currCardElems = this.state.currCards.map(({ name, suit, rank }) => {
      const mappedImgSuit = `${rank_names[rank]}${suit}`;
      return (
        <div key={`${name}${suit}`}>
          {name} of {suit}{" "}
          <img src={imageMap[mappedImgSuit]} width="40px" alt="card-suit" />
        </div>
      );
    });

    const roundsLeft = this.state.cardDeck.length / 2;

    return (
      <div className="App">
        <header className="App-header">
          <h1>High Card 🚀</h1>
          {currCardElems}
          <br />
          {this.state.roundWinner != null && this.state.roundWinner !== 0 && (
            <div>
              <h5>Player {this.state.roundWinner} wins this round!</h5>
              <h5> There are {roundsLeft} rounds left!</h5>
            </div>
          )}
          {this.state.roundWinner === 0 && (
            <h5>Draw this round! There are {roundsLeft} rounds left!</h5>
          )}

          <br />
          {roundsLeft !== 0 && <button onClick={this.dealCards}>Deal</button>}
          {roundsLeft === 0 && <button onClick={this.restart}>Restart</button>}
        </header>
      </div>
    );
  }
}

export default App;
