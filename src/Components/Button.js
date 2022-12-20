import React from "react";

class Button extends React.Component {
  constructor(props) {
    super(props);
  }

  handleClick = () => {
    this.props.action();
  };

  render() {
    return <button onClick={this.handleClick}>{this.props.text}</button>;
  }
}

export default Button;
