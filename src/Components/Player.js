import React from "react";
import { Typography, Grid } from "@mui/material";

class Player extends React.Component {
  render() {
    return (
      <Grid item xs={7} sm={4} md={3} lg={2}>
        <Typography
          variant="body1"
          key={`${this.props.name}${this.props.cards.suit}`}
        >
          {this.props.name}:{" "}
        </Typography>
        <img
          src={require(`../assets/${this.props.cards.rank}-${this.props.cards.suit}.png`)}
          alt={`${this.props.name}${this.props.cards.suit}`}
          height={"200px"}
        />
      </Grid>
    );
  }
}

export default Player;
