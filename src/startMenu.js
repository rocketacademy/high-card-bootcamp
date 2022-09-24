import React from "react";


class StartMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      numOfPlayers: 2,
      numOfGames: 1,
    };

    this.handleGames = this.handleGames.bind(this);
    this.handlePlayers = this.handlePlayers.bind(this);
  }

  sendDataToApp = () => {
    const data = {
      game: "Game",
      games: this.state.numOfGames,
      players: this.state.numOfPlayers,
    };
    this.props.receiveData(data);
  };

  handlePlayers(e) {
    this.setState({
      numOfPlayers: e.currentTarget.value,
    });
  }

  handleGames(e) {
    this.setState({
      numOfGames: e.currentTarget.value,
    });
  }

  render() {
    return (
      <div>
        <label for="Number of Players">
          Number of Players (between 1 and 6):
          <input
            type="number"
            min="2"
            max="6"
            value={this.state.numOfPlayers}
            onChange={this.handlePlayers}
          />
        </label>
        <br />
        <label for="Number of Players">
          Number of Games (between 1 and 6):
          <input
            type="number"
            min="1"
            max="6"
            value={this.state.numOfGames}
            onChange={this.handleGames}
          />
        </label>
        <br />
        <button onClick={this.sendDataToApp}>
          Start
        </button>
      </div>
    );
  }
}

export default StartMenu