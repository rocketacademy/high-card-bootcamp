import React from "react";
import "./App.css";
import { makeShuffledDeck } from "./utils.js";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cardDeck: makeShuffledDeck(),
      currCards: [],
      winner: null,
      currentRound: 0,
      roundWinners: [],
      player1Wins: 0,
      player2Wins: 0,
      ties: 0,
    };
  }

  // Function to deal two cards and determine the winner
  dealCards = () => {
    const { cardDeck, currentRound } = this.state;

    if (cardDeck.length < 2) {
      alert("Not enough cards to continue playing.");
      return;
    }

    const [card1, card2] = [cardDeck.pop(), cardDeck.pop()];

    let winner;
    if (card1.rank > card2.rank) {
      winner = "Player 1";
      this.setState((prevState) => ({
        player1Wins: prevState.player1Wins + 1,
      }));
    } else if (card1.rank < card2.rank) {
      winner = "Player 2";
      this.setState((prevState) => ({
        player2Wins: prevState.player2Wins + 1,
      }));
    } else {
      winner = "Tie";
      this.setState((prevState) => ({ ties: prevState.ties + 1 }));
    }

    // Update the game state with the result of the current round
    this.setState((prevState) => ({
      currCards: [card1, card2],
      winner,
      currentRound: prevState.currentRound + 1,
      roundWinners: [
        ...prevState.roundWinners,
        { round: currentRound + 1, cards: [card1, card2], winner },
      ],
    }));
  };

  // Function to reset the game and scores to zero
  refreshGame = () => {
    this.setState({
      cardDeck: makeShuffledDeck(),
      currCards: [],
      winner: null,
      currentRound: 0,
      roundWinners: [],
      player1Wins: 0,
      player2Wins: 0,
      ties: 0,
    });
  };

  render() {
    const {
      currCards,
      winner,
      currentRound,
      roundWinners,
      player1Wins,
      player2Wins,
      ties,
    } = this.state;

    // Calculate percentages
    const player1WinPercentage =
      currentRound > 0 ? ((player1Wins / currentRound) * 100).toFixed(2) : 0;
    const player2WinPercentage =
      currentRound > 0 ? ((player2Wins / currentRound) * 100).toFixed(2) : 0;
    const tiesPercentage =
      currentRound > 0 ? ((ties / currentRound) * 100).toFixed(2) : 0;

    const currCardElems = currCards.map(({ name, suit }) => (
      <div key={`${name}${suit}`}>
        {name} of {suit}
      </div>
    ));

    const roundWinnersTable = (
      <table className="table">
        <thead>
          <tr>
            <th>Round</th>
            <th>Player 1 Card</th>
            <th>Player 2 Card</th>
            <th>Winner</th>
          </tr>
        </thead>
        <tbody>
          {roundWinners.map((round, index) => {
            let className = "";
            if (round.winner === "Player 1") {
              className = "row-player1-win";
            } else if (round.winner === "Player 2") {
              className = "row-player2-win";
            } else {
              className = "row-tie";
            }
            return (
              <tr key={index} className={className}>
                <td>{round.round}</td>
                <td>
                  {round.cards[0].name} of {round.cards[0].suit}
                </td>
                <td>
                  {round.cards[1].name} of {round.cards[1].suit}
                </td>
                <td>{round.winner}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );

    return (
      <Container className="App">
        <header className="App-header">
          <h3>High Card 🚀</h3>
          {currCardElems}
          <br />
          <Row className="button-container">
            <Col>
              <Button variant="primary" onClick={this.dealCards}>
                Deal
              </Button>
            </Col>
            <Col>
              <Button variant="secondary" onClick={this.refreshGame}>
                Refresh
              </Button>
            </Col>
          </Row>
          {winner && <p>Winner: {winner}</p>}
          <div className="statistics">
            <p>
              Player 1 Wins: {player1Wins} ({player1WinPercentage}%)
            </p>
            <p>
              Player 2 Wins: {player2Wins} ({player2WinPercentage}%)
            </p>
            <p>
              Ties: {ties} ({tiesPercentage}%)
            </p>
          </div>
          <p>Round: {currentRound}</p>
          <div className="tables-container">
            <div className="table">
              <h4>Round Winners</h4>
              {roundWinnersTable}
            </div>
          </div>
        </header>
      </Container>
    );
  }
}

export default App;
