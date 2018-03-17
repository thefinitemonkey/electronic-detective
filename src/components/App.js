import React, { Component } from "react";
import Loader from "./Loader";
import Players from "./Players";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";

class App extends Component {
  state = { screen: "loading" };

  switchDisplay = screen => {
    this.setState({ screen });
  };

  render = () => {
    const screen = this.state.screen;
    let renderItem;

    switch (screen) {
      case "loading":
        renderItem = <Loader switchDisplay={this.switchDisplay} />;
        break;
      case "players":
        renderItem = <Players switchDisplay={this.switchDisplay} />;
        break;
      default:
        renderItem = null;
    }

    return (
      <div className="App">
        <MuiThemeProvider>{renderItem}</MuiThemeProvider>
      </div>
    );
  };
}

export default App;
