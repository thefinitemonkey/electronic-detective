import React, { PureComponent } from "react";
import { connect } from "react-redux";
import RaisedButton from "material-ui/RaisedButton";
import TextField from "material-ui/TextField";
import SelectField from "material-ui/SelectField";
import MenuItem from "material-ui/MenuItem";
import {
  buildGame,
  changeGameScreen,
  setGameDifficulty
} from "../actions/index";
import { css } from "react-emotion";
import { h2 } from "../utils/globalcss";

class Players extends PureComponent {
  state = {
    players: [""],
    addEnabled: true,
    fieldError: false
  };

  addPlayer = () => {
    // Add a new player with an empty name to the list
    const players = this.state.players.slice(0);
    players.push("");

    this.setState({ players });
  };

  removePlayer = player => {
    // Remove the specified player index from the array
    const players = this.state.players.slice(0);
    players.splice(player, 1);

    this.setState({ players });
  };

  updateNameEntry = (name, player) => {
    // Update the text at the specified player index
    // in the array
    const players = this.state.players.slice(0);
    players[player] = name;

    this.setState({ players });
  };

  startGame = () => {
    // If there are no players, then no game
    if (this.state.players.length === 0) return;
    let skip = false;
    this.state.players.forEach(player => {
      if (player === "" || player === undefined) {
        this.setState({ fieldError: true });
        skip = true;
      }
    });

    console.log("out of foreach");
    if (skip) return;

    this.setState({ fieldError: false });

    // Build the game state for the players
    this.props.buildGame(this.props.game.setupData, this.state.players);
    this.props.changeGameScreen("gamestart");
  };

  handleDifficultyChange = (event, index, value) => {
    this.props.setGameDifficulty(value);
  };

  render = () => {
    return (
      <div className={container}>
        <div className={spacertop} />
        <div className={spacermid}>
          <h2 className={[h2, h2modified].join(" ")}>Set Difficulty</h2>
          <div>
            <SelectField
              floatingLabelText="Difficulty"
              value={this.props.game.difficulty}
              onChange={this.handleDifficultyChange}
            >
              <MenuItem value={3} primaryText="Easy" />
              <MenuItem value={2} primaryText="Medium" />
              <MenuItem value={1} primaryText="Hard" />
            </SelectField>
          </div>
          <h2 className={[h2, h2modified].join(" ")}>Set Player(s)</h2>
          {this.state.players.map((name, player) => (
            <div key={player}>
              <TextField
                value={name}
                onChange={e => {
                  this.updateNameEntry(e.target.value, player);
                }}
                errorText={(this.state.fieldError && name==="") && "A name is required"}
                hintText="Player Name"
              />

              <RaisedButton
                onClick={() => {
                  this.removePlayer(player);
                }}
                disabled={this.state.players.length === 1}
                label="-"
                style={style}
              />
            </div>
          ))}
          <div className={secondaryContainer}>
            <div>
              <RaisedButton
                disabled={this.state.players.length > 3}
                onClick={this.addPlayer}
                label="+"
                style={style}
              />
            </div>
            <div className={startGameButton}>
              <RaisedButton
                onClick={this.startGame}
                label="Start Game"
                style={style}
                primary={true}
              />
            </div>
          </div>
        </div>
        <div className={spacerbottom} />
      </div>
    );
  };
}

const style = { margin: 12 };

const h2modified = css`
  margin-top: 32px;
  margin-bottom: 0px;
`;

const container = css`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 1;
  min-height: 600px;
`;

const secondaryContainer = css`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const startGameButton = css`
  margin-top: 25px;
`;

const spacertop = css`
  flex: 1;
`;

const spacermid = css`
  flex: 3;
`;

const spacerbottom = css`
  flex: 2;
`;

function mapStateToProps(game) {
  return { game };
}

function mapDispatchToProps(dispatch) {
  return {
    buildGame: (setupData, numPlayers) =>
      dispatch(buildGame(setupData, numPlayers)),
    changeGameScreen: screen => dispatch(changeGameScreen(screen)),
    setGameDifficulty: level => dispatch(setGameDifficulty(level))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Players);
