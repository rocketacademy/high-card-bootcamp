import React from "react";
import "./App.css";
import DealCards from "./Components/DealCards";

class App extends React.Component {
  constructor(props) {
    // Always call super with props in constructor to initialise parent class
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h3>High Card 🚀</h3>
          <DealCards />
        </header>
      </div>
    );
  }
}

export default App;
