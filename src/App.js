import React from "react";
import "./App.css";
import { makeShuffledDeck } from "./utils.js";

// import bootstrap elements
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

class App extends React.Component {
  constructor(props) {
    // Always call super with props in constructor to initialise parent class
    super(props);
    this.state = {
      // Set default value of card deck to new shuffled deck
      cardDeck: makeShuffledDeck(),
      // currCards holds the cards from the current round
      currCards: [],
      roundWinner: null,
      player1Score: 0,
      player2Score: 0,
      playersGameScore: [],
      gameCount: 0,
      gameNum: 0,
    };
  }

  dealCards = () => {
    // last 2 cards to currCards
    const currCards = this.state.cardDeck.slice(-2);

    // Logic to determine round winner
    let roundWinner = null;
    if (currCards[0].rank > currCards[1].rank) {
      roundWinner = 1;
    } else if (currCards[1].rank > currCards[0].rank) {
      roundWinner = 2;
    }

    // Reassign states based on game logic result
    this.setState({
      ifGameActive: true,
      // remove last 2 cards from cardDeck
      cardDeck: this.state.cardDeck.slice(0, -2),
      // assign last 2 cards to currCards
      currCards: currCards,
      roundWinner: roundWinner,
      // increment score for winner
      player1Score:
        roundWinner === 1
          ? this.state.player1Score + 1
          : this.state.player1Score,
      player2Score:
        roundWinner === 2
          ? this.state.player2Score + 1
          : this.state.player2Score,
    });
  };

  // componentDidUpdate() {
  //   setTimeout(() => {
  //     console.log(JSON.stringify(this.state.currCards));
  //   }, 1000);
  // }

  resetRound = () => {
    let gameNum = this.state.gameCount + 1;
    const currGameScore = [
      {
        gameNumber: gameNum,
        p1Score: this.state.player1Score,
        p2Score: this.state.player2Score,
      },
    ];

    // reset to base
    this.setState({
      ifGameActive: false,
      cardDeck: makeShuffledDeck(),
      currCards: [],
      roundWinner: null,
      // store player's current game score
      playersGameScore: [...this.state.playersGameScore, ...currGameScore],
      player1Score: 0,
      player2Score: 0,
      gameCount: gameNum,
    });
  };

  render() {
    const currCardElems = this.state.currCards.map(({ name, suit }) => (
      <Col>
        {name} of {suit}
      </Col>
    ));

    // generate all game scores in a table
    const playersGameScoreTracker = this.state.playersGameScore.map(
      ({ gameNumber, p1Score, p2Score }) => (
        <Row
          style={{
            backgroundColor: "blue",
          }}
        >
          <Col>Game {gameNumber}</Col>
          <Col>Player 1: {p1Score}</Col>
          <Col>Player 2: {p2Score}</Col>
        </Row>
      )
    );

    // Round outcome message
    let roundOutcomeMessage = "";
    if (this.state.roundWinner === 1) {
      roundOutcomeMessage = "Round Result: Player 1 Wins!!";
    } else if (this.state.roundWinner === 2) {
      roundOutcomeMessage = "Round Result: Player 2 Wins!!";
    } else {
      roundOutcomeMessage = "Round Result: Its a draw!!";
    }

    // Game outcome message
    let gameOutcomeMessage = "";
    if (this.state.player1Score > this.state.player2Score) {
      gameOutcomeMessage = "Game Result: Player 1 Wins!!";
    } else if (this.state.player2Score > this.state.player1Score) {
      gameOutcomeMessage = "Game Result: Player 2 Wins!!";
    } else {
      gameOutcomeMessage = "Game Result: Its a draw!!";
    }

    // Game button
    let gameButton = this.state.cardDeck.length !== 0 ? "Deal" : "Reset";

    return (
      <div className="App">
        <header className="App-header">
          <h3>High Card 🚀</h3>
          <br />

          {/* display players's cards */}
          <Container
            style={{
              width: 500,
            }}
          >
            <Row>
              <Col>Player1</Col>
              <Col xs={1}>VS</Col>
              <Col>Player2</Col>
            </Row>
            <Row
              style={{
                backgroundColor: "purple",
              }}
            >
              {currCardElems}
            </Row>
          </Container>
          <br />

          {/* button to deal players's cards */}
          <Button
            variant={this.state.cardDeck.length !== 0 ? "primary" : "danger"}
            // Allow user to reset game when there are no more cards left in the deck
            onClick={
              this.state.cardDeck.length !== 0
                ? this.dealCards
                : this.resetRound
            }
          >
            {gameButton}
          </Button>
          <br />
          {/* Hide outcome message when game is not active */}
          {this.state.ifGameActive && (
            <h3>
              {this.state.cardDeck.length !== 0
                ? roundOutcomeMessage
                : gameOutcomeMessage}
              <br />
              <br />
              Rounds left: {this.state.cardDeck.length / 2}
            </h3>
          )}

          {/* Display players' scurrent score */}
          {this.state.ifGameActive && (
            <h3>
              <br />
              <Container
                style={{
                  width: 500,
                }}
              >
                <Row>Current Game Score</Row>
                <Row
                  style={{
                    backgroundColor: "green",
                  }}
                >
                  <Col>Game {this.state.gameCount + 1}</Col>
                  <Col>Player 1: {this.state.player1Score}</Col>
                  <Col>Player 2: {this.state.player2Score}</Col>
                </Row>
              </Container>
              <br />

              {/* display score of all past games*/}
              {this.state.gameCount >= 1 && (
                <Container>
                  <Row>Pass Game Score</Row>
                  {playersGameScoreTracker}
                </Container>
              )}
            </h3>
          )}
        </header>
      </div>
    );
  }
}

export default App;
