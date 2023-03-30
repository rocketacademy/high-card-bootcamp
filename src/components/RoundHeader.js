import React, { Component } from "react";

class RoundHeader extends Component {
    render() {
        return (
            <h1
                style={{
                    padding: "1rem",
                    backgroundColor: "black",
                    borderRadius: "10px",
                    margin: "1rem 0",
                }}
            >
                Round {this.props.rounds}
            </h1>
        );
    }
}

export default RoundHeader;
