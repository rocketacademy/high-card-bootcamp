import React from "react";
import "./App.css";
import { makeShuffledDeck } from "./utils.js";
import PlayersInput from "./Components/PlayersInput";
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
      players: [],
      gameState: "Input",
      // winner: null,
      numOfGames: 1,
      showGameRule: false,
      numOfPlayers: 2,
    };
  }

  updatePlayers = (num) => {
    num = Number(num);

    const newPlayers = this.generatePlayers(num);

    this.setState((state) => ({
      players: [...state.players, ...newPlayers],
      gameState: "Intro",
      numOfPlayers: num,
    }));
  };

  generatePlayers = (num) => {
    const newPlayers = [];

    for (let i = 1; i <= num; i += 1) {
      newPlayers.push({
        name: `Player ${i}`,
        cards: [],
        score: [],
        prevScore: [],
      });
    }

    return newPlayers;
  };

  dealCards = () => {
    if (this.state.cardDeck.length === 0) {
      return;
    }

    const newCards = [];
    const newCardsRank = [];

    for (let i = 0; i < this.state.numOfPlayers; i += 1) {
      if (i === 0) {
        newCards.push(this.state.cardDeck.slice(-1));
        newCardsRank.push(this.state.cardDeck.slice(-1)[0].rank);
      } else {
        newCards.push(this.state.cardDeck.slice(-(i + 1), -i));
        newCardsRank.push(this.state.cardDeck.slice(-(i + 1), -i)[0].rank);
      }
    }

    this.setState((state) => ({
      // Remove last 2 cards from cardDeck
      cardDeck: state.cardDeck.slice(0, -state.numOfPlayers),
      // Deal 1 card to each player from cardDeck
      players: state.players.map((player, index) => {
        return {
          name: player.name,
          cards: newCards[index],
          score: player.score,
          prevScore: player.prevScore,
        };
      }),
      gameState: "Playing",
    }));

    this.addScore(this.checkWinner(newCardsRank));
  };

  checkWinner = (scoresArr) => {
    let maxScore = 0;
    const playersWithMaxScore = [];

    //Loop through final score array to get the max score
    scoresArr.forEach((score) => {
      if (score > maxScore) {
        maxScore = score;
      }
    });

    //Check if there is more than 1 max score
    scoresArr.forEach((score, index) => {
      if (score === maxScore) {
        playersWithMaxScore.push(index + 1);
      }
    });

    //Check if there are only 2 players and both players scored max score, it is a draw.
    if (this.state.players.length === playersWithMaxScore.length) {
      return [];
    }

    return playersWithMaxScore;
  };

  addScore = (winnersArray) => {
    if (winnersArray.length === 0) {
      this.setState((state) => ({
        players: state.players.map((player, playerIndex) => {
          return {
            name: player.name,
            cards: player.cards,
            score: [...player.score, 0],
            prevScore: player.prevScore,
          };
        }),
        gameState:
          state.cardDeck.length < state.players.length
            ? "End"
            : state.gameState,
      }));
    } else {
      const winnersIndex = winnersArray.map((winner) => winner - 1);

      this.setState((state) => ({
        players: state.players.map((player, playerIndex) => {
          if (winnersIndex.includes(playerIndex)) {
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
        gameState:
          state.cardDeck.length < state.players.length
            ? "End"
            : state.gameState,
      }));
    }
  };

  newGame = () => {
    this.setState((state) => ({
      cardDeck: makeShuffledDeck(),
      players: state.players.map((player) => {
        return {
          name: player.name,
          cards: [],
          score: [],
          prevScore: [...player.prevScore, player.score],
        };
      }),
      gameState: "Intro",
      numOfGames: (state.numOfGames += 1),
    }));
  };

  resetGame = () => {
    this.setState({
      cardDeck: makeShuffledDeck(),
      players: [],
      gameState: "Input",
      numOfGames: 1,
      numOfPlayers: 2,
    });
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
          {this.state.gameState === "Input" && (
            <PlayersInput onClick={this.updatePlayers} />
          )}
          {this.state.gameState === "Intro" && (
            <div>
              <Typography variant="h6" mb={1.5}>
                You have entered {this.state.numOfPlayers} players. <br />
                Please click Deal to start playing!
              </Typography>
              {button}
            </div>
          )}
          {this.state.gameState === "Playing" ||
          this.state.gameState === "End" ? (
            <Container maxWidth="lg">
              <Grid container justifyContent="center" mt={9} mb={4}>
                <Grid item xs={11} sm={5} md={3} lg={3}>
                  <GameInfo
                    numOfGames={this.state.numOfGames}
                    cardDeck={this.state.cardDeck}
                    numOfPlayers={this.state.numOfPlayers}
                  />
                </Grid>
                <Grid container mt={5} mb={5} justifyContent="center">
                  {players}
                </Grid>
                <Grid item xs={12} mb={5}>
                  <Instructions
                    checkWinner={this.checkWinner}
                    players={this.state.players}
                    cardDeck={this.state.cardDeck}
                  />
                </Grid>
                <Grid container justifyContent="center" mb={5}>
                  {button}
                </Grid>
                <Grid container justifyContent="center">
                  <Grid item xs={12} sm={this.state.numOfPlayers + 2}>
                    <ResultsTable
                      players={this.state.players}
                      numOfGames={this.state.numOfGames}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Container>
          ) : null}
        </Container>
      </div>
    );
  }
}

export default App;
