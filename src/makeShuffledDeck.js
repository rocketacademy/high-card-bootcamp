// utils.js
function makeShuffledDeck() {
  const suits = ["Hearts", "Diamonds", "Clubs", "Spades"];
  const values = [
    { name: "Ace", value: 1 },
    { name: "2", value: 2 },
    { name: "3", value: 3 },
    { name: "4", value: 4 },
    { name: "5", value: 5 },
    { name: "6", value: 6 },
    { name: "7", value: 7 },
    { name: "8", value: 8 },
    { name: "9", value: 9 },
    { name: "10", value: 10 },
    { name: "Jack", value: 11 },
    { name: "Queen", value: 12 },
    { name: "King", value: 13 },
  ];

  const deck = [];
  for (const suit of suits) {
    for (const value of values) {
      deck.push({ name: value.name, suit, value: value.value });
    }
  }

  // Shuffle the deck (you can use a shuffle algorithm of your choice)
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }

  return deck;
}

export { makeShuffledDeck };
