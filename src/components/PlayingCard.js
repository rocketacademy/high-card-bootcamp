import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const images = importAll(
  require.context("../assets/", false, /\.(png|jpe?g|svg)$/)
);

// Helper function to import all images
function importAll(r) {
  let images = {};
  r.keys().forEach((key) => {
    images[key] = r(key);
  });
  return images;
}

export default class PlayingCard extends React.Component {
  render() {
    const { currCards } = this.props;
    const currCardElems = (
      <Row className="justify-content-md-center">
        {currCards.map(({ name, suit }, index) => (
          // Give each list element a unique key
          <Col key={`${name}${suit}`} md="auto">
            {index === 0 ? (
              <div>
                <p>Player 1:</p>
                <img src={images[`./${name}_of_${suit}.png`]} alt="" />
                <p>
                  {name} of {suit}
                </p>
              </div>
            ) : (
              <div>
                <p>Player 2:</p>
                <img src={images[`./${name}_of_${suit}.png`]} alt="" />
                <p>
                  {name} of {suit}
                </p>
              </div>
            )}
          </Col>
        ))}
      </Row>
    );

    return currCardElems;
  }
}
