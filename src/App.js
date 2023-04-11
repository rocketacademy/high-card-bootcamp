import React from "react";
import "./App.css";
import { makeShuffledDeck } from "./utils.js";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { requirePropFactory } from "@mui/material";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

class App extends React.Component {
  constructor(props) {
    // Always call super with props in constructor to initialise parent class
    super(props);
    this.state = {
      // Set default value of card deck to new shuffled deck
      cardDeck: makeShuffledDeck(),
      // currCards holds the cards from the current round
      currCards: [],
      dealt: false,
      playerOneScore: 0,
      playerTwoScore: 0,
      oneGameScore: 0,
      twoGameScore: 0,
    };
  }

  dealCards = () => {
    const dealtCards = this.state.cardDeck.slice(-2);
    this.setState((state) => ({
      cardDeck: state.cardDeck.slice(0, -2),
      // Deal last 2 cards to currCards
      currCards: dealtCards,
      dealt: true,
      playerOneScore:
        dealtCards[0].rank > dealtCards[1].rank
          ? state.playerOneScore + 1
          : state.playerOneScore,
      playerTwoScore:
        dealtCards[0].rank < dealtCards[1].rank
          ? state.playerTwoScore + 1
          : state.playerTwoScore,
    }));
  };

  restart = () => {
    const prevPlayerOneScore = this.state.playerOneScore;
    const prevPlayerTwoScore = this.state.playerTwoScore;

    this.setState((state) => ({
      // Set default value of card deck to new shuffled deck
      cardDeck: makeShuffledDeck(),
      // currCards holds the cards from the current round
      currCards: [],
      dealt: false,
      playerOneScore: 0,
      playerTwoScore: 0,
      oneGameScore:
        prevPlayerOneScore > prevPlayerTwoScore
          ? state.oneGameScore + 1
          : state.oneGameScore,
      twoGameScore:
        prevPlayerOneScore < prevPlayerTwoScore
          ? state.twoGameScore + 1
          : state.twoGameScore,
    }));
  };

  componentDidUpdate() {
    /*
    this.setState((state) => ({
      oneGameScore:
        state.cardDeck.length === 0 &&
        state.playerOneScore > state.playerTwoScore
          ? state.oneGameScore + 1
          : state.oneGameScore,
      twoGameScore:
        state.cardDeck.length === 0 &&
        state.playerOneScore < state.playerTwoScore
          ? state.twoGameScore + 1
          : state.twoGameScore,
    }));
    */
  }

  render() {
    const currCardElems = this.state.currCards.map(({ name, suit }, index) => (
      // Give each list element a unique key
      <div className="imgContainer" key={`${name}${suit}`}>
        <img
          src={require(`./PNG-cards-1.3/${name}_of_${suit}.png`)}
          alt={`${name} of ${suit}`}
          style={{ maxWidth: "50%" }}
        />
      </div>
    ));

    let whoWinsMessage = <h4> </h4>;
    if (this.state.dealt === true) {
      const player1Card = this.state.currCards[0].rank;
      const player2Card = this.state.currCards[1].rank;

      if (player1Card === player2Card) {
        whoWinsMessage = <h4>Its a tie</h4>;
      } else if (player1Card > player2Card) {
        whoWinsMessage = <h4>Player 1 wins</h4>;
      } else {
        whoWinsMessage = <h4>Player 2 wins</h4>;
      }
    }

    const scoreDisplay = (
      <Grid container spacing={1}>
        <Grid item xs={6}>
          <Paper>Player One Score is {this.state.playerOneScore}</Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper>Player Two Score is {this.state.playerTwoScore}</Paper>
        </Grid>
      </Grid>
    );

    const gameFinisher =
      this.state.playerOneScore > this.state.playerTwoScore ? (
        <p>Player 1 has won the game!</p>
      ) : (
        <p>Player 2 has won the game !</p>
      );

    return (
      <div className="App">
        <header className="App-header">
          <Container maxWidth="lg">
            <Box
              component="span"
              sx={{
                overflowWrap: "anywhere",
                position: "absolute",
                left: 80,
                top: 20,
                backgroundColor: "primary.main",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: 100,
                height: 100,
              }}
            >
              Player 1 {this.state.oneGameScore}
            </Box>
            <Box
              component="span"
              sx={{
                overflowWrap: "anywhere",
                position: "absolute",
                right: 80,
                top: 20,
                backgroundColor: "primary.main",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: 100,
                height: 100,
              }}
            >
              Player 2 {this.state.twoGameScore}
            </Box>
            <br/>
            <h3>High Card 🚀</h3>
            {currCardElems}
            {scoreDisplay}
            {this.state.dealt === true && (
              <Grid container spacing={1}>
                <Grid item xs={12}>
                  <Paper>
                    {this.state.cardDeck.length !== 0 && whoWinsMessage}
                    {this.state.cardDeck.length === 0 && gameFinisher}
                  </Paper>
                </Grid>
              </Grid>
            )}
            <br />
            <div>
              {this.state.cardDeck.length === 0 ? (
                <Button variant="contained" onClick={this.restart}>
                  Restart
                </Button>
              ) : (
                <Button variant="contained" onClick={this.dealCards}>
                  Deal
                </Button>
              )}
            </div>
          </Container>
        </header>
      </div>
    );
  }
}

export default App;
