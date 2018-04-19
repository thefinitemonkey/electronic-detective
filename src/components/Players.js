import React, { PureComponent } from "react";
import { connect } from "react-redux";
import Button from "material-ui/Button";
import TextField from "material-ui/TextField";
import Select from "material-ui/Select";
import { InputLabel } from "material-ui/Input";
import { FormControl } from "material-ui/Form";
import {
  finalizeBuildGame,
  changeGameScreen,
  setGameDifficulty
} from "../actions/index";

import * as Builder from "../utils/builder";
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

    if (skip) return;

    this.setState({ fieldError: false });

    // Build the game state for the players
    const gameData = Builder.buildGame(
      this.props.game.setupData,
      this.state.players
    );
    console.log("gameData", gameData);
    this.props.finalizeBuildGame(gameData);
    this.props.changeGameScreen("gamestart");
  };

  handleDifficultyChange = (event, index, value) => {
    this.props.setGameDifficulty(event.target.value);
  };

  render = () => {
    return (
      <div className={container}>
        <div className={spacertop} />
        <div className={spacermid}>
          <h2 className={[h2, h2modified].join(" ")}>Set Difficulty</h2>
          <div>
            <FormControl>
              <InputLabel htmlFor="difficulty-select">Difficulty</InputLabel>
              <Select
                inputProps={{ name: "Difficulty", id: "difficulty-select" }}
                value={this.props.game.difficulty}
                onChange={this.handleDifficultyChange}
                native
              >
                <option value={3}>Easy</option>
                <option value={2}>Medium</option>
                <option value={1}>Hard</option>
              </Select>
            </FormControl>
          </div>
          <h2 className={[h2, h2modified].join(" ")}>Set Player(s)</h2>
          {this.state.players.map((name, player) => (
            <div key={player}>
              <TextField
                value={name}
                onChange={e => {
                  this.updateNameEntry(e.target.value, player);
                }}
                error={this.state.fieldError && name === ""}
                label="Player Name"
              />

              <Button
                variant="raised"
                onClick={() => {
                  this.removePlayer(player);
                }}
                disabled={this.state.players.length === 1}
                style={style}
              >
                -
              </Button>
            </div>
          ))}
          <div className={secondaryContainer}>
            <div>
              <Button
                variant="raised"
                disabled={this.state.players.length > 3}
                onClick={this.addPlayer}
                style={style}
              >
                +
              </Button>
            </div>
            <div className={startGameButton}>
              <Button variant="raised" color="primary" onClick={this.startGame} style={style}>
                Start Game
              </Button>
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
    finalizeBuildGame: gameData => dispatch(finalizeBuildGame(gameData)),
    changeGameScreen: screen => dispatch(changeGameScreen(screen)),
    setGameDifficulty: level => dispatch(setGameDifficulty(level))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Players);
