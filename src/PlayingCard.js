import React from "react";
import { Card, CardMedia, Typography } from "@mui/material";
// import { makeStyles } from "@mui/material/styles";

// const useStyles = makeStyles({
//   card: {
//     marginBottom: "20px", // Add margin between different card users
//   },
//   image: {
//     height: "250px", // Change the height to reduce the size of the card image
//   },
// });

const DisplayCards = (props) => {
  const { name, suit, index } = props;
  // const classes = useStyles();

  return (
    <Card>
      <CardMedia
        height="250px"
        component="img"
        alt={`${name} of ${suit}`}
        image={require(`./playingcardimages/${name.charAt(0)}${suit.charAt(
          0
        )}.png`)}
      />
      <Typography>
        Player {index + 1} draws: <br />
        {name} of {suit}
      </Typography>
    </Card>
  );
};

export default DisplayCards;
// <div key={`${name}${suit}`}>
//   <img
//     src={require(`./playingcardimages/${name.charAt(0)}${suit.charAt(
//       0
//     )}.png`)}
//     alt={`${name} of ${suit}`}
//   />
//   Player {index + 1}: {name} of {suit}
// </div>;
