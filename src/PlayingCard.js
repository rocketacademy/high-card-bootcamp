import React from "react";
import { Box, Text, Image } from "@chakra-ui/react";

const getSuitIcon = (suit) => {
  switch (suit) {
    case "hearts":
      return (
        <img
          src="https://cdn-icons-png.flaticon.com/128/833/833472.png"
          boxSize="24px"
          alt="Hearts"
        />
      );
    case "diamonds":
      return (
        <img
          src="https://cdn-icons-png.flaticon.com/128/458/458518.png"
          boxSize="24px"
          alt="Diamonds"
        />
      );
    case "spades":
      return (
        <img
          src="https://cdn-icons-png.flaticon.com/128/7408/7408604.png"
          boxSize="24px"
          alt="Spades"
        />
      );
    case "clubs":
      return (
        <img
          src="https://cdn-icons-png.flaticon.com/128/220/220757.png"
          boxSize="24px"
          alt="Clubs"
        />
      );
    default:
      return null;
  }
};

const PlayingCard = ({ suit, rank }) => {
  return (
    <Box
      bg="white"
      border="1px solid"
      borderColor="gray.300"
      borderRadius="lg"
      width="160px"
      height="220px"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      boxShadow="sm"
      position="relative"
    >
      <Text fontSize="2xl" fontWeight="bold">
        {rank}
      </Text>
      <Box position="absolute" top="10" left="10">
        {suit}
        {getSuitIcon(suit)}
      </Box>
      <Box position="absolute" bottom="10" right="10">
        {suit}
        {getSuitIcon(suit)}
      </Box>
    </Box>
  );
};

export default PlayingCard;
