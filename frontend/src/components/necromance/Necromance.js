import React, { Component } from "react";
import socketIOClient from "socket.io-client";
import { Button, CircularProgress, Typography } from "@material-ui/core";
import Results from "../results/Results";
import "../../index.css";

const endpoint = `${process.env.BACKEND || "http://localhost"}:${process.env
  .PORT || "3001"}`;

class Necromance extends Component {
  constructor() {
    super();
    this.state = {
      response: false,
      buttonDisabled: true,
      loading: false,
      endpoint,
      socket: false
    };
  }
  componentDidMount() {
    const { endpoint } = this.state;
    const socket = socketIOClient(endpoint);
    socket.on("Ready", () => {
      this.setState({ buttonDisabled: false, loading: false });
      console.log("Ready");
    });
    socket.on("Running", () => {
      this.setState({ buttonDisabled: true, loading: true });
      console.log("Running");
    });
    socket.on("ResultsFromAPI", data =>
      this.setState({ buttonDisabled: false, loading: false, response: data })
    );
    this.setState({ socket });
  }
  callAPI = () => {
    const { socket } = this.state;
    socket.emit("callAPI");
  };
  render() {
    const { response, loading, buttonDisabled } = this.state;
    let body;
    if (loading) {
      body = (
        <div>
          <CircularProgress />
        </div>
      );
    } else if (response) {
      if (typeof response == "string") {
        // response is error message
        body = <Typography paragraph={true}>{response}</Typography>;
      } else {
        body = <Results {...response}></Results>;
      }
    } else {
      body = <Typography paragraph={true}></Typography>;
    }

    return (
      <div className="main">
        <div className="buttonStyle">
          <Button
            disabled={buttonDisabled}
            variant="contained"
            size="large"
            onClick={this.callAPI}
          >
            Necrotize the Cabal
          </Button>
        </div>
        {body}
      </div>
    );
  }
}

export default Necromance;
