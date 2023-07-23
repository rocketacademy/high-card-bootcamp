import React, { useState, useEffect } from "react";
import "./App.css";
import { makeShuffledDeck } from "./utils.js";
import Card from "./Component/Card";

const App = () => {
  const [cardDeck, setCardDeck] = useState(makeShuffledDeck());
  const [currCards, setCurrCards] = useState([]);
  const [scores, setScores] = useState({ player1: 0, player2: 0 });
  const [gameScores, setGameScores] = useState({ player1: 0, player2: 0 });
  const [rounds, setRounds] = useState(0);

  const dealCards = () => {
    if (rounds >= 16) return;
    const newCurrCards = [cardDeck.pop(), cardDeck.pop()];
    setCurrCards(newCurrCards);
    setCardDeck(cardDeck);
    setRounds(rounds + 1);
  };

  const restartGame = () => {
    setCardDeck(makeShuffledDeck());
    setCurrCards([]);
    setScores({ player1: 0, player2: 0 });
    setRounds(0);
  };

  const compareCards = (card1, card2) => {
    return card1.name < card2.name ? "player1" : "player2";
  };

  useEffect(() => {
    if (currCards.length === 2) {
      const winner = compareCards(currCards[0], currCards[1]);
      setScores((prevScores) => ({
        ...prevScores,
        [winner]: prevScores[winner] + 1,
      }));
    }
  }, [currCards]);

  useEffect(() => {
    if (cardDeck.length === 0 || rounds === 16) {
      const gameWinner =
        scores.player1 > scores.player2 ? "player1" : "player2";
      setGameScores((prevGameScores) => ({
        ...prevGameScores,
        [gameWinner]: prevGameScores[gameWinner] + 1,
      }));
      restartGame();
    }
  }, [cardDeck, scores, rounds]);

  const currCardElems = currCards.map((card, index) => (
    <Card key={`${card.name}${card.suit}`} card={card} playerIndex={index} />
  ));

  const roundsRemaining = 16 - rounds;

  return (
    <div className="App">
      <header className="App-header">
        <h3>🚀 High Card Game 🚀</h3>
        <div className="cards-container">{currCardElems}</div>

        <button
          onClick={dealCards}
          disabled={cardDeck.length < 2 || rounds >= 16}
        >
          GO
        </button>
        <button onClick={restartGame}>Restart</button>

        <div>Rounds Per Game: {roundsRemaining} / 16</div>
        <div>
          Score Per Game: Player 1 - {scores.player1}, Player 2 -{" "}
          {scores.player2}
        </div>
        <div>
          Game Won Record: Player 1 - {gameScores.player1}, Player 2 -{" "}
          {gameScores.player2}
        </div>
        <br />
      </header>
    </div>
  );
};

export default App;
