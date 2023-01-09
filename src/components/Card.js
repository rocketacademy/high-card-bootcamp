import React from "react";
import Image from 'react-bootstrap/Image'

export default class Card extends React.Component {
  render() {
    let { name, suit, image, index } = this.props

    return (
      <div key={`${name}${suit}${index}`}>
        Player {index+1} : {name} of {suit}
        <p>
          <Image src={require(`./asset/${image}`)} alt={image} width="125x"/>
        </p>
      </div>
    );
  }
} 