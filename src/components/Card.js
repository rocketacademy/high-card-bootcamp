import React from "react";
import Alert from 'react-bootstrap/Alert';

export default class Card extends React.Component {
  render() {
    let { name, suit, index } = this.props
    let variant

    if ((index+1) === 1 ) {
      variant = "success"
    } else {
      variant = "danger"
    }

    return (
      <div key={`${name}${suit}${index}`}>
        <Alert variant={variant}>Player {index+1} : {name} of {suit}</Alert>
      </div>
    );
  }
} 