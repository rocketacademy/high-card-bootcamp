import React from "react";
import "./App.css";
import { makeShuffledDeck } from "./utils.js";
import "bootstrap/dist/css/bootstrap.min.css";

class App extends React.Component {
  constructor(props) {
    // Always call super with props in constructor to initialise parent class
    super(props);
    this.state = {
      // Set default value of card deck to new shuffled deck
      cardDeck: makeShuffledDeck(),
      // currCards holds the cards from the current round
      currCards: [],
      //index of the winner per each round
      indexWinner: -1,
      player1Score: 0,
      player2Score: 0,
      //the winner of the game in the end of 26 rounds
      roundWinner: null,
      gameStart: true,
      //overall player score across multiple game sessions
      overallPlayer1Score: 0,
      overallPlayer2Score: 0,
    };
  }

  dealCards = () => {
    // dealing cards
    const newCurrCards = [this.state.cardDeck.pop(), this.state.cardDeck.pop()];

    this.setState(
      {
        currCards: newCurrCards,
      },
      () => {
        this.determineWinner();
      }
    );
  };

  reset = () => {
    //reset every state except overall player score across multiple game sessions
    this.setState({
      cardDeck: makeShuffledDeck(),
      currCards: [],
      indexWinner: -1,
      player1Score: 0,
      player2Score: 0,
      restart: false,
      roundWinner: null,
    });
  };

  determineWinner = () => {
    //compare rank of player 1 and player 2 card
    //return winner, either index 0 (player 1) or 1 (player 2) or 99 (tie).
    let temp = -1;

    if (this.state.currCards === null) {
      temp = -1;
    } else if (this.state.currCards[0].rank > this.state.currCards[1].rank) {
      temp = 0;
    } else if (this.state.currCards[1].rank > this.state.currCards[0].rank) {
      temp = 1;
    } else {
      temp = 99;
    }

    //trigger function to count the total score
    this.setState(
      {
        indexWinner: temp,
      },
      () => {
        this.countScore();
      }
    );
  };

  countScore = () => {
    //counting score for each player
    const tempCounter = [0, 0];
    //if indexWinner is 0, add +1 to count index 0, vice versa
    if (this.state.indexWinner === 0) {
      tempCounter[0]++;
    } else if (this.state.indexWinner === 1) {
      tempCounter[1]++;
    }
    //update all the scores
    this.setState((prevState) => ({
      player1Score: prevState.player1Score + tempCounter[0],
      player2Score: prevState.player2Score + tempCounter[1],
      overallPlayer1Score: prevState.overallPlayer1Score + tempCounter[0],
      overallPlayer2Score: prevState.overallPlayer2Score + tempCounter[1],
    }));

    //trigger a function to check who is the overall winner
    // this.setState(() => {
    //   this.checkWinner();
    // });
  };

  // checkWinner = () => {
  //   //to check who is the overall winner based on who has the highest score
  //   let tempWinner = -1;
  //   if (this.state.player1Score > this.state.player2Score) {
  //     tempWinner = 0;
  //   } else if (this.state.player2Score > this.state.player1Score) {
  //     tempWinner = 1;
  //   } else if (this.state.player1Score === this.state.player2Score) {
  //     tempWinner = 99;
  //   }

  //   this.setState({
  //     roundWinner: tempWinner,
  //   });
  // };

  render() {
    //showing the card image
    const imageCard = this.state.currCards.map(({ name, suit }) => (
      <img
        src={require(`./PNG/${name.toLowerCase()}_of_${suit.toLowerCase()}.png`)}
        alt={`${name} of ${suit}`}
        style={{ height: "200px" }}
      />
    ));

    const numRoundsLeft = this.state.cardDeck.length / 2;

    //winner in each round
    const winnerMessage =
      this.state.indexWinner === -1
        ? ""
        : this.state.indexWinner === 99
        ? `Tie`
        : `Player ${this.state.indexWinner + 1} won!`;

    //overall winner in 26 rounds
    const gameWinnerMessage =
      this.state.player1Score === this.state.player2Score
        ? "Tie"
        : this.state.player1Score > this.state.player2Score
        ? `🏆Player 1 WON!🏆`
        : `🏆Player 2 WON!🏆`;

    return (
      <div className="container">
        <div className="row mt-2">
          <div className="col-10"></div>
          <div className="col-2 text-right">
            <p>{numRoundsLeft} rounds left</p>
          </div>
          <div className="text-center mt-1 mb-5">
            <h3>High Card 🚀</h3>
          </div>

          <div className="col text-center">
            {imageCard[0]}
            <p>Player 1</p>
            <h2>🏆{this.state.player1Score}</h2>
            <p>Overall 🏆{this.state.overallPlayer1Score} </p>
          </div>

          <div className="col text-center">
            {imageCard[1]}
            <p>Player 2</p>
            <h2>🏆{this.state.player2Score}</h2>
            <p>Overall 🏆{this.state.overallPlayer2Score}</p>
          </div>
        </div>
        {console.log("Player 1 Score:", this.state.player1Score)};
        {console.log("Player 2 Score:", this.state.player2Score)};
        <div className="row">
          <div className="col-12 text-center">
            {numRoundsLeft > 0 ? (
              <button className="btn btn-dark" onClick={this.dealCards}>
                Deal
              </button>
            ) : (
              <button className="btn btn-light" onClick={this.reset}>
                Reset
              </button>
            )}
          </div>

          <h2 className="text-center mt-2">
            {numRoundsLeft > 0 && winnerMessage}
          </h2>

          <h1 className="text-center mt-2">
            {numRoundsLeft === 0 && gameWinnerMessage}
          </h1>
        </div>
      </div>
    );
  }
}

export default App;
