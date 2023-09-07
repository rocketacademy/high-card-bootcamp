import React from "react";
import "./App.css";
import { makeShuffledDeck } from "./utils.js";
import {
  Box,
  Heading,
  Button,
  Flex,
  Center,
  Image,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Text,
  extendTheme,
  ChakraProvider,
  useColorModeValue,
} from "@chakra-ui/react";
import { theme } from "@chakra-ui/pro-theme";

import {
  boxStyle,
  headingCenterStyle,
  tableStyle,
  playerCardBoxStyle,
  opponentCardBoxStyle,
  buttonDealStyle,
  buttonRestartStyle,
  outcomeMessage,
} from "./theme.js";

import PlayingCard from "./PlayingCard.js";

class App extends React.Component {
  state = {
    cardDeck: makeShuffledDeck(),
    currCards: [],
    player1Score: 0,
    player2Score: 0,
    lastWinner: null,
    gameWinner: null,
    gameScores: [],
  };

  dealCards = () => {
    const { cardDeck } = this.state;

    if (cardDeck.length < 2) {
      console.log("Not enough cards in the deck.");
      // Do not directly call determineGameWinner here
      return;
    }

    const newCurrCards = [cardDeck.pop(), cardDeck.pop()];

    this.setState({ currCards: newCurrCards }, this.cardCompare);
  };

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
      gameWinner = "Player 1 Wins this Game. Play another round?";
      this.setState({ gameScores: [...gameScores, 1] });
    } else if (player1Score < player2Score) {
      gameWinner = "Player 2 Wins this Game. Play another round?";
      this.setState({ gameScores: [...gameScores, 2] });
    } else {
      gameWinner = "The Game is a Tie. Play another round?";
      this.setState({ gameScores: [...gameScores, "Tie"] });
    }

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
        return `Player 1 wins this round with the ${card1.name} of ${card1.suit}. `;
      case 2:
        return `Player 2 wins this round with the ${card2.name} of ${card2.suit}. `;
      case "Tie":
        return `Both ${card1.name} of ${card1.suit} and ${card2.name} of ${card2.suit} have the same rank. It's a Tie. `;
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

  render() {
    const { currCards, player1Score, player2Score, gameWinner, cardDeck } =
      this.state;
    const currCardElems = currCards.map(({ name, suit }) => (
      <div key={`${name}${suit}`}>
        {name} of {suit}
      </div>
    ));
    const winnerMessage = this.getWinnerMessage();
    const overallScores = this.getOverallScores();
    const numberOfCardsInDeck = cardDeck.length;

    return (
      <Center w="100vw" h="100vh" bgGradient="linear(to-r, #A8DADC, #ffffff)">
        <Box {...boxStyle}>
          <Heading {...headingCenterStyle}>High Card Game</Heading>

          {/* Player scores table */}
          <Table {...tableStyle}>
            <Thead>
              <Tr>
                <Th>Player</Th>
                <Th>Wins</Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td>Player 1</Td>
                <Td>{overallScores.player1Wins}</Td>
              </Tr>
              <Tr>
                <Td>Player 2</Td>
                <Td>{overallScores.player2Wins}</Td>
              </Tr>
              <Tr>
                <Td>Ties</Td>
                <Td>{overallScores.ties}</Td>
              </Tr>
              <Tr>
                <Td>Cards left in deck</Td>
                <Td>{numberOfCardsInDeck}</Td>
              </Tr>
            </Tbody>
          </Table>

          {/* Messages */}
          <Flex justify="center" mb="8">
            <Box {...outcomeMessage}>
              {
                <Heading size="sm" textAlign="center" mb="4">
                  {winnerMessage}
                  {gameWinner}
                </Heading>
              }
            </Box>
          </Flex>

          {/* Cards */}
          <Flex justify="space-between" mb="4">
            <Box {...playerCardBoxStyle}>
              {/* Player 1's card */}
              <PlayingCard
                suit={currCards[0]?.suit}
                rank={currCards[0]?.name}
              />
            </Box>
            <Box {...opponentCardBoxStyle}>
              {/* Player 2's card */}
              <PlayingCard
                suit={currCards[1]?.suit}
                rank={currCards[1]?.name}
              />
            </Box>
          </Flex>

          {/* Buttons */}
          <Flex justify="center" spacing={4}>
            <Button {...buttonDealStyle} onClick={this.dealCards}>
              Deal
            </Button>
            <Button {...buttonRestartStyle} onClick={this.restartGame}>
              Restart Game
            </Button>
          </Flex>
        </Box>
      </Center>
    );
  }
}

export default App;
