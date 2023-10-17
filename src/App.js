import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import React from "react";
import "./App.css";
import { makeShuffledDeck } from "./utils.js";

class App extends React.Component {
  constructor(props) {
    // Always call super with props in constructor to initialise parent class
    super(props);
    this.state = {
      // Set default value of card deck to new shuffled deck
      cardDeck: makeShuffledDeck(),
      // currCards holds the cards from the current round
      player1: { score: 0, result: "", currCard: {} },
      player2: { score: 0, result: "", currCard: {} },
      restart: "",
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
    if (this.state.player1.currCard.rank > this.state.player2.currCard.rank) {
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
      player1: this.state.player1,
      player2: this.state.player2,
    });
    if (this.state.cardDeck.length === 0) {
      this.genRestartButton();
    }
  };

  exeRestart = () => {
    this.setState({
      cardDeck: makeShuffledDeck(),
      player1: { score: 0, result: "", currCard: {} },
      player2: { score: 0, result: "", currCard: {} },
      restart: "",
    });
  };

  genRestartButton = () => {
    const restartElem = (
      <div>
        <p>
          Player {this.state.player1.score > this.state.player2.score ? 1 : 2}{" "}
          is the final winner! Do you want to play again?
        </p>
        <button onClick={this.exeRestart}>Restart</button>
        <button onClick={window.close}>Quit</button>
      </div>
    );

    this.setState({ restart: restartElem });
  };

  render() {
    // You can write JavaScript here, just don't try and set your state!

    // You can access your current components state here, as indicated below
    const currCardElems = (
      <Container>
        <Row>
          <Col>Player 1</Col>
          <Col>
            {this.state.player1.currCard.name} of{" "}
            {this.state.player1.currCard.suit}
          </Col>
          <Col>{this.state.player1.result}</Col>
          <Col>Score:{this.state.player1.score}</Col>
        </Row>
        <Row fluid>
          <Col>Player 2</Col>
          <Col>
            {this.state.player2.currCard.name} of{" "}
            {this.state.player2.currCard.suit}
          </Col>
          <Col>{this.state.player2.result}</Col>
          <Col>Score:{this.state.player2.score}</Col>
        </Row>
      </Container>
    );

    return (
      <div className="App">
        <header className="App-header">
          <h3>High Card 🚀</h3>
          {"name" in this.state.player1.currCard ? currCardElems : ""}
          <br />
          <button onClick={this.changeResult}>Deal</button>
          {this.state.restart}
        </header>
      </div>
    );
  }
}
export default App;
