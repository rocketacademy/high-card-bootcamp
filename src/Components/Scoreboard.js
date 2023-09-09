import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import 'bootstrap/dist/css/bootstrap.min.css';

export function Scoreboard(props) {
    const playerRow = Object.values(props).map((player) => 
        <Col>{player.name}</Col>           
    )
    const scoreRow = Object.values(props).map((player) => 
        <Col>{player.score}</Col>
    )   

    return (
        <div>
        <Container>
            <Row>Scoreboard</Row>
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