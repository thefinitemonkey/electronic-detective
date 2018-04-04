import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { updateSuspectStatement } from "../../actions/index";
import StatementField from "../common/StatementField";
import { css } from "react-emotion";

class Statements extends PureComponent {
  render = () => {
    return (
      <div className={statementsList} >
        {this.props.suspects.map(suspect => 
          <StatementField key={suspect.id} suspect={suspect} />
        )}
      </div>
    );
  };
}

const statementsList = css`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
`

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
