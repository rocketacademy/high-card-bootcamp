import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import 'bootstrap/dist/css/bootstrap.min.css';

export function CardElems(props) {
    const currCardElems = Object.values(props).map((player) => (
        // Give each list element a unique key
        <div key={`${player.card.name}${player.card.suit}`}>
          {player.name}: {player.card.name} of {player.card.suit}
        </div> //add in {this.state.currCards.map(()) when i extract this out as a component
      ));



    const playerRow = (Array.from(props)).map((player) => //figure out what's wrong with props.map - try using keys to map
        <Col>{player.name}</Col>
    )
    const scoreRow = (Array.from(props)).map((player) => 
        <Col>{player.score}</Col>
    )

    return (
        <div>
        <Container>
            <Row>
                {playerRow}
            </Row>
            <Row>
                {scoreRow}
            </Row>
        </Container>
        </div>
    )
}