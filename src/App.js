import React, {useState} from "react";
import "./App.css";
import { makeShuffledDeck } from "./utils.js";
import PlayerElem from "./components/PlayerElem";

// class App extends React.Component {
//   constructor(props) {
//     // Always call super with props in constructor to initialise parent class
//     super(props);
//     this.state = {
//       // Set default value of card deck to new shuffled deck
//       cardDeck: makeShuffledDeck(),
//       // currCards holds the cards from the current round
//       currCards: [],
//     };
//   }

//   dealCards = () => {
//     // this.state.cardDeck.pop() modifies this.state.cardDeck array
//     const newCurrCards = [this.state.cardDeck.pop(), this.state.cardDeck.pop()];
//     this.setState({
//       currCards: newCurrCards,
//     });
//   };

//   render() {
//     // You can write JavaScript here, just don't try and set your state!

//     // You can access your current components state here, as indicated below
//     const currCardElems = this.state.currCards.map(({ name, suit }) => (
//       // Give each list element a unique key
//       <div key={`${name}${suit}`}>
//         {name} of {suit}
//       </div>
//     ));

//     return (
//       <div className="App">
//         <header className="App-header">
//           <h3>High Card 🚀</h3>
//           {currCardElems}
//           <br />
//           <button onClick={this.dealCards}>Deal</button>
//         </header>
//       </div>
//     );
//   }
// }

function App() {

  const [roundScore,setRoundScore] = useState([0,0]);
  const [gameScore,setGameScore] = useState([0,0]);
  const [deck, setDeck] = useState(makeShuffledDeck());
  const [currCards, setCurrCards] = useState([0,0])


  const dealCards = () => {
    const newCards = [deck.pop(), deck.pop()]
    if (newCards[0].rank > newCards[1].rank) {setRoundScore([roundScore[0]+1,roundScore[1]])}
    else if (newCards[0].rank < newCards[1].rank) {setRoundScore([roundScore[0],roundScore[1]+1])}
    else {}
    console.log("newCards",newCards);
    console.log("currCardRanks",newCards[0].rank,newCards[1].rank);
    console.log("roundScore", roundScore);
    setCurrCards(newCards);
    // if (deck.length < 1) {endGame()}
  }

  const endGame = () => {
    if (roundScore[0]>roundScore[1]) {
      setGameScore([gameScore[0]+1, gameScore[1]])
    }
    else if (roundScore[0]<roundScore[1]) {
      setGameScore([gameScore[0], gameScore[1]+1])
    }
    else {};
    setRoundScore([0,0]);
    setCurrCards([0,0]);
    setDeck(makeShuffledDeck());
  }

  return(
    <div className="App">
      <header className="App-header">
        <h3>High Card 🚀</h3>
        {deck.length ? 
        <button onClick={dealCards}>Deal</button> : 
        <button onClick={endGame}>New Game</button>}
        <button onClick={endGame}>End Game</button>
        <PlayerElem currCards={currCards} gameScore={gameScore} />

        <h3>
          Score  <br/>  {roundScore[0]} - {roundScore[1]}
        </h3>
        <div>Round: {(52-deck.length)/2}/26</div>
        <div>Games Won: {gameScore[0]} - {gameScore[1]}</div>
      </header>
    </div>
  )
}

export default App;
