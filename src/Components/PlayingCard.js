import React from "react";

function importAll(r) {
  let images = {};
  r.keys().forEach((item, index) => {
    images[item.replace("./", "")] = r(item);
  });
  return images;
}
const images = importAll(require.context("../assets", false, /.png/));

const PlayingCard = (props) => {
  const { name, suit } = props;
  const cardName = name.toLowerCase();
  const cardSuit = suit.toLowerCase();
  const combo = `${cardName}_of_${cardSuit}.png`;
  console.log(combo);
  console.log(images);

  return (
    <div>
      <img src={images[combo]} alt={combo} height={150} width={100} />
      <br />
    </div>
  );
};
export default PlayingCard;
