import React from "react";
import "./App.css";
import { makeShuffledDeck } from "./utils.js";
import Player from "./Components/Player";
import Results from "./Components/Results";
import Button from "./Components/Button";

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

  resetGame = () => {
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

  render() {
    const players = this.state.players.map((player, index) =>
      player.cards.length === 0 ? (
        <Player name={player.name} cards={player.cards} key={index} />
      ) : (
        <Player name={player.name} cards={player.cards} key={index} />
      )
    );

    return (
      <div className="App">
        <header className="App-header">
          <h3>High Card 🚀</h3>
          {this.state.gameState === "Intro" ? (
            <h3>👋 Please click Deal to start playing!</h3>
          ) : (
            <div>
              {players}
              <br />
              <Results
                winner={this.state.winner}
                players={this.state.players}
                cardDeck={this.state.cardDeck}
              />
            </div>
          )}
          <br />
          {this.state.gameState === "End" ? (
            <Button text="Restart Game" action={this.resetGame} />
          ) : (
            <Button text="Deal" action={this.dealCards} />
          )}
        </header>
      </div>
    );
  }
}

export default App;
