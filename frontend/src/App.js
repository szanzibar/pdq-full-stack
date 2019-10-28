import React, { Component } from "react";
import { Container, Typography } from "@material-ui/core";
import Necromance from "./components/necromance/Necromance";
import "./index.css";

class App extends Component {
  render() {
    return (
      <Container maxWidth="sm">
        <Typography className="main" variant="h4" align="center">
          Cabalistic Necromancer
        </Typography>
        <Necromance></Necromance>
      </Container>
    );
  }
}

export default App;
