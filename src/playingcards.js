import React from "react";

export default class PlayingCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Diamonds: "https://cdn-icons-png.flaticon.com/128/458/458518.png",
      Clubs: "https://cdn-icons-png.flaticon.com/128/220/220757.png",
      Hearts: "https://cdn-icons-png.flaticon.com/128/833/833472.png",
      Spades: "https://cdn-icons-png.flaticon.com/128/7408/7408604.png",
    };
  }
  render() {
    let { name, cardSuit } = this.props;
    let cardImg = this.state;

    // Render the card image.
    return (
      <div class="relative flex flex-col items-center justify-around w-40 h-56 border-2 rounded-lg bg-white border-slate-700 shadow-sm px-6">
        <img src={cardImg[cardSuit]} alt={cardSuit} class="w-6 h-6 self-start border-none"/>
        <p class="font-bold">{name}</p>
        <img src={cardImg[cardSuit]} alt={cardSuit} class="w-6 h-6 self-end border-none"/>
      </div>
    );
  }
}
