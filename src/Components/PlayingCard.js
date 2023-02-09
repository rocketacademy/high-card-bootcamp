import React from "react";
import Card from "react-bootstrap/Card";

function importAll(r) {
  let images = {};
  r.keys().forEach((item, index) => {
    images[item.replace("./", "")] = r(item);
  });
  return images;
}

const images = importAll(require.context("../cats", true, /\.(png)$/));

export default class PlayingCard extends React.Component {
  render() {
    return (
      <div className={`playingCard ${this.props.suit}`}>
        <Card>
          <Card.Body>
            <div className="suite-rank">
              <Card.Title>{this.props.suit}</Card.Title>
              <Card.Text>{this.props.name}</Card.Text>
            </div>
            <Card.Img
              src={
                images[
                  `Cat${Math.ceil(
                    Math.random() * Object.keys(images).length
                  )}.png`
                ]
              }
            />
          </Card.Body>
        </Card>
      </div>
    );
  }
}
