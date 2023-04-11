import React from "react";
import { Card, CardMedia, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  card: {
    maxWidth: 200,
    margin: "auto",
    marginRight: "20px",
    marginLeft: "20px",
  },
  media: {
    width: 140,
    height: 210,
    backgroundSize: "contain",
  },
});

//PlayingCard is just a function component since there is no need to manage any state
const PlayingCard = (props) => {
  const { name, suit, index } = props;
  const classes = useStyles();
  const imageName = name.charAt(0);
  const imageSuit = suit.charAt(0);

  const myImage = require(`./playingcardimages/${imageName}${imageSuit}.png`);

  return (
    <Card className={classes.card}>
      <CardMedia
        className={classes.media}
        image={myImage}
        title={`${name} of ${suit}`}
      />
      <Typography variant="subtitle1">{`Player ${index + 1}`}</Typography>
    </Card>
  );
};

export default PlayingCard;

// <img src={myImage} width="80px" alt={`${name} of ${suit}`} />
//  <Card className={classes.card}>
//       <CardMedia
//         className={classes.media}
//         image={myImage}
//         title={`${name} of ${suit}`}
//       />
//     </Card>
