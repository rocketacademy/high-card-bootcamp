import React from "react";
import "./App.css";
import { makeShuffledDeck } from "./utils.js";
import { Player } from "./Components/Player";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // Set default value of card deck to new shuffled deck
      cardDeck: makeShuffledDeck(),
      // currCards holds the cards from the current round
      currCards: [],
      currWinner: "",
      roundsLeft: 26,
      roundScores: {
        "Player 1": 0,
        "Player 2": 0,
      },
    };
  }

  playRound = () => {
    if (this.state.roundsLeft > 0) {
      this.dealCards();
      setTimeout(this.getRoundWinner, 0);
      this.setState({ roundsLeft: this.state.roundsLeft - 1 });
    }
  };

  dealCards = () => {
    this.setState((state) => ({
      // Remove last 2 cards from cardDeck
      cardDeck: state.cardDeck.slice(0, -2),
      // Deal last 2 cards to currCards
      currCards: state.cardDeck.slice(-2),
    }));
  };

  getRoundWinner = () => {
    const firstCard = this.state.currCards[0];
    const secondCard = this.state.currCards[1];
    if (firstCard.rank > secondCard.rank) {
      this.setState({ currWinner: "Player 1" });
      this.setState({
        roundScores: {
          "Player 1": this.state.roundScores["Player 1"] + 1,
          "Player 2": this.state.roundScores["Player 2"],
        },
      });
    } else if (secondCard.rank > firstCard.rank) {
      this.setState({ currWinner: "Player 2" });
      this.setState({
        roundScores: {
          "Player 1": this.state.roundScores["Player 1"],
          "Player 2": this.state.roundScores["Player 2"] + 1,
        },
      });
    } else {
      this.setState({ currWinner: "Nobody" });
    }
  };

  getGameWinner = () => {
    const scores = this.state.roundScores;
    return Object.keys(scores).reduce((a, b) =>
      scores[a] > scores[b] ? a : b
    );
  };

  render() {
    const currCardElems = this.state.currCards.map(({ name, suit }) => (
      // Give each list element a unique key
      <div key={`${name}${suit}`}>
        {name} of {suit}
      </div>
    ));
    const gameWinner = this.getGameWinner();

    return (
      <div className="App">
        <header className="App-header">
          <h3>High Card 🚀</h3>
          {currCardElems}
          <br />
          <button onClick={this.playRound}>Deal</button>
          <br />
          <h1>{this.state.currWinner} won this round!</h1>
          <br />
          <Container>
            <Player id="1" score={this.state.roundScores["Player 1"]} />
            <Player id="2" score={this.state.roundScores["Player 2"]} />
            <Row>
              <Col>Rounds left</Col>
              <Col>{this.state.roundsLeft}</Col>
            </Row>
          </Container>
          <div>
            {this.state.roundsLeft === 0 && <h2>{gameWinner} won the game</h2>}
          </div>
        </header>
      </div>
    );
  }
}

export default App;
