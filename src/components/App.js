import React, { Component } from "react";
import { connect } from "react-redux";
import Loader from "./Loader";
import Players from "./Players";
import GameStart from "./GameStart";
import Investigation from "./Investigation";
import StartTurn from "./StartTurn";
import Unsolved from "./Unsolved";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";

class App extends Component {
  shouldComponentUpdate = props => {
    const shouldRender = props.game.screen !== this.props.game.screen;
    this.props = props;
    return shouldRender;
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
      case "startturn":
        renderItem = <StartTurn />;
        break;
      case "investigation":
        renderItem = <Investigation />;
        break;
      case "solved":
        renderItem = <Investigation />;
        break;
      case "unsolved":
        renderItem = <Unsolved />;
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
