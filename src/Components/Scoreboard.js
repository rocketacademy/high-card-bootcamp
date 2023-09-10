import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./Scoreboard.css";

export function Scoreboard(props) {
    const playerRow = Object.values(props).map((player) => 
        <Col className = 'playerRow'>{player.name}</Col>           
    )
    const roundScoreRow = Object.values(props).map((player) => 
        <Col className = 'roundScoreRow'>{player.roundScore}</Col>
    )  
    const gameScoreRow = Object.values(props).map((player) => 
        <Col className = 'gameScoreRow'>{player.gameScore}</Col>
    ) 

    return (
        <div>
        <Container className = 'Scoreboard'>
            <Row><Col>Scoreboard</Col></Row>
            <Row>
                <Col></Col>
                {playerRow}
            </Row>
            <Row>
                <Col>Score:</Col>
                {roundScoreRow}
            </Row>
            <Row>
                <Col>Games won:</Col>
                {gameScoreRow}
            </Row>
        </Container>
        </div>
    )
}