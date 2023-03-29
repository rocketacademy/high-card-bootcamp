// Get a random index ranging from 0 (inclusive) to max (exclusive).
const getRandomIndex = (max) => Math.floor(Math.random() * max);

// Shuffle an array of cards
const shuffleCards = (cards) => {
  // Loop over the card deck array once
  for (let currentIndex = 0; currentIndex < cards.length; currentIndex += 1) {
    // Select a random index in the deck
    const randomIndex = getRandomIndex(cards.length);
    // Select the card that corresponds to randomIndex
    const randomCard = cards[randomIndex];
    // Select the card that corresponds to currentIndex
    const currentCard = cards[currentIndex];
    // Swap positions of randomCard and currentCard in the deck
    cards[currentIndex] = randomCard;
    cards[randomIndex] = currentCard;
  }
  // Return the shuffled deck
  return cards;
};

const makeDeck = () => {
  const newDeck = [];
  const suits = ["Hearts", "Diamonds", "Clubs", "Spades"];
  const suitsEmoji = ["❤️", "♦️", "♣️", "♠️"];

  for (let suitIndex = 0; suitIndex < suits.length; suitIndex += 1) {
    const currentSuit = suits[suitIndex];
    const currentSuitEmoji = suitsEmoji[suitIndex];

    for (let rankCounter = 1; rankCounter <= 13; rankCounter += 1) {
      let cardName = `${rankCounter}`;
      let cardRank = rankCounter;

      if (cardName === "1") {
        cardName = "A";
        // Ace has higher rank than all other cards
        cardRank = 14;
      } else if (cardName === "11") {
        cardName = "J";
      } else if (cardName === "12") {
        cardName = "Q";
      } else if (cardName === "13") {
        cardName = "K";
      }

      const card = {
        name: cardName,
        suit: currentSuit,
        rank: cardRank,
        displayName: cardName + currentSuitEmoji,
      };

      newDeck.push(card);
    }
  }

  return newDeck;
};

export const makeShuffledDeck = () => shuffleCards(makeDeck());
