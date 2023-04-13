import React from "react";
import "./App.css";
import { makeShuffledDeck } from "./utils.js";
import PlayingCards from "./playingcard";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";

class App extends React.Component {
  constructor(props) {
    // Always call super with props in constructor to initialise parent class
    super(props);
    this.state = {
      // Set default value of card deck to new shuffled deck
      cardDeck: makeShuffledDeck(),
      // currCards holds the cards from the current round
      currCards: [],

      // State to track who won from the current round
      currWinner: null,

      // State to track the score of each player
      scoreboard: [0, 0],
    };
  }
  // Code to determine who won, Player 1 or 2
  determineWinner = () => {
    const { currCards } = this.state;
    let s1 = this.detSuiteRank(currCards[0]);
    let s2 = this.detSuiteRank(currCards[1]);
    const currWinner =
      currCards[0].rank === currCards[1].rank
        ? s1 > s2
          ? "Player 1"
          : "Player 2"
        : currCards[0].rank > currCards[1].rank
        ? "Player 1"
        : "Player 2";

    this.setState({ currWinner });
    if (currWinner === "Player 1") {
      this.updateScore(1);
    } else if (currWinner === "Player 2") {
      this.updateScore(2);
    }
  };

  detSuiteRank = (card) => {
    switch (card.suit) {
      case "Hearts":
        return 3;
      case "Spades":
        return 4;
      case "Clubs":
        return 2;
      case "Diamonds":
        return 1;
      default:
        return null;
    }
  };
  updateScore = (n) => {
    const { scoreboard } = this.state;
    if (n === 1) {
      scoreboard[0]++;
    } else if (n === 2) {
      scoreboard[1]++;
    }
    this.setState({ scoreboard });
  };

  dealCards = () => {
    // this.state.cardDeck.pop() modifies this.state.cardDeck array
    if (this.state.cardDeck !== []) {
      const newCurrCards = [
        this.state.cardDeck.pop(),
        this.state.cardDeck.pop(),
      ];
      // console.log(this.state.cardDeck);
      this.setState(
        {
          currCards: newCurrCards,
        },
        () => {
          // Call determineWinner after the state has been updated
          this.determineWinner();
        }
      );
    } else {
      return (
        <p>
          The deck is out of cards. Please click 'restart to restart the game.
        </p>
      );
    }
  };

  restartGame = () => {
    this.setState({
      cardDeck: makeShuffledDeck(),
      currCards: [],
      currWinner: null,
      scoreboard: [0, 0],
    });
  };
  render() {
    //Code to check the winner: if cardRank not same, return higher cardRank, if same, check for suite and return higher suite

    const { cardDeck, currCards, currWinner, scoreboard } = this.state;
    const currCardElems = currCards.map(({ name, suit }, index) => (
      // Give each list element a unique key //{name} of {suit}

      <div  key={`${name}${suit}`}>
        {
          <PlayingCards
            name={currCards[index].name}
            suit={currCards[index].suit}
          />
        }
        <br />
        <br />
        <Typography color="black" fontSize="16px">
          Player {index + 1}
        </Typography>
      </div>
    ));

    const changeOutput = () => {
      if (currWinner) {
        return (
          <div>
            <Box sx={{
                  width: 500,
                  height: 130,
                  padding: 1,
                  border: 2,
                  borderColor: "black",
                  backgroundColor: "rgb(18, 18, 50)",
                }}>
              <h5>{currWinner} has won this round</h5>
              <p>Player 1 has {scoreboard[0]} points.</p>
              <p>Player 2 has {scoreboard[1]} points.</p>
              <Button
                id="deal"
                variant="contained"
                color="primary"
                onClick={this.dealCards}
              >
                Deal
              </Button>
            </Box>
          </div>
        );
      } else {
        return (
          <Box sx={{
            width: 500,
            height: 130,
            padding: 1,
            border: 2,
            borderColor: "black",
            backgroundColor: "rgb(18, 18, 50)",
          }}>
            <p>Press 'Deal' to start the game.</p>
            <Button
                id="deal"
                variant="contained"
                color="primary"
                onClick={this.dealCards}
              >
                Deal
              </Button>
          </Box>
        );
      }
    };

    const gameWinner =
      scoreboard[0] > scoreboard[1] ? (
        <Box sx={{width: 500,
          height: 80,
          padding: 1,
          border: 2,
          borderColor: "black",
          backgroundColor: "red",}}>
          <h3>Player 1 has won this game</h3>
        </Box>
      ) : scoreboard[0] < scoreboard[1] ? (
        <Box sx={{width: 500,
          height: 80,
          padding: 1,
          border: 2,
          borderColor: "black",
          backgroundColor: "red",}}>
          <h3>Player 2 has won this game</h3>
        </Box>
      ) : (
        <Box sx={{width: 500,
          height: 80,
          padding: 1,
          border: 2,
          borderColor: "black",
          backgroundColor: "green",}}>
          <h3>Both players are tied</h3>
        </Box>
      );

    return (
      <div className="App">
        <header className="App-header">
          <h3>High Card 🚀</h3>
          {currWinner ? (
            <div className='ImageBlock'>
              <Box 
                sx={{
                  width: 150,
                  height: 180,
                  padding: 5,
                  border: 2,
                  borderColor: "purple",
                  backgroundColor: "paleturquoise",
                  position:'absolute',
                  top:150,
                  left: 250,
                }}
              >
                {currCardElems[0]}
              </Box>
              <Box
                sx={{
                  width: 150,
                  height: 180,
                  padding: 5,
                  border: 2,
                  borderColor: "purple",
                  backgroundColor: 'palegreen',
                  position:'absolute',
                  top:150,
                  right: 250,
                }}
              >
                {currCardElems[1]}
              </Box>
            </div>
          ) : (
            <div></div>
          )}
          {changeOutput()}
          <br />
          {cardDeck.length === 0 ? (
            <div>
              {gameWinner}
              <Box sx={{
                  width: 500,
                  height: 130,
                  padding: 1,
                  border: 2,
                  borderColor: "black",
                  backgroundColor: "rgb(18, 18, 50)",
                }}>
                <p>Press Restart to restart the game</p>
                <Button
                  id="reset"
                  variant="contained"
                  color="error"
                  onClick={this.restartGame}
                >
                  Restart
                </Button>
              </Box>
            </div>
          ) : (
            <div>
              

              <Box sx={{width: 250,
                  height: 130,
                  padding: 1,
                  border: 2,
                  borderColor: "black",
                  backgroundColor: "rgb(18, 18, 50)",
                  
                }}>
                <p>Reset the game:</p>
                <Button
                  id="reset"
                  variant="outlined"
                  color="error"
                  onClick={this.restartGame}
                >
                  Restart
                </Button>
              </Box>
            </div>
          )}
        </header>
      </div>
    );
  }
}

export default App;
