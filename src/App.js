import React from "react";
import "./App.css";
import { makeShuffledDeck } from "./utils.js";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import CardDisplay from "./CardDisplay";

class App extends React.Component {
  constructor(props) {
    // Always call super with props in constructor to initialise parent class
    super(props);
    this.state = {
      // Set default value of card deck to new shuffled deck
      cardDeck: makeShuffledDeck(),
      // currCards holds the cards from the current round
      currCards: [],
      cardsLeft: 52,
      gameStarted: false,

      playerOneCurrWinner: false,
      playerOneScore: 0,
      playerTwoScore: 0,
    };
  }

  playerOneIsHigher = (list) => {
    const suits = ["Diamonds", "Clubs", "Hearts", "Spades"];
    if (list.length === 0) {
      console.log(list);
      return null;
    }
    if (list[0].rank === list[1].rank) {
      if (suits.indexOf(list[0].suit) > suits.indexOf(list[1].suit)) {
        return true;
      } else {
        return false;
      }
    } else if (list[0].rank > list[1].rank) {
      return true;
    } else {
      return false;
    }
  };

  dealCards = () => {
    // this.state.cardDeck.pop() modifies this.state.cardDeck array
    const newCurrCards = [this.state.cardDeck.pop(), this.state.cardDeck.pop()];
    const newPlayerOneCurrWinner = this.playerOneIsHigher(newCurrCards);
    this.setState({
      currCards: newCurrCards,
      cardsLeft: this.state.cardsLeft - 2,
      gameStarted: true,
      playerOneCurrWinner: newPlayerOneCurrWinner,
    });
    if (newPlayerOneCurrWinner) {
      this.setState({
        playerOneScore: this.state.playerOneScore + 1,
      });
    } else {
      this.setState({
        playerTwoScore: this.state.playerTwoScore + 1,
      });
    }
  };

  calculateWinningStatement = (p1Points, p2Points) => {
    if (this.state.cardsLeft > 0) {
      const currWinner = this.state.playerOneCurrWinner
        ? "Player 1"
        : "Player 2";
      return "Winner of this round is: " + currWinner;
    }
    if (p1Points === p2Points) {
      return "This game is a draw!";
    }
    let winnerString = "Winner of the game is: Player ";
    return winnerString + (p1Points > p2Points ? 1 : 2);
  };

  refreshPage = () => {
    window.location.reload();
  };

  render() {
    // You can write JavaScript here, just don't try and set your state!
    const instructions = (
      <div>
        1. Assign yourselves player 1 and player 2<br />
        2. Press "Start Game" to start a round of High Card between 2 players
        <br />
        3. Suit value is ordered like this from highest to lowest
        <br />
        {"largest Spades > Hearts > Clubs > Diamonds smallest"}
      </div>
    );

    const currCardElems = (
      <Container className="mb-2">
        <Row>
          <Col>Player 1</Col>
          <Col>Player 2</Col>
        </Row>
        <Row>
          <Col>
            <CardDisplay card={this.state.currCards[0]} />
          </Col>
          <Col>
            <CardDisplay card={this.state.currCards[1]} />
          </Col>
        </Row>
        <Row>
          {this.state.currCards.map(({ name, suit }, index) => (
            // Give each list element a unique key
            <Col key={`${name} ${suit}`} className="col-6">
              Player {index + 1}: {name} of {suit}
            </Col>
          ))}
        </Row>
      </Container>
    );

    const gameTable = (
      <div>
        <h3>
          {this.calculateWinningStatement(
            this.state.playerOneScore,
            this.state.playerTwoScore
          )}
        </h3>
        <div>Player 1's Score: {this.state.playerOneScore}</div>
        <div>Player 2's Score: {this.state.playerTwoScore}</div>
        <h4>
          {this.state.cardsLeft > 0
            ? `Card left in deck: ${this.state.cardsLeft}`
            : "Press the button below to play again"}
        </h4>
      </div>
    );

    const gameDisplay = (
      <div className="col-11">
        {currCardElems} {gameTable}
      </div>
    );

    const dealButtonText =
      this.state.cardsLeft === 0 ? "Start next round" : "Deal";

    return (
      <div className="App">
        <header className="App-header">
          <h3>High Card 🚀</h3>
          {this.state.gameStarted ? gameDisplay : instructions}
          <br />
          <Button
            className="btn btn-light"
            onClick={
              this.state.cardsLeft === 0 ? this.refreshPage : this.dealCards
            }
          >
            {this.state.gameStarted ? dealButtonText : "Start Game"}
          </Button>
        </header>
      </div>
    );
  }
}

export default App;
