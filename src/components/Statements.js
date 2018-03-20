import React, { PureComponent } from "react";
import TextField from "material-ui/TextField";
import { connect } from "react-redux";
import { deepCopy } from "../utils/builder";
import { updatePlayerClues } from "../actions/index";

class Statements extends PureComponent {
  updatePlayerClues = (playerId, suspectId, value) => {
    const newSheet = deepCopy(this.props.game.gameData.sheets[playerId]);
    newSheet.suspectStatements[suspectId] = value;
    this.props.updatePlayerClues(playerId, newSheet);
  };

  render = () => {
    console.log("props", this.props);
    const playerId = this.props.game.playerId;
    const sheet = this.props.game.gameData.sheets[playerId];

    return (
      <div>
        {this.props.suspects.map(suspect => (
          <div key={`suspect-${suspect.id}`}>
            <div>{`${suspect.name} (#${suspect.id})`}</div>
            <div>
              <TextField
                hintText={`${suspect.name}'s statement`}
                value={sheet.suspectStatements[suspect.id] || ""}
                onChange={e =>
                  this.updatePlayerClues(playerId, suspect.id, e.target.value)
                }
              />
            </div>
          </div>
        ))}
      </div>
    );
  };
}

function mapStateToProps(game) {
  const setupData = game.setupData;
  const characters = setupData.characters;
  const keys = Object.keys(characters);
  const suspects = [];
  keys.forEach(key => {
    const suspect = { ...characters[key], id: key };
    suspects.push(suspect);
  });

  return { game, suspects };
}

function mapDispatchToProps(dispatch) {
  return {
    updatePlayerClues: (playerId, sheet) =>
      dispatch(updatePlayerClues(playerId, sheet))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Statements);
