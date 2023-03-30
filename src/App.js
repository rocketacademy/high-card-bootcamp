import React from "react";
import "./App.css";
import { makeShuffledDeck } from "./utils.js";

import RoundHeader from "./components/RoundHeader";
import { Container } from "@mui/system";
import PlayingCard from "./components/PlayingCard";
import { Box, Paper } from "@mui/material";
import Scoreboard from "./components/Scoreboard";
import BasicButton from "./components/Button";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cardDeck: makeShuffledDeck(),
            currCards: [],

            player1Score: 0,
            player2Score: 0,
            announcement: "",
            noOfRounds: 0,
        };
    }

    dealCards = () => {
        this.setState(
            (state) => ({
                cardDeck: state.cardDeck.slice(0, -2),
                currCards: state.cardDeck.slice(-2),
            }),
            () => this.getRoundWinner()
        );
    };

    getRoundWinner = () => {
        if (this.state.currCards.length > 0) {
            let player1Card = this.state.currCards[0];
            let player2Card = this.state.currCards[1];

            console.log(
                `Player1.rank: ${player1Card.rank}, player2rank: ${player2Card.rank}`
            );

            if (player1Card.rank > player2Card.rank) {
                this.setState((prevState) => {
                    return {
                        ...prevState,
                        player1Score: prevState.player1Score + 1,
                        announcement: "Player 1 has won this round.",
                        noOfRounds: prevState.noOfRounds + 1,
                    };
                });
            } else if (player2Card.rank > player1Card.rank) {
                this.setState((prevState) => {
                    return {
                        ...prevState,
                        player2Score: prevState.player2Score + 1,
                        announcement: "Player 2 has won this round.",
                        noOfRounds: prevState.noOfRounds + 1,
                    };
                });
            } else {
                this.setState((prevState) => {
                    return {
                        ...prevState,
                        announcement: "This round is a draw.",
                        noOfRounds: prevState.noOfRounds + 1,
                    };
                });
            }
        }
    };

    handleClick = () => {
        this.dealCards();
    };

    restartGame = () => {
        this.setState({
            cardDeck: makeShuffledDeck(),
            currCards: [],

            player1Score: 0,
            player2Score: 0,
            announcement: null,
            noOfRounds: 0,
        });
    };

    render() {
        console.log(this.state.cardDeck);
        const currCardElems = this.state.currCards.map(({ name, suit }) => (
            <PlayingCard key={`${name}${suit}`} name={name} suit={suit} />
        ));

        let elemsOnScreen;
        if (this.state.cardDeck.length > 0) {
            elemsOnScreen = (
                <>
                    <BasicButton
                        onClickHandler={this.handleClick}
                        title="Deal"
                    />
                    <h1>{this.state.announcement}</h1>
                </>
            );
        } else {
            elemsOnScreen = (
                <>
                    {this.state.player1Score > this.state.player2Score ? (
                        <h1>
                            <span className="playername">Player 1</span> has won
                            the game.
                        </h1>
                    ) : this.state.player2Score > this.state.player1Score ? (
                        <h1>
                            <span className="playername">Player 2</span> has won
                            the game.
                        </h1>
                    ) : (
                        <h1>The game ended in a draw.</h1>
                    )}
                    <BasicButton
                        onClickHandler={this.restartGame}
                        title="Play Again"
                    />
                    <h1>Final Score:</h1>
                </>
            );
        }

        return (
            <div className="App">
                <Container>
                    <header className="App-header">
                        {this.state.noOfRounds !== 0 && (
                            <RoundHeader rounds={this.state.noOfRounds} />
                        )}
                        <Paper
                            elevation={10}
                            sx={{
                                padding: "2rem",
                                backgroundColor: "#8E6E27",
                                marginBottom: "1rem",
                            }}
                        >
                            <Paper
                                elevation={10}
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    gap: "2rem",
                                    width: "500px",
                                    height: "300px",
                                    padding: "1rem",
                                    backgroundColor: "#5C4512",
                                }}
                            >
                                {this.state.cardDeck.length === 52 && (
                                    <h1 className="highcard">High Card 🃏</h1>
                                )}
                                {currCardElems}
                            </Paper>
                        </Paper>

                        {elemsOnScreen}
                        {this.state.cardDeck.length === 52 && (
                            <h1>Press 'Deal' to begin.</h1>
                        )}
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                gap: "2rem",
                                marginTop: "1rem",
                            }}
                        >
                            <Scoreboard
                                player="Player 1"
                                score={this.state.player1Score}
                            />
                            <Scoreboard
                                player="Player 2"
                                score={this.state.player2Score}
                            />
                        </Box>
                    </header>
                </Container>
            </div>
        );
    }
}

export default App;
