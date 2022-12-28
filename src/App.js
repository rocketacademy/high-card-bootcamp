import React from "react";
import "./App.css";
import { makeShuffledDeck } from "./utils.js";
import Player from "./Components/Player";
import Instructions from "./Components/Instructions";
import ButtonCustom from "./Components/Button";
import Rules from "./Components/Rules";
import GameInfo from "./Components/GameInfo";
import ResultsTable from "./Components/ResultsTable";
import {
  CssBaseline,
  Container,
  Grid,
  AppBar,
  Typography,
  Toolbar,
} from "@mui/material";

class App extends React.Component {
  constructor(props) {
    // Always call super with props in constructor to initialise parent class
    super(props);
    this.state = {
      // Set default value of card deck to new shuffled deck
      cardDeck: makeShuffledDeck(),
      // currCards holds the cards from the current round
      players: [
        { name: "Player 1", cards: [], score: [], prevScore: [] },
        { name: "Player 2", cards: [], score: [], prevScore: [] },
      ],
      gameState: "Intro",
      winner: null,
      numOfGames: 1,
      showGameRule: false,
    };
  }

  dealCards = () => {
    if (this.state.cardDeck.length === 0) {
      return;
    }

    const newCardOne = this.state.cardDeck.slice(-1);
    const newCardTwo = this.state.cardDeck.slice(-2, -1);

    this.setState((state) => ({
      // Remove last 2 cards from cardDeck
      cardDeck: state.cardDeck.slice(0, -2),
      // Deal 1 card to each player from cardDeck
      players: [
        {
          name: state.players[0].name,
          cards: newCardOne,
          score: state.players[0].score,
          prevScore: state.players[0].prevScore,
        },
        {
          name: state.players[1].name,
          cards: newCardTwo,
          score: state.players[1].score,
          prevScore: state.players[1].prevScore,
        },
      ],
      gameState: "Playing",
    }));
    this.addScore(this.calWinner(...newCardOne, ...newCardTwo));
  };

  calWinner = (cardOne, cardTwo) => {
    let result = false;

    if (cardOne.rank > cardTwo.rank) {
      result = this.state.players[0].name;
    } else if (cardOne.rank < cardTwo.rank) {
      result = this.state.players[1].name;
    }

    return result;
  };

  addScore = (winnerName) => {
    this.setState((state) => ({
      players: state.players.map((player) => {
        if (winnerName === player.name) {
          return {
            name: player.name,
            cards: player.cards,
            score: [...player.score, 1],
            prevScore: player.prevScore,
          };
        } else {
          return {
            name: player.name,
            cards: player.cards,
            score: [...player.score, 0],
            prevScore: player.prevScore,
          };
        }
      }),
      winner: winnerName ? winnerName : null,
      gameState: state.cardDeck.length <= 0 ? "End" : state.gameState,
    }));
  };

  newGame = () => {
    this.setState((state) => ({
      cardDeck: makeShuffledDeck(),
      players: [
        {
          name: state.players[0].name,
          cards: [],
          score: [],
          prevScore: [...state.players[0].prevScore, state.players[0].score],
        },
        {
          name: state.players[1].name,
          cards: [],
          score: [],
          prevScore: [...state.players[1].prevScore, state.players[1].score],
        },
      ],
      gameState: "Intro",
      winner: null,
      numOfGames: (state.numOfGames += 1),
    }));
  };

  resetGame = () => {
    this.setState((state) => ({
      cardDeck: makeShuffledDeck(),
      players: [
        {
          name: state.players[0].name,
          cards: [],
          score: [],
          prevScore: [],
        },
        {
          name: state.players[1].name,
          cards: [],
          score: [],
          prevScore: [],
        },
      ],
      gameState: "Intro",
      winner: null,
      numOfGames: 1,
    }));
  };

  showRules = () => {
    this.setState((state) => ({
      showGameRule: !state.showGameRule,
    }));
  };

  render() {
    const players = this.state.players.map((player, index) =>
      player.cards.length === 0 ? (
        <Player name={player.name} cards={player.cards[0]} key={index} />
      ) : (
        <Player name={player.name} cards={player.cards[0]} key={index} />
      )
    );

    const button =
      this.state.gameState === "End" ? (
        <ButtonCustom text="New Game" onClick={this.newGame} color="warning" />
      ) : (
        <ButtonCustom text="Deal" onClick={this.dealCards} color="warning" />
      );

    return (
      <div className="App">
        <CssBaseline />

        {/* <header className="App-header"> */}
        <AppBar
          position="fixed"
          style={{
            backgroundColor: "#00695F",
            boxShadow: "0px 0px 0px 0px",
          }}
        >
          <Container maxWidth="lg">
            <Toolbar sx={{ justifyContent: "space-between" }}>
              <Typography variant="h5">High Card</Typography>
              <div className="flex-gap">
                <ButtonCustom
                  text="Restart Game"
                  onClick={this.resetGame}
                  color="warning"
                />
                <ButtonCustom
                  text="Rules"
                  onClick={this.showRules}
                  color="primary"
                />
              </div>
            </Toolbar>
          </Container>
        </AppBar>
        <Container maxWidth="lg">
          <Rules open={this.state.showGameRule} onClick={this.showRules} />
          {this.state.gameState === "Intro" ? (
            <div>
              <h3>👋 Please click Deal to start playing!</h3>
              {button}
            </div>
          ) : (
            <Container maxWidth="lg">
              <Grid container justifyContent="center">
                <Grid item xs={3}>
                  <GameInfo
                    numOfGames={this.state.numOfGames}
                    cardDeck={this.state.cardDeck}
                  />
                </Grid>
                <Grid container mt={5} mb={10} justifyContent="center">
                  {players}
                </Grid>
                <Grid item xs={12} mb={5}>
                  <Instructions
                    winner={this.state.winner}
                    players={this.state.players}
                    cardDeck={this.state.cardDeck}
                  />
                </Grid>
                <Grid container justifyContent="center" mb={5}>
                  {button}
                </Grid>
                <Grid container justifyContent="center">
                  <Grid item xs={6}>
                    <ResultsTable
                      players={this.state.players}
                      numOfGames={this.state.numOfGames}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Container>
          )}
          {/* </header> */}
        </Container>
      </div>
    );
  }
}

export default App;
