import React from "react";
import { Paper, Typography, Grid } from "@mui/material";

class GameInfo extends React.Component {
  render() {
    const numOfRounds = Math.floor(52 / this.props.numOfPlayers);
    const balanceRounds = Math.floor(
      this.props.cardDeck.length / this.props.numOfPlayers
    );
    return (
      <Paper elevation={24} style={{ padding: "0.8rem" }}>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item alignItems="center">
            <Typography variant="body1">
              <b>Game:</b> {this.props.numOfGames}
            </Typography>
          </Grid>
          <Grid item alignItems="center">
            <Typography variant="body1">
              <b>Round:</b> {numOfRounds - balanceRounds} / {numOfRounds}
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    );
  }
}

export default GameInfo;
