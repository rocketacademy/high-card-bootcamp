import Paper from "@mui/material/Paper";
import { Box, Grid, Typography } from "@mui/material";

export default function Scoreboard({ score, player }) {
    let bgColor = "";
    let fontColor = "";
    if (player === "Player 1") {
        bgColor = "#18191A";
        fontColor = "white";
    } else {
        bgColor = "white";
        fontColor = "#18191A";
    }
    return (
        <Paper
            sx={{
                width: 200,
                height: 150,
                backgroundColor: bgColor,
                color: fontColor,
            }}
            elevation={10}
        >
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography
                        mt={2}
                        variant="h3"
                        component="p"
                        sx={{
                            fontSize: "1rem",
                            letterSpacing: "3px",
                            textTransform: "uppercase",
                        }}
                    >
                        {player}
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="h2" component="p">
                        {score}
                    </Typography>
                </Grid>
            </Grid>
        </Paper>
    );
}
