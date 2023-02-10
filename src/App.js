import React from "react";
import "./App.css";
import { makeShuffledDeck } from "./utils.js";
import { Player } from "./Components/Player";
import PlayingCard from "./Components/PlayingCard";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.freshState({ "Player 1": 0, "Player 2": 0 });
  }

  freshState = (gameScores) => {
    return {
      cardDeck: makeShuffledDeck(),
      currCards: [],
      currWinner: "",
      roundsLeft: 26,
      roundScores: {
        "Player 1": 0,
        "Player 2": 0,
      },
      gameScores: gameScores,
    };
  };

  playRound = () => {
    if (this.state.roundsLeft > 0) {
      this.dealCards(() => this.updateGameState(this.endGame));
    }
  };

  endGame = () => {
    if (this.isGameOver) {
      this.setState({
        gameScores: {
          ...this.state.gameScores,
          [this.gameWinner]: this.state.gameScores[this.gameWinner] + 1,
        },
      });
    }
  };

  // Second argument to setState is a callback function that is invoked after the state is updated
  dealCards = (callback) => {
    this.setState(
      (state) => ({
        // Remove last 2 cards from cardDeck
        cardDeck: state.cardDeck.slice(0, -2),
        // Deal last 2 cards to currCards
        currCards: state.cardDeck.slice(-2),
      }),
      callback
    );
  };

  updateGameState = (callback) => {
    const firstCard = this.state.currCards[0];
    const secondCard = this.state.currCards[1];
    let newState = {};
    if (firstCard.rank > secondCard.rank) {
      newState = {
        currWinner: "Player 1",
        roundScores: {
          ...this.state.roundScores,
          "Player 1": this.state.roundScores["Player 1"] + 1,
        },
      };
    } else if (secondCard.rank > firstCard.rank) {
      newState = {
        currWinner: "Player 2",
        roundScores: {
          ...this.state.roundScores,
          "Player 2": this.state.roundScores["Player 2"] + 1,
        },
      };
    } else {
      newState = { currWinner: "Nobody" };
    }
    this.setState(
      { ...newState, roundsLeft: this.state.roundsLeft - 1 },
      callback
    );
  };

  get gameWinner() {
    const scores = this.state.roundScores;
    if (scores["Player 1"] === scores["Player 2"]) {
      return "Nobody";
    } else {
      const gameWinner = Object.keys(scores).reduce((a, b) =>
        scores[a] > scores[b] ? a : b
      );
      return gameWinner;
    }
  }

  get isGameStarted() {
    return this.state.roundsLeft < 26;
  }

  get isGameOver() {
    return this.state.roundsLeft === 0;
  }

  restart = () => {
    this.setState(this.freshState(this.state.gameScores));
  };

  render() {
    const currCardElems = this.state.currCards.map(({ name, suit }) => (
      // Give each list element a unique key
      <Col>
        <PlayingCard name={name} suit={suit} />
      </Col>
    ));

    return (
      <div className="App">
        <header className="App-header">
          <h3 id="app-name">🐈‍⬛ Kitty High Card 🐈</h3>
          <br />
          {!this.isGameOver && (
            <Button variant="light" onClick={this.playRound}>
              Deal
            </Button>
          )}
          <br />
          <Container>
            <Row>{currCardElems}</Row>
            <Row>
              <Player
                id="1"
                roundScore={this.state.roundScores["Player 1"]}
                gameScore={this.state.gameScores["Player 1"]}
              />
              <Player
                id="2"
                roundScore={this.state.roundScores["Player 2"]}
                gameScore={this.state.gameScores["Player 2"]}
              />
            </Row>
          </Container>
          <br />
          {this.isGameStarted && (
            <h4>{this.state.currWinner} won this round!</h4>
          )}
          <p>{this.state.roundsLeft} rounds left</p>
          <br />
          <div>
            {this.isGameOver && (
              <div id="game-over">
                <h4>{this.gameWinner} won the game!</h4>
                <Button variant="dark" onClick={this.restart}>
                  Another game
                </Button>
              </div>
            )}
          </div>
        </header>
      </div>
    );
  }
}

export default App;
