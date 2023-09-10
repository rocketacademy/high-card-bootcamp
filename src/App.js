import React from "react";
import "./App.css";
import { makeShuffledDeck } from "./utils.js";
import PlayingCards from "./playingcards.js"

export default class App extends React.Component {
  constructor(props) {
    // Always call super with props in constructor to initialise parent class
    super(props);

    //Contains all the related variable
    this.state = {
      cardDeck: makeShuffledDeck(),
      currCards: [],
      currWinner: undefined,
      player1Score: 0,
      player2Score: 0,
      player1WonMatches: 0,
      player2WonMatches: 0,
      gameState: "INITIALIZE",
    };
  }

  dealCards = () => {
    let { cardDeck } = this.state;

    // this.state.cardDeck.pop() modifies this.state.cardDeck array
    const newCurrCards = [cardDeck.pop(), cardDeck.pop()];
    if (cardDeck.length === 0) {
      this.setState(
        {
          currCards: newCurrCards,
          gameState: "ENDS",
        },
        this.compareCards
      );
    } else {
      this.setState(
        {
          currCards: newCurrCards,
          gameState: "PROGRESS",
        },
        this.compareCards
      );
    }
  };

  compareCards = () => {
    const suits = ["Diamonds", "Clubs", "Hearts", "Spades"];
    const { currCards } = this.state;
    let player1SuitObj = {};
    let player2SuitObj = {};

    //Registering player's suit object
    for (let i = 0; i < suits.length; i++) {
      if (suits[i] === currCards[0].suit) {
        player1SuitObj = {
          id: i,
          suit: currCards[0].suit,
        };
      }

      if (suits[i] === currCards[1].suit) {
        player2SuitObj = {
          id: i,
          suit: currCards[1].suit,
        };
      }
    }

    //Comparing both cards
    if (currCards[0].rank > currCards[1].rank) {
      // player1 won
      this.setState((prevState) => {
        return {
          currWinner: "Player 1",
          player1Score: prevState.player1Score + 1,
        };
      }, this.calculateMatches);
    } else if (currCards[0].rank === currCards[1].rank) {
      if (player1SuitObj.id > player2SuitObj.id) {
        //player1 won
        this.setState((prevState) => {
          return {
            currWinner: "Player 1",
            player1Score: prevState.player1Score + 1,
          };
        }, this.calculateMatches);
      } else {
        //player 2 won
        this.setState((prevState) => {
          return {
            currWinner: "Player 2",
            player2Score: prevState.player2Score + 1,
          };
        }, this.calculateMatches);
      }
    } else {
      //player 2 won
      this.setState((prevState) => {
        return {
          currWinner: "Player 2",
          player2Score: prevState.player2Score + 1,
        };
      }, this.calculateMatches);
    }
  };

  calculateMatches = () => {
    let { player1Score, player2Score, gameState } = this.state;

    if (gameState === "ENDS") {
      if (player1Score > player2Score) {
        this.setState((prevState) => {
          return {
            player1WonMatches: prevState.player1WonMatches + 1,
          };
        });
      } else if (player1Score < player2Score) {
        this.setState((prevState) => {
          return {
            player2WonMatches: prevState.player2WonMatches + 1,
          };
        });
      }
    }
  };

  restartGame = () => {
    this.setState({
      cardDeck: makeShuffledDeck(),
      currCards: [],
      currWinner: undefined,
      player1Score: 0,
      player2Score: 0,
      gameState: "INITIALIZE",

    });
  };

  reset = () => {
    this.setState({
      cardDeck: makeShuffledDeck(),
      currCards: [],
      currWinner: undefined,
      player1Score: 0,
      player2Score: 0,
      player1WonMatches: 0,
      player2WonMatches: 0,
      gameState: "INITIALIZE",
    });
  };

  componentDidUpdate() {
    // Following are issue faced (cannot use componentDidupdate to manipulate the game state)

    // let { cardDeck } = this.state;
    // if (cardDeck.length === 0) {
    //   this.setState({
    //     gameState: 0
    //   });
    // };
    // console.log(this.state.gameState);
  }

