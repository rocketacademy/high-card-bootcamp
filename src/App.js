import React from "react";
import "./App.css";
import { makeShuffledDeck } from "./utils.js";
import PlayingCard from "./cardimages";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import Button from "@mui/material/Button";
import CasinoRoundedIcon from "@mui/icons-material/CasinoRounded";
import RocketLaunchRoundedIcon from "@mui/icons-material/RocketLaunchRounded";

class App extends React.Component {
  constructor(props) {
    // Always call super with props in constructor to initialise parent class
    super(props);
    this.state = {
      // Set default value of card deck to new shuffled deck
      cardDeck: makeShuffledDeck(),
      // currCards holds the cards from the current round
      currCards: [],
      currComputerCards: [],
      roundWinner: "",
      score: [0, 0],
      overallWinner: "",
      roundsLeft: 26,
    };
  }

  dealCards = () => {
    // this.state.cardDeck.pop() modifies this.state.cardDeck array
    const newCurrCards = [this.state.cardDeck.pop()];
    const newComputerCurrCards = [this.state.cardDeck.pop()];
    this.setState(
      {
        currCards: newCurrCards,
        currComputerCards: newComputerCurrCards,
        roundsLeft: this.state.roundsLeft - 1,
      },
      () => this.determineWinner()
    );
    if (this.state.cardDeck.length === 0) {
      this.setState(() => this.determineOverallWinner());
    }
  };

  determineWinner = () => {
    const playerRank = this.state.currCards[0].rank;
    const computerRank = this.state.currComputerCards[0].rank;
    let playerScore = this.state.score[0];
    let computerScore = this.state.score[1];
    if (playerRank > computerRank) {
      this.setState({
        roundWinner: "Player",
        score: [(playerScore += 1), computerScore],
      });
    } else if (playerRank === computerRank) {
      this.setState({ roundWinner: "Draw" });
    } else {
      this.setState({
        roundWinner: "Computer",
        score: [playerScore, (computerScore += 1)],
      });
    }
  };

  determineOverallWinner = () => {
    const playerFinalScore = this.state.score[0];
    const computerFinalScore = this.state.score[1];

    if (playerFinalScore > computerFinalScore) {
      this.setState({ overallWinner: "Player wins" });
    } else if (playerFinalScore === computerFinalScore) {
      this.setState({ overallWinner: "It's a draw" });
    } else {
      this.setState({ overallWinner: "Computer wins" });
    }
  };

  restartGame = () => {
    this.setState({
      cardDeck: makeShuffledDeck(),
      currCards: [],
      currComputerCards: [],
      roundWinner: "",
      score: [0, 0],
      overallWinner: "",
      roundsLeft: 26,
    });
  };

  render() {
    // You can write JavaScript here, just don't try and set your state!

    // You can access your current components state here, as indicated below
    const currCardElems = this.state.currCards.map(({ name, suit }) => (
      // Give each list element a unique key
      <>
        <div key={`${name}${suit}`}>{/*{name} of {suit}*/}</div>
        <div>
          <PlayingCard value={name} suit={suit} />
        </div>
      </>
    ));
    const currComputerCardElems = this.state.currComputerCards.map(
      ({ name, suit }) => (
        // Give each list element a unique key
        <>
          <div key={`${name}${suit}`}>{/* {name} of {suit}*/}</div>
          <div>
            <PlayingCard value={name} suit={suit} />
          </div>
        </>
      )
    );
    const currWinner = this.state.roundWinner;
    const overallWinner = this.state.overallWinner;
    return (
      <div className="App">
        <header className="App-header">
          <h3>
            <CasinoRoundedIcon /> High Card <RocketLaunchRoundedIcon />
          </h3>
          {this.state.roundsLeft !== 26 && (
            <div className="card-hand">
              <p>Player Hand {currCardElems}</p>
              <p>Computer Hand {currComputerCardElems}</p>
            </div>
          )}
          {this.state.roundsLeft !== 26 && (
            <div className="winning-hand">
              <p>Winner: {currWinner}</p>
              <p>
                Player score: {this.state.score[0]}
                <br />
                Computer score: {this.state.score[1]}
              </p>
              <p>Rounds Left: {this.state.roundsLeft}</p>
              <p>{overallWinner}</p>
            </div>
          )}
          <div>
            {overallWinner ? (
              <Button variant="contained" onClick={this.restartGame}>
                Restart
              </Button>
            ) : (
              <Button variant="contained" onClick={this.dealCards}>
                Deal
              </Button>
            )}
          </div>
        </header>
      </div>
    );
  }
}

export default App;
