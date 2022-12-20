import React from "react";

class Player extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    // const currCardElems = this.props.cards.map(({ name, suit }) => (
    //   // Give each list element a unique key
    //   <div key={`${name}${suit}`}>
    //     {this.props.name} drew {name} of {suit}
    //   </div>
    // ));

    return (
      <div>
        {this.props.cards.map(({ name, suit }) => (
          // Give each list element a unique key
          <div key={`${name}${suit}`}>
            {this.props.name}: {name} of {suit}
          </div>
        ))}
      </div>
    );

    // <div>{currCardElems}</div>;
  }
}

export default Player;
