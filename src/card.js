function imageCard(card) {
  let link = `../public/card/${card.name.toLowerCase()}_of_${card.suit.toLowerCase()}.svg`;
  return link;
}

export default imageCard;
