import React from "react";
import "./App.css";
import { makeShuffledDeck } from "./utils.js";

class App extends React.Component {
    constructor(props) {
        // Always call super with props in constructor to initialise parent class
        super(props);
        this.state = {
            // Set default value of card deck to new shuffled deck
            cardDeck: makeShuffledDeck(),
            // currCards holds the cards from the current round
            currCards: [],

            player1Score: 0,
            player2Score: 0,
            announcement: "",
        };
    }

    dealCards = () => {
        this.setState(
            (state) => ({
                // Remove last 2 cards from cardDeck
                cardDeck: state.cardDeck.slice(0, -2),
                // Deal last 2 cards to currCards
                currCards: state.cardDeck.slice(-2),
            }),
            () => this.getWinner()
        );
    };

    getWinner = () => {
        if (this.state.currCards.length > 0) {
            let player1Card = this.state.currCards[0];
            let player2Card = this.state.currCards[1];

            console.log(
                `Player1.rank: ${player1Card.rank}, player2rank: ${player2Card.rank}`
            );

            if (player1Card.rank > player2Card.rank) {
                console.log("I'm called");
                this.setState((prevState) => {
                    return {
                        ...prevState,
                        player1Score: prevState.player1Score + 1,
                        announcement: "Player 1 Won!",
                    };
                });
            } else if (player2Card.rank > player1Card.rank) {
                console.log("I'm called");
                this.setState((prevState) => {
                    return {
                        ...prevState,
                        player2Score: prevState.player2Score + 1,
                        announcement: "Player 2 Won!",
                    };
                });
                return "Player 2 Won!";
            } else {
                console.log("I'm called");
                this.setState((prevState) => {
                    return {
                        ...prevState,
                        announcement: "DRAW!!!",
                    };
                });
            }
        }
    };

    handleClick = () => {
        this.dealCards();
        // this.getWinner();
    };

    render() {
        const currCardElems = this.state.currCards.map(({ name, suit }) => (
            // Give each list element a unique key
            <div key={`${name}${suit}`}>
                {name} of {suit}
            </div>
        ));

        return (
            <div className="App">
                <header className="App-header">
                    <h3>High Card 🚀</h3>
                    {currCardElems}
                    <br />
                    <button onClick={this.handleClick}>Deal</button>
                    <h1>{this.state.announcement}</h1>
                    <h2>Player 1: {this.state.player1Score}</h2>
                    <h2>Player 2: {this.state.player2Score}</h2>
                </header>
            </div>
        );
    }
}

export default App;
