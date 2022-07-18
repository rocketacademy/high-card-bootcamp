import React from "react";
import "./App.css";
import {makeShuffledDeck} from "./utils.js";

let imageArray = [];

export default class PlayingCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = { cardImage1: "", cardImage2: "" };
  }

  importAll = (r) => {
    return r.keys().map(r);
  };
  componentWillMount() {
    imageArray = this.importAll(
      require.context("./cards/", false, /\.(png|jpe?g|svg)$/)
    );
  }

  getCorrectImage = () => {
    if (this.props.currCard.length > 0) {
      console.log("getting card", this.props.currCard)
      let string1 = this.props.currCard[0].image;
      for (let i = 0; i < imageArray.length; i++) {
        if (imageArray[i].includes(string1)) {
          this.setState({ cardImage1: imageArray[i] });
        }
      }
      let string2 = this.props.currCard[1].image;
      for (let i = 0; i < imageArray.length; i++) {
        if (imageArray[i].includes(string2)) {
          this.setState({ cardImage2: imageArray[i] });
        }
      }
    } else {
      this.setState({ cardImage1: null, cardImage2: null });
    }
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.props.currCard !== prevProps.currCard) {
      this.getCorrectImage();
    }
  }
  render() {
    return (
      <div>
        {console.log("card render")}<span>
        <h1>Player1:</h1>
        <img alt="" className="cards-png" src={this.state.cardImage1} />
        <h1>Player2:</h1>
        <img alt="" className="cards-png" src={this.state.cardImage2} /></span>
      </div>
    );
  }
}