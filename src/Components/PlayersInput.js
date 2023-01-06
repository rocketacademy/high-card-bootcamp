import React from "react";
import {
  Typography,
  Grid,
  Box,
  TextField,
  Button,
  ThemeProvider,
  createTheme,
} from "@mui/material";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    error: {
      main: "#FFCCCC",
      opacity: "1.0",
    },
  },
});

class PlayersInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValidity: true,
    };
  }

  isCorrectInput = (input) => {
    if (
      isNaN(input) ||
      input < 2 ||
      input > 10 ||
      input === "" ||
      input % 1 !== 0 ||
      input.includes(".")
    ) {
      this.setState({
        inputValidity: false,
      });
      return false;
    } else {
      this.setState({
        inputValidity: true,
      });
      return true;
    }
  };

  handleClick = (event) => {
    const input = event.target[0].value;
    event.preventDefault();

    if (this.isCorrectInput(input)) {
      this.props.onClick(input);
    } else {
      return null;
    }
  };

  render() {
    return (
      <Grid container justifyContent="center">
        <Grid item mb={2} xs={12}>
          <img
            src={require("../assets/poker-cards.png")}
            width="300"
            alt="stacked poker cards"
          />
          <Typography variant="h6">
            👋 Welcome to High Card!!
            <br />
            Enter number of players to start playing
          </Typography>
        </Grid>

        <Box
          component="form"
          sx={{
            "& > :not(style)": { m: 1, width: "25ch" },
          }}
          noValidate
          autoComplete="off"
          onSubmit={this.handleClick}
        >
          <Grid container justifyContent="center" alignItems="center">
            <Grid item xs={12} mb={1.5}>
              <ThemeProvider theme={darkTheme}>
                <TextField
                  id="standard-basic"
                  label="Number of Players"
                  variant="outlined"
                  color="warning"
                  required
                  error={!this.state.inputValidity}
                  helperText={
                    !this.state.inputValidity
                      ? "Please enter a whole number bigger than 2 and smaller than 10"
                      : null
                  }
                  onChange={(event) => this.isCorrectInput(event.target.value)}
                />{" "}
              </ThemeProvider>
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" color="warning" variant="contained">
                Submit
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Grid>
    );
  }
}

export default PlayersInput;
