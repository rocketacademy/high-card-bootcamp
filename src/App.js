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
} from "@chakra-ui/react";
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
      gameWinner = "Player 1 Wins the Game!";
      this.setState({ gameScores: [...gameScores, 1] });
    } else if (player1Score < player2Score) {
      gameWinner = "Player 2 Wins the Game!";
      this.setState({ gameScores: [...gameScores, 2] });
    } else {
      gameWinner = "The Game is a Tie!";
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
      <Center minH="100vh" bg="gray.50">
        <Box padding="4" width="80%">
          <Flex justifyContent="center" alignItems="center" mb="2">
            <Image
              src="https://images.pexels.com/photos/1658747/pexels-photo-1658747.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              alt="Playing Card"
              w="30%"
            />
          </Flex>
          <Heading size="md" textAlign="center" mb="4">
            High Card 🚀
          </Heading>
          <Text mb="4">Cards left in deck: {numberOfCardsInDeck}</Text>

          {/* Player scores table */}
          <Table variant="simple" mb="4">
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
            </Tbody>
          </Table>

          {/* Messages */}
          {winnerMessage && (
            <Heading size="lg" textAlign="center" mb="4">
              {winnerMessage}
            </Heading>
          )}
          {gameWinner && (
            <Heading size="lg" textAlign="center" mb="4">
              {gameWinner}
            </Heading>
          )}

          {/* Cards */}
          <Flex justify="space-between" mb="4">
            <Box
              border="1px solid"
              borderColor="blue.300"
              p="4"
              flex="1"
              mr="2"
            >
              {/* Player 1's card */}
              <PlayingCard
                suit={currCards[0]?.suit}
                rank={currCards[0]?.name}
              />
            </Box>
            <Box
              border="1px solid"
              borderColor="green.300"
              p="4"
              flex="1"
              ml="2"
            >
              {/* Player 2's card */}
              <PlayingCard
                suit={currCards[1]?.suit}
                rank={currCards[1]?.name}
              />
            </Box>
          </Flex>

          {/* Buttons */}
          <Flex justify="center" spacing={4}>
            <Button
              onClick={this.dealCards}
              colorScheme="blue"
              size="md"
              mr="2"
              isDisabled={numberOfCardsInDeck === 0}
            >
              Deal
            </Button>
            <Button
              onClick={this.restartGame}
              colorScheme="teal"
              size="md"
              ml="2"
            >
              Restart Game
            </Button>
          </Flex>
        </Box>
      </Center>
    );
  }
}

export default App;
