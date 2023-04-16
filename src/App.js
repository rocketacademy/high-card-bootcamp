import React from 'react';
import './App.css';
import { makeShuffledDeck } from './utils.js';
import ProgressBar from 'react-bootstrap/ProgressBar';
import 'bootstrap/dist/css/bootstrap.css';
import Table from 'react-bootstrap/Table';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cardDeck: makeShuffledDeck(),
      currCards: [],
      gameStart: false,
      roundWinner: null,
      player1Won: 0,
      player2Won: 0,
    };
  }

  dealCards = () => {
    // remove the 2 cards from deck, the remaining card set is called newCurrCard
    const newCurrCards = this.state.cardDeck.slice(-2);

    let roundWinner = null;

    if (newCurrCards[0].rank > newCurrCards[1].rank) {
      roundWinner = 1;
    } else if (newCurrCards[1].rank > newCurrCards[0].rank) {
      roundWinner = 2;
    } else if (newCurrCards[0].rank === newCurrCards[1].rank) {
      roundWinner = 3;
    }

    this.setState((state) => ({
      cardDeck: state.cardDeck.slice(0, -2),
      currCards: newCurrCards,
      gameStart: true,
      roundWinner: roundWinner,
      player1Won: roundWinner === 1 ? state.player1Won + 1 : state.player1Won,
      player2Won: roundWinner === 2 ? state.player2Won + 1 : state.player2Won,
    }));
  };

  componentDidUpdate() {
    setTimeout(() => {
      console.log(JSON.stringify(this.state.currCards));
    }, 1000);
  }

  resetGame = () => {
    this.setState({
      cardDeck: makeShuffledDeck(),
      currCards: [],
      player1Won: 0,
      player2Won: 0,
      roundWinner: null,
      gameStart: false,
    });
  };
  render() {
    const currCardElems = this.state.currCards.map(({ name, suit }) => (
      <div key={`${name}${suit}`}>
        <img
          className='image'
          src={require(`./images/${name}_of_${suit}.png`)}
          alt={`${name} of ${suit}`}
        />
      </div>
    ));

    let gameWinnerMessage = '';

    if (this.state.roundWinner === 3) {
      gameWinnerMessage = 'It is a tie.';
    } else if (this.state.roundWinner === 1 || this.state.roundWinner === 2) {
      gameWinnerMessage = `Player ${this.state.roundWinner} won the round`;
    }

    let overallWinnerMessage = '';

    if (this.state.player1Won > this.state.player2Won) {
      overallWinnerMessage = 'Player 1 won the game';
    } else if (this.state.player2Won > this.state.player1Won) {
      overallWinnerMessage = 'Player 2 won the game';
    } else if (this.state.player1Won === this.state.player2Won) {
      overallWinnerMessage = 'It is a tie.';
    }

    const dealButtonText = this.state.cardDeck.length === 0 ? 'Reset' : 'Deal';

    return (
      <div className='App'>
        <header className='App-header'>
          <h3>High Card 🚀</h3>

          {currCardElems}
          <br />
          <div className='tableMargin'>
            <Table striped bordered variant='dark'>
              <thead>
                <tr>
                  <td colSpan={2}>Scoreboard</td>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th>Player 1</th>
                  <th>Player 2</th>
                </tr>
                <tr>
                  <td>{this.state.player1Won}</td>
                  <td>{this.state.player2Won}</td>
                </tr>
              </tbody>
            </Table>
          </div>
          <div className='progressBar'>
            <ProgressBar now={this.state.cardDeck.length} max={52} />
          </div>
          <button
            onClick={
              this.state.cardDeck.length === 0 ? this.resetGame : this.dealCards
            }
          >
            {dealButtonText}
          </button>
          <br />

          <p>{this.state.gameStart && gameWinnerMessage}</p>
          <p>{this.state.cardDeck.length === 0 && overallWinnerMessage}</p>
        </header>
      </div>
    );
  }
}

export default App;
