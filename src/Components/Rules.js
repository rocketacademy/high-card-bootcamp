import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";

class Rules extends React.Component {
  handleClose = () => {
    this.props.onClick();
  };

  render() {
    return (
      <div>
        <Dialog
          open={this.props.open}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            High Card Game Rules
          </DialogTitle>
          <DialogContent>
            <ul>
              <li>High Card is a turn-based game between 2 to 10 players.</li>
              <li>
                Each player will draw a card and the player with the highest
                rank card will win the game.
              </li>
              <li>
                The overall winner is the player that has won the most rounds
                when the deck runs out of cards.
              </li>
            </ul>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} autoFocus>
              Done
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default Rules;
