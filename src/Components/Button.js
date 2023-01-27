import React from "react";
import { Button, Typography } from "@mui/material";

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
        <Typography variant="button">{this.props.text}</Typography>
      </Button>
    );
  }
}

export default ButtonCustom;
