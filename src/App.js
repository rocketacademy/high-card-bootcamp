import React from "react";
import "./App.css";
import { makeShuffledDeck } from "./components/utils.js";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import PlayingCard from "./components/PlayingCard";

class App extends React.Component {
  constructor(props) {
    // Always call super with props in constructor to initialise parent class
    super(props);
    this.state = {
      cardDeck: makeShuffledDeck(),
      p1Card: [{ name: "", suit: "", rank: 0 }],
      p2Card: [{ name: "", suit: "", rank: 0 }],
      p1Score: 0,
      p2Score: 0,
      p1Result: 0,
      p2Result: 0,
      gameState: `Press deal to begin ⬇️`,
    };
  }

  dealCards = () => {
    if (this.state.cardDeck.length === 0) {
      this.setState(this.checkGameEnd);
      return;
    }

    const p1Cards = [this.state.cardDeck.pop()];
    const p2Cards = [this.state.cardDeck.pop()];
    this.setState(
      {
        p1Card: p1Cards,
        p2Card: p2Cards,
      },
      this.cardCompare //run card compare after cards are dealt
    );
  };

  test = () => this.setState({ p1Score: this.state.p1Score + 1 });

  cardCompare = () => {
    const [card1] = this.state.p1Card;
    const [card2] = this.state.p2Card;
    const suitWeights = {
      Spades: 4,
      Hearts: 3,
      Clubs: 2,
      Diamonds: 1,
    };

    if (card1.rank > card2.rank) {
      this.setState({
        p1Score: this.state.p1Score + 1,
        gameState: "🥷🏻 Scores!",
      });
    } else if (suitWeights[card1.suit] > suitWeights[card2.suit]) {
      this.setState({
        p1Score: this.state.p1Score + 1,
        gameState: "🥷🏻 Scores!",
      });
    } else
      this.setState({
        p2Score: this.state.p2Score + 1,
        gameState: "🤖 Scores!",
      });
  };

  checkGameEnd = () => {
    if (this.state.p1Score > this.state.p2Score) {
      this.setState({
        p1Result: this.state.p1Result + 1,
        p1Score: 0,
        p2Score: 0,
        gameState: "No more cards - 🥷🏻 Wins!",
      });
    } else {
      this.setState({
        p1Score: this.state.p1Score + 1,
        p1Score: 0,
        p2Score: 0,
        gameState: "No more cards - 🤖 Wins!",
      });
    }
    this.setState({ cardDeck: makeShuffledDeck() });
  };

  restartGame = () => {
    this.setState({
      cardDeck: makeShuffledDeck(),
      currCards: [],
      p1Score: 0,
      p2Score: 0,
      p1Result: 0,
      p2Result: 0,
      gameState: "Game Reset",
    });
  };

  render() {
    const [card1] = this.state.p1Card;
    const [card2] = this.state.p2Card;

    return (
      <div className="App">
        <header className="App-header">
          <h2>High Card Showdown 🥷🏻 vs 🤖</h2>
          <h3>{this.state.gameState}</h3>
          <Container>
            <Row className="table-row">
              <Col className="header-elements">🥷🏻 Games Won:</Col>
              <Col className="header-elements">🥷🏻 Game Score:</Col>
              <Col className="header-elements">🤖 Game Score:</Col>
              <Col className="header-elements">🤖 Games Won:</Col>
            </Row>
            <Row className="table-row">
              <Col className="table-elements">{this.state.p1Result}</Col>
              <Col className="table-elements">{this.state.p1Score}</Col>
              <Col className="table-elements">{this.state.p2Score}</Col>
              <Col className="table-elements">{this.state.p2Result}</Col>
            </Row>
          </Container>
          <Container>
            <Row className="card-row">
              <Col className="card-element">
                <PlayingCard suit={card1.suit} name={card1.name} />
                <p className="char">🥷🏻</p>
              </Col>
              <Col className="card-element">
                <PlayingCard suit={card2.suit} name={card2.name} />
                <p className="char">🤖</p>
              </Col>
            </Row>
          </Container>
          <button onClick={this.dealCards}>Deal!</button>
          <button onClick={this.restartGame}>Reset</button>
          <footer>Remaining Cards:{this.state.cardDeck.length}</footer>
        </header>
      </div>
    );
  }
}

export default App;
