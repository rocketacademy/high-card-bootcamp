import React from "react";
import { Paper, Typography, Grid } from "@mui/material";

class GameInfo extends React.Component {
  render() {
    return (
      <Paper elevation={24} style={{ padding: "0.75rem" }}>
        <Grid container justifyContent="space-between">
          <Typography variant="body1" display="inline-block">
            <b>Game:</b> {this.props.numOfGames}
          </Typography>
          <Typography variant="body1" display="inline-block">
            <b>Round:</b> {26 - this.props.cardDeck.length / 2}
            /26
          </Typography>
        </Grid>
      </Paper>
    );
  }
}

export default GameInfo;
