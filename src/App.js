import "bootstrap/dist/css/bootstrap.min.css";
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
    };
  }

  dealCards = () => {
    // this.state.cardDeck.pop() modifies this.state.cardDeck array
    const newCurrCard1 = this.state.cardDeck.pop();
    const newCurrCard2 = this.state.cardDeck.pop();
    this.setState({
      player1: { currCard: newCurrCard1 },
      player2: { currCard: newCurrCard2 },
    });
  };

  render() {
    // You can write JavaScript here, just don't try and set your state!

    // You can access your current components state here, as indicated below
    const currCardElems = (
      <div>
        <Row fluid>
          <Col>Player 1</Col>
          <Col>
            {this.state.player1.currCard.name} of{" "}
            {this.state.player1.currCard.suit}
          </Col>
        </Row>
        <Row fluid>
          <Col>Player 2</Col>
          <Col>
            {this.state.player2.currCard.name} of{" "}
            {this.state.player2.currCard.suit}
          </Col>
        </Row>
      </div>
    );

    return (
      <div className="App">
        <header className="App-header">
          <h3>High Card 🚀</h3>
          {"name" in this.state.player1.currCard ? currCardElems : ""}
          <br />
          <button onClick={this.dealCards}>Deal</button>
        </header>
      </div>
    );
  }
}

export default App;
