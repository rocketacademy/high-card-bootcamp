import React from "react";

class Scoreboard extends React.Component {
  render() {
    const { rounds, games, p1Score, p2Score } = this.props;

    return (
      <div className="scoreboard-ctn">
        <div className="player-scoreboard">
          <p className="p1-scoreboard">
            Player 1: <span className="accent">{p1Score}</span>
          </p>
          <p className="p2-scoreboard">
            Player 2: <span className="accent">{p2Score}</span>
          </p>
        </div>
        <div className="center-scoreboard">
          <p>
            Game: <span className="accent">{games}</span>
          </p>
          <p>
            Round: <span className="accent">{rounds}</span>
          </p>
        </div>
      </div>
    );
  }
}

export default Scoreboard;
