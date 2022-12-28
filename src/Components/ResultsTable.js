import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

class ResultsTable extends React.Component {
  displayCurrentResults = (playerIndex) => {
    let currentResults = 0;
    currentResults = this.props.players[playerIndex].score.reduce(
      (accValue, currValue) => accValue + currValue,
      0
    );
    return currentResults;
  };

  displayPastResults = (gameIndex, playerIndex) => {
    let totalScore = 0;

    totalScore = this.props.players[playerIndex].prevScore[gameIndex].reduce(
      (accValue, currValue) => accValue + currValue,
      0
    );

    return totalScore;
  };

  render() {
    const gameNum = [];
    for (let i = 2; i <= this.props.numOfGames; i += 1) {
      gameNum.push(i - 1);
    }

    return (
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              {this.props.players.map((player, index) => {
                return (
                  <TableCell key={`${player}_${index}`}>
                    {player.name}
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>Current Game</TableCell>
              {this.props.players.map((player, playerIndex) => {
                return (
                  <TableCell key={`${player}_${playerIndex}`}>
                    {this.displayCurrentResults(playerIndex)}
                  </TableCell>
                );
              })}
            </TableRow>
            {gameNum.length <= 0
              ? null
              : gameNum.map((eachGame, gameIndex) => {
                  return (
                    <TableRow key={eachGame}>
                      <TableCell key={eachGame}>Game {eachGame}</TableCell>
                      {this.props.players[0].prevScore.length === 0
                        ? null
                        : this.props.players.map((player, playerIndex) => {
                            return (
                              <TableCell key={`${player}_${playerIndex}`}>
                                {this.displayPastResults(
                                  gameIndex,
                                  playerIndex
                                )}
                              </TableCell>
                            );
                          })}
                    </TableRow>
                  );
                })}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }
}

export default ResultsTable;
