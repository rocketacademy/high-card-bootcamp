import React from "react";


class StartMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      numOfGames: 1,
    };

    this.handleGames = this.handleGames.bind(this);
  }

  sendDataToApp = () => {
    const data = {
      game: "Game",
      games: this.state.numOfGames,
    };
    this.props.receiveData(data);
  };

  handleGames(e) {
    this.setState({
      numOfGames: e.currentTarget.value,
    });
  }

  render() {
    return (
      <div>
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