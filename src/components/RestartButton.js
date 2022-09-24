import * as React from "react";
import Button from "@mui/material/Button";


export function RestartButton({ gameRestarted }) {
  return (
    <div>
      <h3>Restart game?</h3>
      <Button
        size="large"
        variant="contained"
        color="error"
        onClick={gameRestarted}
      >
        RESTART
      </Button>
    </div>
  );
}
