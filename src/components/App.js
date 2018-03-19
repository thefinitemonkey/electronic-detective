import React, { PureComponent } from "react";
import { connect } from "react-redux";
import Loader from "./Loader";
import Players from "./Players";
import GameStart from "./GameStart";
import Interrogation from "./Interrogation";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";

class App extends PureComponent {
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
      case "interrogation":
        console.log("switching to interrogation");
        renderItem = <Interrogation />;
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
