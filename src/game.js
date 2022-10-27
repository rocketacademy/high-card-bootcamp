import React from "react";
import {makeShuffledDeck} from "./utils"

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cardDeck: makeShuffledDeck(),
      currentCards: [],
      numOfGames: this.props.games,
      gameStarted: false,
      currentRound: 0,
      currentGame: 1,
      roundWinner: null,
      score: {
        player1CurrScore: 0,
        player2CurrScore: 0,
        player1TotalScore: 0,
        player2TotalScore: 0,
      },
    };
  }

  dealCards = () => {
    const currCards = this.state.cardDeck.slice(-2);
    let roundWinner = 0
    let score = this.state.score
    if(currCards[0].rank > currCards[1].rank){
      roundWinner = 1;
      score.player1CurrScore++
      score.player1TotalScore++
    }
    else if (currCards[0].rank < currCards[1].rank){
      roundWinner = 1;
      score.player2CurrScore++;
      score.player2TotalScore++;
    }
    else{
      roundWinner = null
    }
      this.setState((prevState) => ({
        cardDeck: prevState.cardDeck.slice(0, -2),
        currentCards: currCards,
        currentRound: prevState.currentRound + 1,
        gameStarted: true,
        roundWinner: roundWinner,
        score: score
      }));
  };

  nextGame = () => {
    this.setState(() => ({
      cardDeck: makeShuffledDeck(),
      currentCards: [],
      hasGameStarted: false,
      currRoundWinner: 0,
      currentRound: 0,
      currentGame: this.state.currentGame + 1,
      score: {
        player1CurrScore: 0,
        player2CurrScore: 0,
        player1TotalScore: this.state.score.player1TotalScore,
        player2TotalScore: this.state.score.player2TotalScore,
      },
    }));
  };

  resetGame = () => {
    this.props.getGameMode("start")
  }


  render() {
    //display cards
    const currCardElems = this.state.currentCards.map(({ name, suit }, i) => (
      <div key={`${name}${suit}`}>
        <img src={require(`../src/assets/${name}Of${suit}.png`)} alt="card" />
        <p>
          Player {i + 1} drew {name} of {suit}
        </p>
      </div>
    ));
    //Round Winner Message
    const winnerMessage = `${
      this.state.roundWinner ? `Player ${this.state.roundWinner}` : "No Player"
    } wins this round.`;
    //Game Winner Message
    const gameWinnerMessage = `${this.state.score.player1CurrScore > this.state.score.player2CurrScore? "Player 1" : "Player 2"} wins the game.`
    //Button text: restart/next/deal
    let buttontext = ""
    if(this.state.currentGame === parseInt(this.state.numOfGames)){
      buttontext = `${this.state.currentRound >= 25 ? "Restart" : "Deal"}`;
    }
    else{
      buttontext = `${this.state.currentRound >= 25 ? "Next Game" : "Deal"}`;
    }
    //Player 1's Score
    const player1Score = `Player 1 current round score: ${this.state.score.player1CurrScore}, Total Rounds Won: ${this.state.score.player1TotalScore}. `
    //Player 2's Score
    const player2Score = `Player 2 current round score: ${this.state.score.player2CurrScore}, Total Rounds Won: ${this.state.score.player2TotalScore}. `;
    return (
      <div className="App">
        <h2>Game {this.state.currentGame}</h2>
        {this.state.currentRound > 0 ? (
          currCardElems
        ) : (
          <p>Press deal to start</p>
        )}
        <button
          onClick={
            this.state.currentRound >= 25
              ? this.state.currentGame === parseInt(this.state.numOfGames)
                ? this.resetGame
                : this.nextGame
              : this.dealCards
          }
        >
          {buttontext}
        </button>
        <br />
        <br />
        {this.state.currentRound > 0 && winnerMessage}
        <br />
        {this.state.currentRound >= 25 && gameWinnerMessage}
        <br />
        {this.state.currentRound > 0 && player1Score}
        <br />
        {this.state.currentRound > 0 && player2Score}
      </div>
    );
  }
}

export default Game;