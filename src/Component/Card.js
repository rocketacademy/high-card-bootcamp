import React from "react";
import { GiClubs, GiDiamonds, GiHearts, GiSpades } from "react-icons/gi";

// Create a mapping of suit names to their corresponding icons
const suitIcons = {
  Clubs: <GiClubs size={40} color="black" />,
  Diamonds: <GiDiamonds size={40} color="red" />,
  Hearts: <GiHearts size={40} color="red" />,
  Spades: <GiSpades size={40} color="black" />,
};

// functional component that accepts props as its argument
export default function Card({ card, playerIndex }) {
  return (
    <div className="card">
      <h3>Player {playerIndex + 1}</h3>
      <div>{card ? `${card.name} of ${card.suit}` : "No card dealt yet"}</div>
      <div>
        {card && suitIcons[card.suit]}{" "}
        {/* Displays the corresponding suit icon if a card is present */}
      </div>
    </div>
  );
}
