import React from "react";
import {makeShuffledDeck} from "./utils"

class Game extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      cardDeck: makeShuffledDeck(),
    }
  }

  
}

export default Game;