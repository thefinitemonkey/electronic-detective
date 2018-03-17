import React, { Component } from "react";
import { connect } from "react-redux";
import Loader from "./Loader";
import Players from "./Players";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import { AppBar } from "material-ui";

class App extends Component {
  componentWillReceiveProps = props => {
    console.log("app got props", props);
    this.props = props;
  }

  render = () => {
    const screen = this.props.game.screen;
    console.log("screen", screen);
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

function mapStateToProps(game) {
  console.log("game", game);
  return { game };
}

export default connect(mapStateToProps)(App);