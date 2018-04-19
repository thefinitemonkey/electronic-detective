import React, { PureComponent } from "react";
import { connect } from "react-redux";
import TextField from "material-ui/TextField";
import Button from "material-ui/Button";
import { h2, body } from "../../utils/globalcss";
import { accuseSuspect } from "../../actions/index";
import { css } from "react-emotion";

class Accusation extends PureComponent {
  state = { accusation: "" };

  handleAccusationChange = value => {
    // Limit entry to a valid number only
    const checkVal = parseInt(value, 10);
    if (
      (checkVal.toString() === value &&
        checkVal <= Object.keys(this.props.game.setupData.characters).length &&
        checkVal > 0) ||
      value === ""
    )
      this.setState({ accusation: value });
  };

  handleAccusation = () => {
    this.props.accuseSuspect(
      this.props.game.playerId,
      this.state.accusation,
      this.props.game.gameData.murderer
    );
  };

  render = () => {
    return (
      <div>
        <h2 className={h2}>Make an Accusation</h2>
        <div className={accusationArea}>
          <div className={accusationElement}>
            <span className={body}>I accuse</span>
          </div>
          <div className={accusationElement}>
            <TextField
              style={{ width: "50px" }}
              label={`#`}
              value={this.state.accusation}
              onChange={e => this.handleAccusationChange(e.target.value)}
            />
          </div>
          <div>
            <Button variant="raised"
              onClick={this.handleAccusation}
              disabled={this.state.accusation === ""}
            >Accuse</Button>
          </div>
        </div>
      </div>
    );
  };
}

const accusationArea = css`
  display: flex;
  align-items: baseline;
`;

const accusationElement = css`
    margin-right: 20px;
`

function mapStateToProps(game) {
  return { game };
}

function mapDispatchToProps(dispatch) {
  return {
    accuseSuspect: (playerId, suspectId, murdererId) =>
      dispatch(accuseSuspect(playerId, suspectId, murdererId))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Accusation);
