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
    this.handleSockets();
  }
  handleSockets = () => {
    const { endpoint } = this.state;
    const socket = socketIOClient(endpoint);
    socket.on("Ready", () => {
      this.setState({ buttonDisabled: false, loading: false, response: "" });
      console.log("Ready");
    });
    socket.on("Running", () => {
      this.setState({ buttonDisabled: true, loading: true });
      console.log("Running");
    });
    socket.on("ResultsFromAPI", data =>
      this.setState({ buttonDisabled: false, loading: false, response: data })
    );
    socket.on("disconnect", reason => {
      this.setState({
        buttonDisabled: true,
        response: `Disconnected from the server: ${reason}`
      });
    });
    socket.on("error", error => {
      this.setState({
        buttonDisabled: true,
        response: `Error communicating with server: ${error}`
      });
    });
    this.setState({ socket, response: `Connecting to server...` });
  };
  callAPI = () => {
    this.setState({ response: "" });
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
        // response is socket.io error/warning
        body = <Typography paragraph={true}>{response}</Typography>;
      } else if (response.error) {
        // response is error message from server
        body = <Typography paragraph={true}>{response.error}</Typography>;
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
