import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { updateSuspectStatement } from "../../actions/index";
import StatementField from "../common/StatementField";
import { css } from "react-emotion";

export class Statements extends PureComponent {
  render = () => {
    return (
      <div className={statementsList}>
        {this.props.suspects.map(suspect => (
          <div key={suspect.id} className={statementItem}>
            <StatementField suspect={suspect} />
          </div>
        ))}
      </div>
    );
  };
}

const statementsList = css`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
`;

const statementItem = css`
  margin: 0px 25px 50px 25px;
`;

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
