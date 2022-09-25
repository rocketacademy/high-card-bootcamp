import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { RANK_MAP, IMAGE_MAP } from "./constants";

export class PlayingCards extends React.Component {
  mappingPlayerCards() {
    const displayCards = this.props.currCards.map(
      ({ name, suit, image, rank }, index) => {
        const mappedSrcName = `${suit.toLowerCase()}${RANK_MAP[rank]}`;
        return (
          <Col key={`${name}${suit}`}>
            <img
              className="cardImage"
              src={IMAGE_MAP[mappedSrcName]}
              alt={`${name}${suit}`}
            />
          </Col>
        );
      }
    );

    console.log(displayCards);
    return displayCards;
  }

  render() {
    return (
      <Container>
        <Row>
          <Col>
            <h1>Player 1:</h1>
          </Col>
          <Col>
            <h1>Player 2:</h1>
          </Col>
        </Row>
        <Row>{this.mappingPlayerCards()}</Row>
      </Container>
    );
  }
}
