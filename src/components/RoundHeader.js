import React, { Component } from "react";

class RoundHeader extends Component {
    render() {
        return (
            <h1 style={{ textDecoration: "underline" }}>
                Round {this.props.rounds}
            </h1>
        );
    }
}

export default RoundHeader;
