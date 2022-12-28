import React from "react";
import { Typography, Grid, Container } from "@mui/material";

class Player extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    // const currCardElems = this.props.cards.map(({ name, suit }) => (
    //   // Give each list element a unique key
    //   <div key={`${name}${suit}`}>
    //     {this.props.name} drew {name} of {suit}
    //   </div>
    // ));

    return (
      <Grid item xs={2}>
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
