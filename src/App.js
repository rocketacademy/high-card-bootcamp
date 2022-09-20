import React from "react";
import "./App.css";
import { makeShuffledDeck } from "./utils.js";

export default function App(props) {
  const [cards, setCards] = React.useState({
    player1WinCount: 0,
    player2WinCount: 0,
    playerDrawCount: 0,
    currCards: [],
    gameCount: 0,
    totalCards: 52,
  });

  function handleDeal() {
    const cardDeck = makeShuffledDeck();
    const drewCards = cardDeck.slice(-2);
    let player1Win = 0;
    let player2Win = 0;
    let playerDraw = 0;

    if (drewCards[0].rank === drewCards[1].rank) {
      playerDraw = playerDraw + 1;
    } else if (drewCards[0].rank > drewCards[1].rank) {
      player1Win = player1Win + 1;
    } else {
      player2Win = player2Win + 1;
    }

    setCards((prevCards) => ({
      player1WinCount: prevCards.player1WinCount + player1Win,
      player2WinCount: prevCards.player2WinCount + player2Win,
      playerDrawCount: prevCards.playerDrawCount + playerDraw,
      currCards: drewCards,
      gameCount: prevCards.gameCount + 1,
      totalCards: prevCards.totalCards - 2,
    }));
  }

  function handleReset() {
    setCards((prevCards) => ({
      currCards: [],
      player1Wins: 0,
      player2Wins: 0,
      gameCount: 0,
      totalCards: 52,
    }));
  }

  let count = 1;
  const currCardElems = cards.currCards.map(({ name, suit }) => (
    // Give each list element a unique key
    <div key={`${name}${suit}`}>
      <h3>{`player ${count++}`}</h3>
      <p>
        {name} of {suit}
      </p>
    </div>
  ));

  //console.log(cards.gameCount);

  return (
    <div className="App">
      <header className="App-header">
        <h3>High Card 🚀</h3>
        {currCardElems}
        <br />
        <p>Player 1 Wins: {cards.player1WinCount}</p>
        <p>Player 2 Wins: {cards.player2WinCount}</p>
        <p>Player Draws: {cards.playerDrawCount}</p>
        <p>Game Count: {cards.gameCount}</p>
        {cards.totalCards > 0 && <button onClick={handleDeal}>Deal</button>}
        {cards.totalCards === 0 && (
          <p>
            {cards.player1WinCount > cards.player2WinCount
              ? "Winner: Player 1"
              : "Winner: Player 2"}
          </p>
        )}
        {cards.totalCards === 0 && <button onClick={handleReset}>Reset</button>}
      </header>
    </div>
  );
}
