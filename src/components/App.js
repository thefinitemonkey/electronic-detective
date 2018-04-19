import React, { Component } from "react";
import { connect } from "react-redux";
import Loader from "./Loader";
import Players from "./Players";
import GameStart from "./GameStart";
import Investigation from "./Investigation";
import StartTurn from "./StartTurn";
import Unsolved from "./Unsolved";
import Solved from "./Solved";
import { h1, app, body } from "../utils/globalcss";
import { css } from "react-emotion";
import RulesDialog from "./RulesDialog";

class App extends Component {
  state = { dialogOpen: false };

  shouldComponentUpdate = (props, state) => {
    const shouldRender =
      props.game.screen !== this.props.game.screen ||
      state.dialogOpen !== this.state.dialogOpen;
    this.props = props;
    return shouldRender;
  };

  handleShowRules = e => {
    e.preventDefault();
    this.handleDialogOpen();
  };

  handleDialogOpen = () => {
    console.log("Handling dialog open");
    this.setState({ dialogOpen: true });
  };

  handleDialogClose = () => {
    this.setState({ dialogOpen: false });
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
        renderItem = <Solved />;
        break;
      case "unsolved":
        renderItem = <Unsolved />;
        break;
      default:
        renderItem = null;
    }

    return (
      <div className={app}>
        <div className={appHeader}>
          <div>
            <h1 className={h1}>Electronic Detective</h1>
          </div>
          <div>
            <a
              href="showRules"
              className={[body, rulesLink].join(" ")}
              onClick={e => this.handleShowRules(e)}
            >
              Show rules
            </a>
          </div>
        </div>
          <div>
            {renderItem}
            <RulesDialog
              dialogOpen={this.state.dialogOpen}
              handleDialogClose={this.handleDialogClose}
              handleDialogOpen={this.handleDialogOpen}
            />
          </div>
      </div>
    );
  };
}

const appHeader = css`
  display: flex;
  flex: 1;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: baseline;
`;

const rulesLink = css`
  color: blue;
  text-decoration: none;
`;

function mapStateToProps(game) {
  return { game };
}

export default connect(mapStateToProps)(App);
