import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
export class PlayingCards extends React.Component {
  mappingPlayerCards() {
    const displayCards = this.props.currCards.map(
      ({ name, suit, image }, index) => (
        <Col key={`${name}${suit}`}>
          <img
            className="cardImage"
            src={process.env.PUBLIC_URL + image}
            alt={`${name}${suit}`}
          />
        </Col>
      )
    );
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
