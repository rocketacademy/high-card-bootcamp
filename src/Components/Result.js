import React from "react";

class Result extends React.Component {
  render() {
    const { roundResults, gameResults, clickButton, buttonText } = this.props;
    return (
      <div className="bottom-ctn">
        <p>{roundResults}</p>
        <p>{gameResults}</p>
        <button className="deal-btn" onClick={clickButton}>
          {buttonText}
        </button>
      </div>
    );
  }
}

export default Result;
