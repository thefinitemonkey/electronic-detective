import React, { PureComponent } from "react";
import { connect } from "react-redux";
import RaisedButton from "material-ui/RaisedButton";
import TextField from "material-ui/TextField";
import SelectField from "material-ui/SelectField";
import MenuItem from "material-ui/MenuItem";
import { buildGame, changeGameScreen, setGameDifficulty } from "../actions/index";

class Players extends PureComponent {
  state = {
    players: [""],
    addEnabled: true
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

    // Build the game state for the players
    this.props.buildGame(this.props.game.setupData, this.state.players);
    this.props.changeGameScreen("gamestart");
  };

  handleDifficultyChange = (event, index, value) => {
    this.props.setGameDifficulty(value);
  }

  render = () => {
    return (
      <div>
        <div>
          <SelectField floatingLabelText="Difficulty" value={this.props.game.difficulty} onChange={this.handleDifficultyChange}>
            <MenuItem value={3} primaryText="Easy" />
            <MenuItem value={2} primaryText="Medium" />
            <MenuItem value={1} primaryText="Hard" />
          </SelectField>
        </div>
        {this.state.players.map((name, player) => (
          <div key={player}>
            <TextField
              value={name}
              onChange={e => {
                this.updateNameEntry(e.target.value, player);
              }}
              hintText="Player Name"
            />
            {player > 0 ? (
              <RaisedButton
                onClick={() => {
                  this.removePlayer(player);
                }}
                label="-"
                style={style}
              />
            ) : null}
          </div>
        ))}
        <div>
          <RaisedButton
            disabled={this.state.players.length > 3}
            onClick={this.addPlayer}
            label="+"
            style={style}
          />
        </div>
        <div>
          <RaisedButton
            onClick={this.startGame}
            label="Start Game"
            style={style}
            primary={true}
          />
        </div>
      </div>
    );
  };
}

const style = { margin: 12 };

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
