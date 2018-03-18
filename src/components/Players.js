import React, { PureComponent } from "react";
import { connect } from "react-redux";
import RaisedButton from "material-ui/RaisedButton";
import TextField from "material-ui/TextField";
import { buildGame, changeGameScreen } from "../actions/index";

class Players extends PureComponent {
  state = {
    players: [""],
    addEnabled: true
  };

  addPlayer = () => {
    const players = this.state.players.slice(0);
    players.push("");

    this.setState({ players });
  };

  removePlayer = player => {
    const players = this.state.players.slice(0);
    players.splice(player, 1);

    this.setState({ players });
  };

  updateNameEntry = (name, player) => {
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

  render = () => {
    return (
      <div>
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
    changeGameScreen: screen => dispatch(changeGameScreen(screen))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Players);
