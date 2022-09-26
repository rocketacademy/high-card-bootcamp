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
      player1CurrScore: 0,
      player2CurrScore: 0,
      player1TotalScore: 0,
      player2TotalScore: 0,
      player1GamesWon: 0,
      player2GamesWon: 0,
    };
  }

  dealCards = () => {
    const currCards = this.state.cardDeck.slice(-2);
    if(currCards[0].rank > currCards[1].rank){
      this.setState({
        roundWinner: 1,
        player1CurrScore: this.state.player1CurrScore + 1,
        player1TotalScore: this.state.player1TotalScore + 1,
      });
    }
    else if (currCards[0].rank < currCards[1].rank){
      this.setState({
        roundWinner: 2,
        player2CurrScore: this.state.player2CurrScore + 1,
        player2TotalScore: this.state.player2TotalScore + 1,
      });
    }
    else{
      this.setState({ roundWinner: 0 });
    }
      this.setState(
        (prevState) => ({
          cardDeck: prevState.cardDeck.slice(0, -2),
          currentCards: currCards,
          currentRound: prevState.currentRound + 1,
          gameStarted: true,
        }),
      );
  };

  nextGame = () => {
    this.setState((prevState) => ({
      cardDeck: makeShuffledDeck(),
      currentCards: [],
      hasGameStarted: false,
      currRoundWinner: 0,
      currentRound: 0,
      currentGame: prevState.currentGame + 1,
      player1CurrScore: 0,
      player2CurrScore: 0,
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
    const gameWinnerMessage = `${this.state.player1CurrScore > this.state.player2CurrScore? "Player 1" : "Player 2"} wins the game.`
    //Button text: restart/next/deal
    let buttontext = ""
    if(this.state.currentGame == this.state.numOfGames){
      buttontext = `${this.state.currentRound >= 25 ? "Restart" : "Deal"}`;
    }
    else{
      buttontext = `${this.state.currentRound >= 25 ? "Next Game" : "Deal"}`;
    }
    //Player 1's Score
    const player1Score = `Player 1 current round score: ${this.state.player1CurrScore}, Total Rounds Won: ${this.state.player1TotalScore}. Games won: ${this.state.player1GamesWon}`
    //Player 2's Score
    const player2Score = `Player 2 current round score: ${this.state.player2CurrScore}, Total Rounds Won: ${this.state.player2TotalScore}. Games won: ${this.state.player2GamesWon}`;
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
              ? this.state.currentGame == this.state.numOfGames
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