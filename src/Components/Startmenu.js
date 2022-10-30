import React from "react";

// Create a start button
// Input Username

export default class Startmenu extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e){
    const name = e.target.value;
    this.props.onChange(name);
  }

  // On submit click, update username and game mode
  // In turn updates the App Component
  
  handleGameModeChange = () => {
    const newGameMode = {
      game: "Game"
    }
    this.props.onClick(newGameMode)
  }

  render() {
    return (
      <div>
        <label>
          {" "}
          Username:
          <br />
          <input
            type="text"
            name="username"
            onChange={this.handleChange}
          />
        </label>
        <br/>
        <br/>
        <button style={{ fontSize: 25 }} onClick={this.handleGameModeChange}>Start Game</button>
      </div>
    );
  }
}
