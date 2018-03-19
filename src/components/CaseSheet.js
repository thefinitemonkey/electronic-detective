import React, { PureComponent } from "react";
import RaisedButton from "material-ui/RaisedButton";
import TextField from "material-ui/TextField";
import { RadioButton, RadioButtonGroup } from "material-ui/RadioButton";
import { connect } from "react-redux";
import { deepCopy } from "../utils/builder";
import { updatePlayerClues } from "../actions/index";

class CaseSheet extends PureComponent {
  state = {
    playerId: this.props.game.playerId
  };

  componentWillReceiveProps = props => {
      this.props = props;
  }

  updateGenderSelection = selection => {
    const newSheet = deepCopy(
      this.props.game.gameData.sheets[this.props.game.playerId]
    );
    newSheet.clueSelections.sex = selection;
    this.props.updatePlayerClues(this.state.playerId, newSheet);
  };

  updateHidingSideSelection = selection => {
    const newSheet = deepCopy(
        this.props.game.gameData.sheets[this.props.game.playerId]
      );
      newSheet.clueSelections.hiding.side = selection;
      this.props.updatePlayerClues(this.state.playerId, newSheet);
  }

  updateHidingTownSelection = selection => {
    const newSheet = deepCopy(
        this.props.game.gameData.sheets[this.props.game.playerId]
      );
      newSheet.clueSelections.hiding.town = selection;
      this.props.updatePlayerClues(this.state.playerId, newSheet);
  }

  render = () => {
    const gameData = this.props.game.gameData;
    const setupData = this.props.game.setupData;
    const sheet = gameData.sheets[this.state.playerId];

    return (
      <div>
        {sheet.name}'s Case Sheet
        <div>
          The Facts
          <div>
            Victim: {setupData.characters[gameData.victim].name} (#{
              gameData.victim
            })
          </div>
          <div>Found At: {setupData.locations[gameData.scene].name}</div>
          <div>
            <div>
              Sex of the murderer:
              <div>
                <RadioButtonGroup
                  name="murdererSex"
                  valueSelected={sheet.clueSelections.sex}
                  onChange={e => this.updateGenderSelection(e.target.value)}
                  >
                  <RadioButton
                    value="male"
                    label="Male"
                  />
                  <RadioButton
                    value="female"
                    label="Female"
                  />
                </RadioButtonGroup>
              </div>
            </div>
            <div>
                Where the murderer went:
                <div>
                <RadioButtonGroup
                  name="murdererSide"
                  valueSelected={sheet.clueSelections.hiding.side}
                  onChange={e => this.updateHidingSideSelection(e.target.value)}
                  >
                  <RadioButton
                    value="west"
                    label="West"
                  />
                  <RadioButton
                    value="east"
                    label="East"
                  />
                </RadioButtonGroup>
                </div>
                <div>
                <RadioButtonGroup
                  name="murdererTown"
                  valueSelected={sheet.clueSelections.hiding.town}
                  onChange={e => this.updateHidingTownSelection(e.target.value)}
                  >
                  <RadioButton
                    value="uptown"
                    label="Uptown"
                  />
                  <RadioButton
                    value="midtown"
                    label="Midtown"
                  />
                  <RadioButton
                    value="downtown"
                    label="Downtown"
                  />
                </RadioButtonGroup>
                </div>
            </div>
          </div>
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
    updatePlayerClues: (playerId, sheet) =>
      dispatch(updatePlayerClues(playerId, sheet))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CaseSheet);
