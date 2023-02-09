import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export class Player extends React.Component {
  // updateScore = () => {
  //   if (this.props.won) {
  //     this.setState({
  //       currScore: this.state.currScore + 1,
  //     });
  //   }
  // };

  render() {
    return (
      <Row>
        <Col>Player {this.props.id} 😾</Col>
        <Col>Current score: {this.props.roundScore}</Col>
        <Col>Game score: {this.props.gameScore}</Col>
      </Row>
    );
  }
}
