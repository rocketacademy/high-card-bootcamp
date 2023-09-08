import { makeShuffledDeck } from "./utils.js";

class GameLogic {
  constructor() {
    this.state = {
      cardDeck: makeShuffledDeck(),
      p1Card: [],
      p2Card: [],
      p1Score: 0,
      p2Score: 0,
      p1Result: 0,
      p2Result: 0,
    };
  }

  cardCompare = () => {
    const { currCards } = this.state;
    const [card1, card2] = currCards;

    if (card1.rank > card2.rank) {
      this.updatePlayerScore(1);
    } else if (card1.rank < card2.rank) {
      this.updatePlayerScore(2);
    } else {
      this.setState({ lastWinner: "Tie" }, this.checkGameEnd);
    }
  };

  checkGameEnd = () => {
    const { cardDeck } = this.state;

    if (cardDeck.length === 0) {
      this.determineGameWinner();
    }
  };

  updatePlayerScore = (winner) => {
    this.setState(
      (prevState) => ({
        [winner === 1 ? "player1Score" : "player2Score"]:
          prevState[winner === 1 ? "player1Score" : "player2Score"] + 1,
        lastWinner: winner,
      }),
      this.checkGameEnd
    ); // Check if the game has ended after updating the score
  };

  determineGameWinner = () => {
    const { player1Score, player2Score, gameScores } = this.state;
    let gameWinner = "";

    if (player1Score > player2Score) {
      gameWinner = "Player 1 Wins the Game!";
      this.setState({ gameScores: [...gameScores, 1] });
    } else if (player1Score < player2Score) {
      gameWinner = "Player 2 Wins the Game!";
      this.setState({ gameScores: [...gameScores, 2] });
    } else {
      gameWinner = "The Game is a Tie!";
      this.setState({ gameScores: [...gameScores, "Tie"] });
    }
    console.log("gamewinner");
    this.setState({ gameWinner });
  };

  restartGame = () => {
    this.setState({
      cardDeck: makeShuffledDeck(),
      currCards: [],
      player1Score: 0,
      player2Score: 0,
      lastWinner: null,
      gameWinner: null,
    });
  };

  getWinnerMessage = () => {
    const { currCards, lastWinner } = this.state;
    if (!currCards.length || currCards.length !== 2) {
      return null; // No cards dealt or not a full round
    }

    const [card1, card2] = currCards;

    switch (lastWinner) {
      case 1:
        return `${card1.name} of ${card1.suit} Wins! Player 1 Wins this round!`;
      case 2:
        return `${card2.name} of ${card2.suit} Wins! Player 2 Wins this round!`;
      case "Tie":
        return `Both ${card1.name} of ${card1.suit} and ${card2.name} of ${card2.suit} have the same rank! It's a Tie!`;
      default:
        return null;
    }
  };

  getOverallScores = () => {
    const { gameScores } = this.state;
    const player1Wins = gameScores.filter((score) => score === 1).length;
    const player2Wins = gameScores.filter((score) => score === 2).length;
    const ties = gameScores.filter((score) => score === "Tie").length;

    return {
      player1Wins,
      player2Wins,
      ties,
    };
  };
}