  render() {
    //In render() function, able to use or import: 
    //A) The variable that you declared, either inside the "render" function, or brought in via "this.state"
    //B) Functions that you declared

    let {
      cardDeck,
      currCards,
      currWinner,
      player1Score,
      player2Score,
      player1WonMatches,
      player2WonMatches,
      gameState,
    } = this.state;
    let dealButton, restartGameButton, resetMatchButton, announcement;

    // You can access your current components state here, as indicated below
    const currCardElems = this.state.currCards.map(({ name, suit }) => (
      // Give each list element a unique key
      <div class="text-lg" key={`${name}${suit}`}>
        {name} of {suit}
      </div>
    ));

    // Define buttons
    dealButton = <button class="py-2 px-4 w-full bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75" onClick={this.dealCards}>Deal</button>;
    restartGameButton = (
      <button class="py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75" onClick={this.restartGame}>Restart Game</button>
    );
    resetMatchButton = <button class="py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75" onClick={this.reset}>Reset Match</button>;


    //Variables appearence under different state
    if (gameState === "INITIALIZE") {
      announcement = <p></p>;
      restartGameButton = (
        <button disbaled class="py-2 px-4 bg-gray-400 text-slate-800 font-semibold rounded-lg shadow-md pointer-events-none"onClick={this.restartGame}>Restart Game</button>
      );

    } else if (gameState === "PROGRESS") {
      announcement = (
        <div>
          <p><span class="font-bold">{currWinner}</span> won this round !</p>
          <p>Remaining Cards: {cardDeck.length}</p>
        </div>
      );

    } else if (gameState === "ENDS") {
      dealButton = (
        <button class="py-2 px-4 w-full bg-gray-400 text-slate-800 font-semibold rounded-lg shadow-md pointer-events-none" onClick={this.dealCards} disabled>
          Deal
        </button>
      );

      if (player1Score > player2Score) {
        announcement = (
          <div>
            <p>Deck is Empty! <span class="font-bold">Player 1</span> Wins The Game!</p>
            <p>Do u wish to continue?</p>
          </div>
        );
      } else if (player1Score < player2Score) {
        announcement = (
          <div>
            <p>Deck is Empty! <span class="font-bold">Player 2</span> Wins The Game!</p>
            <p>Do u wish to continue?</p>
          </div>
        );
      } else {
        announcement = (
          <div>
            <p>It's a <span class="font-bold">TIE</span> !</p>
            <p>Do u wish to continue?</p>
          </div>
        )
      }
    }

    return (
      <div className="App">
        <div class="h-50 w-100">
          <div class="mx-auto">
              <h3 class="text-4xl font-bold m-8 text-slate-100">🚀 High Card 🚀</h3>
          </div>
        </div>
        <div class=" h-auto w-auto resize overflow-auto p-8 m-8 first-line:flex justify-around items-center content-center bg-slate-100 rounded-lg decoration-black">
          <div class="mx-auto">
            <section class="flex justify-around items-center flex-col gap-8">
              <div class="flex justify-around items-center flex-wrap gap-10 text-xl">
                <div class="flex justify-around items-center gap-6 flex-col">
                  <p class="font-bold">Player 1 - {player1WonMatches}</p>
                  <PlayingCards name={currCards[0]?.name} cardSuit={currCards[0]?.suit}></PlayingCards>
                  {currCardElems[0]}
                </div>
                <div class="flex justify-center items-center content-center gap-24 flex-col">
                  <p class="font-bold"> --- Total Matches Won --- </p>
                  {announcement}
                  <div>
                    <p>Round Score</p>
                    <p>{player1Score} - {player2Score}</p>
                  </div>
                </div>
                <div class="flex justify-around items-center gap-6 flex-col">
                  <p class="font-bold">Player 2 - {player2WonMatches}</p>
                  <PlayingCards name={currCards[1]?.name} cardSuit={currCards[1]?.suit}></PlayingCards>
                  {currCardElems[1]}
                </div>
              </div>
            </section>
          </div>
        </div>
        <div className="button-container">
          <div className="wrapper">
            <section class="flex justify-center items-center content-center flex-col gap-3 text-base m-8">
              {dealButton}
              <div class="flex justify-center items-center content-center gap-3">
                {restartGameButton}
                {resetMatchButton}
              </div>
            </section>
          </div>
        </div>
      </div>
    );
  }
}