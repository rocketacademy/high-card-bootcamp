import React from "react";
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
      <Col>
        Player {this.props.id} 😾 <br />
        Current score: {this.props.roundScore}
        <br />
        Game score: {this.props.gameScore}
      </Col>
    );
  }
}
