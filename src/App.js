import React from "react";
import "./App.css";
import { makeShuffledDeck } from "./utils.js";
import { Stack, Button, Box, Typography } from "@mui/material";
import PlayingCards from "./Components/PlayingCards";

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
      player2Score: 0,
      currWinner: null,
      hasGameBegin: false,
      numMatchesPlayer1Won: 0,
      numMatchesPlayer2Won: 0,
      matchNumber: 1,
    };
  }

  dealCards = () => {
    // this.state.cardDeck.pop() modifies this.state.cardDeck array
    let { cardDeck } = this.state;
    const newCurrCards = [cardDeck.pop(), cardDeck.pop()];
    this.setState(
      {
        currCards: newCurrCards,
        hasGameBegin: true,
      },
      () => this.calculateScoresPerRound()
    );
  };

  calculateScoresPerRound = () => {
    let [p1Card, p2Card] = this.state.currCards;
    let { cardDeck } = this.state;
    if (cardDeck.length > 0) {
      if (p1Card.rank > p2Card.rank) {
        this.setState((prevState) => ({
          currWinner: 1,
          player1Score: prevState.player1Score + 1,
        }));
      } else if (p1Card.rank < p2Card.rank) {
        this.setState((prevState) => ({
          currWinner: 2,
          player2Score: prevState.player2Score + 1,
        }));
      }
    } else if (cardDeck.length === 0) {
      this.setState(
        {
          hasGameBegin: false,
        },
        () => this.determineFinalWinner()
      );
    }
  };

  determineFinalWinner = () => {
    let { player1Score, player2Score } = this.state;
    if (player1Score > player2Score) {
      this.setState((prevState) => ({
        numMatchesPlayer1Won: prevState.numMatchesPlayer1Won + 1,
      }));
    } else if (player1Score < player2Score) {
      this.setState((prevState) => ({
        numMatchesPlayer2Won: prevState.numMatchesPlayer2Won + 1,
      }));
    }
  };

  // function to restart entire game
  restartGame = () => {
    this.setState({
      cardDeck: makeShuffledDeck(),
      // currCards holds the cards from the current round
      currCards: [],
      player1Score: 0,
      player2Score: 0,
      currWinner: null,
      hasGameBegin: false,
      numMatchesPlayer1Won: 0,
      numMatchesPlayer2Won: 0,
      matchNumber: 1,
    });
  };

  // function to start new match
  startNewMatch = () => {
    this.setState((prevState) => ({
      cardDeck: makeShuffledDeck(),
      // currCards holds the cards from the current round
      currCards: [],
      player1Score: 0,
      player2Score: 0,
      currWinner: null,
      hasGameBegin: false,
      matchNumber: prevState.matchNumber + 1,
    }));
  };

  render() {
    let { currCards, currWinner, player1Score, player2Score } = this.state;
    let currCardElems = currCards.map(({ name, suit }) => (
      // Give each list element a unique key
      <PlayingCards key={`${name}${suit}`} name={name} suit={suit} />
    ));
    // You can write JavaScript here, just don't try and set your state!
    let winnerPerRound = `Player ${currWinner} won this round!`;
    // You can access your current components state here, as indicated below

    let winnerPerMatch;
    if (player1Score > player2Score) {
      winnerPerMatch = (
        <>
          <p>
            Game over! <br />
            Player 1 won this match. Would you like to continue?
          </p>
        </>
      );
    } else if (player1Score < player2Score) {
      winnerPerMatch = (
        <>
          <p>
            Game over!
            <br /> Player 2 won this match. Would you like to continue?
          </p>
        </>
      );
    } else {
      winnerPerMatch = (
        <>
          <p>
            Game over! <br />
            Both tie. Would you like to continue?
          </p>
        </>
      );
    }

    const dealCardsButton = (
      <>
        <Button variant="contained" color="secondary" onClick={this.dealCards}>
          Deal
        </Button>
      </>
    );

    const continueGameButton = (
      <>
        <Button
          variant="contained"
          color="success"
          onClick={this.startNewMatch}
        >
          Yes, Enter Game
        </Button>
      </>
    );

    const exitGameButton = (
      <>
        <Button variant="contained" color="error" onClick={this.restartGame}>
          No, Exit game
        </Button>
      </>
    );

    return (
      <div className="App">
        <header className="App-header">
          <Box
            sx={{
              backgroundColor: "#4aedc4",
              width: 700,
              height: 500,
              color: "black",
            }}
          >
            <Typography style={{ fontFamily: "helvetica", fontSize: 20 }}>
              <Box
                sx={{
                  width: 700,
                  height: 90,
                }}
              >
                <Box
                  sx={{
                    display: "flex",

                    justifyContent: "space-evenly",

                    alignItems: "center",
                  }}
                >
                  <Box>
                    <p>
                      {this.state.numMatchesPlayer1Won} -- <b>Player 1</b>
                    </p>
                  </Box>

                  <Box>
                    <p>High Card 🚀</p>
                    <p>
                      {" "}
                      Match: {this.state.matchNumber} --{" "}
                      {this.state.cardDeck.length} Cards
                    </p>
                  </Box>

                  <Box>
                    {this.state.numMatchesPlayer2Won} -- <b>Player 2</b>
                  </Box>
                </Box>
              </Box>
              <div style={{ height: 50, width: 700 }}></div>
              <Box
                sx={{
                  width: 700,
                  height: 150,

                  display: "flex",

                  justifyContent: "space-around",
                }}
              >
                {currCardElems}
              </Box>

              {this.state.hasGameBegin === true && (
                <Box
                  sx={{
                    display: "flex",

                    justifyContent: "space-evenly",
                  }}
                >
                  <p>{this.state.player1Score}</p>
                  <p>current scores</p>
                  <p> {this.state.player2Score}</p>
                </Box>
              )}

              {this.state.cardDeck.length > 0 && dealCardsButton}
              <p>{this.state.hasGameBegin && winnerPerRound}</p>
              <p>{this.state.cardDeck.length === 0 && winnerPerMatch}</p>
              <Stack
                direction="row"
                spacing={4}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {this.state.cardDeck.length === 0 && continueGameButton}
                {this.state.cardDeck.length === 0 && exitGameButton}
              </Stack>
            </Typography>
          </Box>
        </header>
      </div>
    );
  }
}

export default App;

// order of winning: spades, hearts, diamond, club
