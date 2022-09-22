import React from "react";

let imageArray = [];

export default class PlayingCards extends React.Component {
  constructor(props) {
    super(props);
    this.state = { cardImage1: "", cardImage2: "" };
  }
  // https://stackoverflow.com/questions/54059179/what-is-require-context
  importAll = (r) => {
    return r.keys().map();
  };

  componentWillMount() {
    imageArray = this.importAll(
      require.context("./images/", false, /\.(png|jpe?g|svg)$/)
    );
  }

  getCorrectImage = () => {
    if (this.props.currCards.length > 0) {
      let imageString1 = this.props.currCards[0].image;
      for (let i = 0; i < imageArray.length; i++) {
        if (imageArray[i].includes(imageString1)) {
          this.setState({ cardImage1: imageArray[i] });
        }
      }

      let imageString2 = this.props.currCards[1].image;
      for (let i = 0; i < imageArray.length; i++) {
        if (imageArray[i].includes(imageString2)) {
          this.setState({ cardImage2: imageArray[i] });
        }
      }
    } else {
      this.setState({ cardImage1: null, cardImage2: null });
    }
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.props.currCards !== prevProps.currCards) {
      this.getCorrectImage();
    }
  }

  render() {
    return (
      <div>
        <h1>Player 1:</h1>

        <img alt="" className="cards-png" src={this.state.cardImage1} />
        <h1>Player 2:</h1>
        <img alt="" className="cards-png" src={this.state.cardImage2} />
      </div>
    );
  }
}
