import React, { PureComponent } from "react";
import TextField from "material-ui/TextField";
import { connect } from "react-redux";
import { updateSuspectStatement } from "../actions/index";

class Statements extends PureComponent {
  constructor(props) {
    super(props);
    this.props = props;

    this.timeout = null;
    this.state = {
      currentEdit: null,
      statements: this.props.game.gameData.sheets[this.props.game.playerId]
        .suspectStatements
    };
  }

  updateSuspectStatement = (playerId, suspectId, value) => {
    //this.props.updateSuspectStatement(playerId, suspectId, value);
    const newStatements = {...this.state.statements};
    newStatements[suspectId] = value;
    this.setState({statements: newStatements});
  };

  renderStatementField = (disabled, hint, value, onChange) => {};

  render = () => {
    const playerId = this.props.game.playerId;
    const sheet = this.props.game.gameData.sheets[playerId];
    const victim = this.props.game.gameData.sheets[playerId].victim;

    return (
      <div>
        {this.props.suspects.map(suspect => {
            console.log("ping statement");
          return (
            <div key={`suspect-${suspect.id}`}>
              <div>{`${suspect.name} (#${suspect.id})`}</div>
              <div>
                <TextField
                  disabled={victim === suspect.id ? true : false}
                  hintText={`${suspect.name}'s statement`}
                  value={this.state.statements[suspect.id]}
                  onChange={e =>
                    this.updateSuspectStatement(
                      playerId,
                      suspect.id,
                      e.target.value
                    )
                  }
                />
              </div>
            </div>
          );
        })}
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
    updateSuspectStatement: (playerId, suspectId, statement) =>
      dispatch(updateSuspectStatement(playerId, suspectId, statement))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Statements);
