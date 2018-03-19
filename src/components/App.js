import React, { Component } from "react";
import { connect } from "react-redux";
import Loader from "./Loader";
import Players from "./Players";
import GameStart from "./GameStart";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import { AppBar } from "material-ui";

class App extends Component {
  // update props
  componentWillReceiveProps = props => {
    this.props = props;
  };

  render = () => {
    const screen = this.props.game.screen;
    let renderItem;

    switch (screen) {
      case "loading":
        renderItem = <Loader />;
        break;
      case "players":
        renderItem = <Players />;
        break;
      case "gamestart":
        renderItem = <GameStart />;
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
  return { game };
}

export default connect(mapStateToProps)(App);
