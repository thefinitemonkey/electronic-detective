import React, { PureComponent } from "react";
import TextField from "material-ui/TextField";
import { connect } from "react-redux";
import { updateSuspectStatement } from "../../actions/index";
import StatementField from "./StatementField";

class Statements extends PureComponent {
  render = () => {
    const playerId = this.props.game.playerId;
    const sheet = this.props.game.gameData.sheets[playerId];
    const victim = this.props.game.gameData.sheets[playerId].victim;

    return (
      <div>
        {this.props.suspects.map(suspect => 
          <StatementField key={suspect.id} suspect={suspect} />
        )}
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
