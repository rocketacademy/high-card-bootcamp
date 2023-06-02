import React from "react";
import "./App.css";
import { makeShuffledDeck } from "./utils";
import Table from "react-bootstrap/Table";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import PlayingCard from "./components/PlayingCard";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      cardDeck: makeShuffledDeck(),
      currCards: [],
      roundWinner: null,
      numRoundsPlayerOneWins: 0,
      numRoundsPlayerTwoWins: 0,
      currentRound: 0,
      numRoundsLeft: null,
      totalTimesPlayerOneWon: 0,
      totalTimesPlayerTwoWon: 0,
      isGameStart: false,
      gameCounter: 0,
    };
  }

  dealCards = () => {
    // dealt 2 cards to the players
    const newCurrCards = this.state.cardDeck.slice(-2);
    // update the card deck
    this.setState({
      cardDeck: this.state.cardDeck.slice(0, -2),
      currCards: newCurrCards,
      // display the number of game rounds left
      numRoundsLeft: (this.state.cardDeck.length - 2) / 2,
      // display the current game round
      currentRound: this.state.currentRound + 1,
      isGameStart: true,
    });
    this.compareCards(newCurrCards);
  };

  compareCards = (newCurrCards) => {
    const playerOneCard = newCurrCards[0];
    const playerTwoCard = newCurrCards[1];
    // console.log the 2 cards that were dealt
    console.log(`Player 1: ${playerOneCard.rank} of ${playerOneCard.suit}`);
    console.log(`Player 2: ${playerTwoCard.rank} of ${playerTwoCard.suit}`);

    const suitsRank = {
      Clubs: 1,
      Diamonds: 2,
      Hearts: 3,
      Spades: 4,
    };

    const playerOneSuitValue = suitsRank[playerOneCard.suit];
    const playerTwoSuitValue = suitsRank[playerTwoCard.suit];

    //compare cards by rank & suit
    let winnerOfRound = null;
    if (playerOneCard.rank > playerTwoCard.rank) {
      winnerOfRound = 1;
    } else if (playerOneCard.rank < playerTwoCard.rank) {
      winnerOfRound = 2;
    } else {
      if (playerOneSuitValue > playerTwoSuitValue) {
        winnerOfRound = 1;
      } else if (playerOneSuitValue < playerTwoSuitValue) {
        winnerOfRound = 2;
      } else {
        winnerOfRound = null;
      }
    }
    this.setState({
      roundWinner:
        winnerOfRound === 1
          ? "- Player 1 won this round -"
          : "- Player 2 won this round -",
      // number of rounds player 1 wins
      numRoundsPlayerOneWins:
        winnerOfRound === 1
          ? this.state.numRoundsPlayerOneWins + 1
          : this.state.numRoundsPlayerOneWins,
      // number of rounds player 2 wins
      numRoundsPlayerTwoWins:
        winnerOfRound === 2
          ? this.state.numRoundsPlayerTwoWins + 1
          : this.state.numRoundsPlayerTwoWins,
    });
  };

  resetGame = () => {
    let winnerOfGame = null;
    if (this.state.numRoundsLeft === 0) {
      if (
        this.state.numRoundsPlayerOneWins > this.state.numRoundsPlayerTwoWins
      ) {
        winnerOfGame = 1;
      } else if (
        this.state.numRoundsPlayerOneWins < this.state.numRoundsPlayerTwoWins
      ) {
        winnerOfGame = 2;
      }
    }

    this.setState({
      cardDeck: makeShuffledDeck(),
      currCards: [],
      numRoundsPlayerOneWins: 0,
      numRoundsPlayerTwoWins: 0,
      roundWinner: null,
      currentRound: 0,
      numRoundsLeft: (this.state.cardDeck.length - 2) / 2,
      isGameStart: false,
      gameCounter: this.resetGame
        ? this.state.gameCounter + 1
        : this.state.gameCounter,
      totalTimesPlayerOneWon:
        winnerOfGame === 1
          ? this.state.totalTimesPlayerOneWon + 1
          : this.state.totalTimesPlayerOneWon,
      totalTimesPlayerTwoWon:
        winnerOfGame === 2
          ? this.state.totalTimesPlayerTwoWon + 1
          : this.state.totalTimesPlayerTwoWon,
    });
  };

  render() {
    const currCardElems = this.state.currCards.map(({ name, suit }, index) => (
      // Give each list element a unique key
      // <div key={`${name}${suit}`}>
      <Col>
        <Row key={`${name}${suit}`}>
          <div>
            <PlayingCard name={name} suit={suit} />
          </div>
        </Row>
        <div>
          Player {index + 1}: {name} of {suit}
        </div>
      </Col>
    ));

    // display the number of rounds remaining in our browser
    const roundsLeft = (
      <div>
        <p>
          Current Game Round: {this.state.currentRound} <br /> Rounds Remaining:{" "}
          {this.state.numRoundsLeft}
        </p>
      </div>
    );

    // display the scoreboard in our browser
    const scoreboard = (
      <div>
        <Table striped bordered variant="dark">
          <thead>
            <tr>
              <th colSpan={2}>Scoreboard</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Player 1</td>
              <td>
                won <strong>{this.state.numRoundsPlayerOneWins}</strong> rounds
              </td>
            </tr>
            <tr>
              <td>Player 2</td>
              <td>
                won <strong>{this.state.numRoundsPlayerTwoWins}</strong> rounds
              </td>
            </tr>
          </tbody>
        </Table>
      </div>
    );

    // determine the game winner after 26 rounds (deck clears)
    let gameWinner = null;

    if (this.state.numRoundsPlayerOneWins > this.state.numRoundsPlayerTwoWins) {
      gameWinner = 1;
    } else if (
      this.state.numRoundsPlayerOneWins < this.state.numRoundsPlayerTwoWins
    ) {
      gameWinner = 2;
    }

    // display final result - which player wins or if it's a draw
    const winMessagePerGame = gameWinner
      ? ` ✨ The winner is Player ${gameWinner}!!! ✨ `
      : `🫢 It's a draw. Play again!!! 🫢`;

    // score tracker across all games
    const finalWinnerMessage = (
      <div>
        Player 1: {this.state.totalTimesPlayerOneWon}/{this.state.gameCounter} |
        Player 2: {this.state.totalTimesPlayerTwoWon}/{this.state.gameCounter}
      </div>
    );

    return (
      <div className="App">
        <header className="App-header">
          <h3>H I G H - C A R D 🚀</h3>
          <br />
          <br />
          <Container>
            <Row>
              {/* first row, left */}
              <Col>{currCardElems}</Col>
              <Col>{this.state.isGameStart && scoreboard}</Col>
            </Row>
            <Row>
              <Row>
                <div>
                  <br />
                </div>
              </Row>
              <Col>
                <strong>
                  {this.state.isGameStart && this.state.roundWinner}
                </strong>
              </Col>
              <Col>{this.state.isGameStart && roundsLeft}</Col>
            </Row>
            <Row>
              <Col>
                <strong>
                  {this.state.numRoundsLeft === 0 && winMessagePerGame}
                </strong>
              </Col>
            </Row>
          </Container>
          <br />
          {this.state.currentRound === 26 ? (
            <Button variant="danger" onClick={this.resetGame}>
              New Game
            </Button>
          ) : (
            <Button variant="danger" onClick={this.dealCards}>
              Deal
            </Button>
          )}
          <br />
          {finalWinnerMessage}
        </header>
      </div>
    );
  }
}

export default App;
