import React from "react";
import { Button } from "@mui/material";

class ButtonCustom extends React.Component {
  handleClick = () => {
    this.props.onClick();
  };

  render() {
    return (
      <Button
        variant="contained"
        color={this.props.color}
        size="large"
        onClick={this.handleClick}
      >
        {this.props.text}
      </Button>
    );
  }
}

export default ButtonCustom;
