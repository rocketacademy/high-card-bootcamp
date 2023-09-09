
//WORK IN PROGRESS

import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import 'bootstrap/dist/css/bootstrap.min.css';

export function CardElems(props) {
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