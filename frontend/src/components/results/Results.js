import React, { Component } from "react";
import { Typography } from "@material-ui/core";
import "../../index.css";

class Results extends Component {
  render() {
    let beer;

    if (this.props.currentBeer) {
      beer = (
        <Typography paragraph={true}>
          <strong>Current Beer: </strong>
          {this.props.currentBeer}
        </Typography>
      );
    }
    return (
      <div>
        <img className="imgStyle" src={this.props.img} alt={this.props.name} />
        <Typography paragraph={true} variant="h4">
          {this.props.name}
        </Typography>
        <div className="leftStyle">
          {beer}
          <Typography paragraph={true}>
            <strong>Current Thought: </strong>
            {this.props.currentThought}
          </Typography>
          <Typography paragraph={true}>
            <strong>Daydream: </strong>
          </Typography>
          <img className="imgStyle" src={this.props.daydream} alt="daydream" />
        </div>
      </div>
    );
  }
}

export default Results;
