import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import React from "react";
import "./App.css";
import { makeShuffledDeck } from "./utils.js";
import PlayerCard from "./PlayerCard.js";

class App extends React.Component {
  constructor(props) {
    // Always call super with props in constructor to initialise parent class
    super(props);
    this.state = {
      // Set default value of card deck to new shuffled deck
      cardDeck: makeShuffledDeck(),
      // currCards holds the cards from the current round
      round: 0,
      player1: { winGame: 0, score: 0, result: "", currCard: {} },
      player2: { winGame: 0, score: 0, result: "", currCard: {} },
      restart: "",
      dealButton: <button onClick={this.changeResult}>Deal</button>,
    };
  }

  dealCards = () => {
    // this.state.cardDeck.pop() modifies this.state.cardDeck array
    const newCurrCard1 = this.state.cardDeck.pop();
    const newCurrCard2 = this.state.cardDeck.pop();
    this.state.player1.currCard = newCurrCard1;
    this.state.player2.currCard = newCurrCard2;
  };

  compareCards = () => {
    if (this.state.player1.currCard.rank === this.state.player2.currCard.rank) {
      this.state.player1.result = "draw";
      this.state.player2.result = "draw";
    } else if (
      this.state.player1.currCard.rank > this.state.player2.currCard.rank
    ) {
      this.state.player1.result = "win";
      this.state.player1.score += 1;
      this.state.player2.result = "loss";
    } else {
      this.state.player2.result = "win";
      this.state.player2.score += 1;
      this.state.player1.result = "loss";
    }
  };

  changeResult = () => {
    this.dealCards();
    this.compareCards();
    this.setState({
      round: this.state.round + 1,
      player1: this.state.player1,
      player2: this.state.player2,
    });
    if (this.state.cardDeck.length === 0) {
      this.genRestartButton();
    }
  };

  exeRestart = () => {
    console.log(this.state.player1.winGame);
    this.setState({
      cardDeck: makeShuffledDeck(),
      round: 0,
      player1: {
        winGame: this.state.player1.winGame,
        score: 0,
        result: "",
        currCard: {},
      },
      player2: {
        winGame: this.state.player2.winGame,
        score: 0,
        result: "",
        currCard: {},
      },
      restart: "",
      dealButton: <button onClick={this.changeResult}>Deal</button>,
    });
  };

  genRestartButton = () => {
    let winner = "Both player";
    if (this.state.player1.score > this.state.player2.score) {
      winner = "Player 1";
      this.state.player1.winGame += 1;
      this.setState({ player1: this.state.player1 });
    } else if (this.state.player1.score < this.state.player2.score) {
      winner = "Player 2";
      this.state.player2.winGame += 1;
      this.setState({ player2: this.state.player2 });
    }
    const restartElem = (
      <div>
        <p>{winner} is the final winner! Do you want to play again?</p>
        <button onClick={this.exeRestart}>Restart</button>
        <button onClick={window.close}>Quit</button>
      </div>
    );

    this.setState({ restart: restartElem, dealButton: "" });
  };

  render() {
    // You can write JavaScript here, just don't try and set your state
    // You can access your current components state here, as indicated below
    const currCardElems =
      "name" in this.state.player1.currCard ? (
        <Container className="player-table">
          <Row className="player-table">
            <Col className="player-table">Player 1</Col>
            <Col className="player-table">
              <PlayerCard
                name={this.state.player1.currCard.name}
                suit={this.state.player1.currCard.suit}
              />
            </Col>
            <Col className="player-table">{this.state.player1.result}</Col>
            <Col className="player-table">Score:{this.state.player1.score}</Col>
          </Row>
          <Row className="player-table">
            <Col className="player-table">Player 2</Col>
            <Col className="player-table">
              <PlayerCard
                name={this.state.player2.currCard.name}
                suit={this.state.player2.currCard.suit}
              />
            </Col>
            <Col className="player-table">{this.state.player2.result}</Col>
            <Col className="player-table">Score:{this.state.player2.score}</Col>
          </Row>
        </Container>
      ) : (
        ""
      );

    const totalWinElem =
      (this.state.player1.winGame === 0 && this.state.player2.winGame) === 0 ? (
        ""
      ) : (
        <Container className="leaderboard">
          <Row className="player-table">
            <center>LeaderBoard</center>
          </Row>
          <Row className="player-table">
            <Col>Player 1</Col>
            <Col>{this.state.player1.winGame}</Col>
          </Row>
          <Row className="player-table">
            <Col>Player 2</Col>
            <Col>{this.state.player2.winGame}</Col>
          </Row>
        </Container>
      );

    return (
      <div className="App">
        <header className="App-header">
          <h3>High Card 🚀</h3>
          {totalWinElem}
          <p>{this.state.round === 0 ? "" : "Round:" + this.state.round}</p>
          {currCardElems}
          <br />
          {this.state.dealButton}
          {this.state.restart}
        </header>
      </div>
    );
  }
}
export default App;
