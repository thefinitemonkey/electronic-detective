import React, { PureComponent } from "react";
import { connect } from "react-redux";
import TextField from "material-ui/TextField";
import RaisedButton from "material-ui/RaisedButton";
import { h2, body } from "../../utils/globalcss";
import { accuseSuspect } from "../../actions/index";

class Accusation extends PureComponent {
  state = { accusation: "" };

  handleAccusationChange = value => {
    // Limit entry to a valid number only
    const checkVal = parseInt(value, 10);
    if (
      (checkVal.toString() === value &&
      checkVal <= Object.keys(this.props.game.setupData.characters).length &&
      checkVal > 0) || value === ""
    )
      this.setState({ accusation: value });
  };

  handleAccusation = () => {
    this.props.accuseSuspect(
      this.props.game.gameData.playerId,
      this.state.accusation,
      this.props.game.gameData.murderer
    );
  };

  render = () => {
    return (
      <div>
        <h2 className={h2}>Make an Accusation</h2>
        <div>
          <span className={body}>I accuse</span>
          <TextField
            hintText={`Suspect ID`}
            value={this.state.accusation}
            onChange={e => this.handleAccusationChange(e.target.value)}
          />
          <RaisedButton
            primary={true}
            label={`Accuse`}
            onClick={this.handleAccusation}
            disabled={this.state.accusation === ""}
          />
        </div>
      </div>
    );
  };
}

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
