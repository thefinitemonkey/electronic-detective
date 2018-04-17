import React, { PureComponent } from "react";
import TextField from "material-ui/TextField";
import { connect } from "react-redux";
import { updateSuspectStatement } from "../../actions/index";
import { css } from "react-emotion";
import { bodyCondensed } from "../../utils/globalcss";

class Statement extends PureComponent {
  state = {
    statement: this.props.game.gameData.sheets[this.props.game.playerId]
      .suspectStatements[this.props.suspect.id]
  };

  componentWillReceiveProps = props => {
    const newStatement =
      props.game.gameData.sheets[this.props.game.playerId].suspectStatements[
        this.props.suspect.id
      ];
    if (this.state.statement !== newStatement) {
      this.setState({ statement: newStatement });
    }
  };

  updateStateStatement = value => {
    this.setState({ statement: value });
  };

  updateSuspectStatement = (playerId, suspectId, value) => {
    this.props.updateSuspectStatement(playerId, suspectId, value);
  };

  renderStatementField = (disabled, hint, value, onChange) => {};

  render = () => {
    const playerId = this.props.game.playerId;
    const victim = this.props.game.gameData.sheets[playerId].victim;
    const suspect = this.props.suspect;

    return (
      <div className={statementItem}>
        <div key={`suspect-${suspect.id}`}>
          <div className={bodyCondensed}>{`${suspect.name} (#${
            suspect.id
          })`}</div>
          <div>
            <TextField
              style={{ fontSize: "13px", width: "100%" }}
              disabled={victim === suspect.id ? true : false}
              lbael={`${suspect.name}'s statement`}
              value={this.state.statement}
              onChange={e => this.updateStateStatement(e.target.value)}
              onBlur={e =>
                this.updateSuspectStatement(
                  playerId,
                  suspect.id,
                  e.target.value
                )
              }
            />
          </div>
        </div>
      </div>
    );
  };
}

const statementItem = css`
  flex: 1;
  min-width: 250px;
  max-width: 500px;
`;

function mapStateToProps(game) {
  return { game };
}

function mapDispatchToProps(dispatch) {
  return {
    updateSuspectStatement: (playerId, suspectId, statement) =>
      dispatch(updateSuspectStatement(playerId, suspectId, statement))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Statement);
