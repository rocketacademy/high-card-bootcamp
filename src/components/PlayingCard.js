import * as React from "react";
import Paper from "@mui/material/Paper";
import { Box, Typography } from "@mui/material";

export default function PlayingCard({ name, suit }) {
    let isCardRed = false;
    if (suit === "♦" || suit === "♥") isCardRed = true;
    console.log(isCardRed);

    return (
        <Paper sx={{ width: 150, height: 200 }} elevation={10}>
            <Box
                sx={{
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                {isCardRed ? (
                    <Typography
                        sx={{ color: "red" }}
                        variant="h3"
                        component="p"
                    >
                        {name}
                        {suit}
                    </Typography>
                ) : (
                    <Typography variant="h3" component="p">
                        {name}
                        {suit}
                    </Typography>
                )}
            </Box>
        </Paper>
    );
}
