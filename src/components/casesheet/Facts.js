import React, { PureComponent } from "react";
import RaisedButton from "material-ui/RaisedButton";
import { RadioButton, RadioButtonGroup } from "material-ui/RadioButton";
import { connect } from "react-redux";
import { deepCopy } from "../../utils/builder";
import { updatePlayerClues } from "../../actions/index";
import Location from "./Location";

class Facts extends PureComponent {
  constructor(props) {
    super(props);
    this.props = props;

    const playerId = this.props.game.playerId;
    const locationKeys = Object.keys(
      this.props.game.gameData.sheets[playerId].locations
    );

    this.state = { playerId, locationKeys };
  }

  componentWillReceiveProps = props => {
    this.props = props;
  };

  updateClueSelection = (keysPath, selection) => {
    // Update the selection data for the path specified in the clueSelections
    let newSheet = deepCopy(
      this.props.game.gameData.sheets[this.props.game.playerId]
    );
    let sheetKeyObj = newSheet.clueSelections;
    while (keysPath.length > 1) {
      sheetKeyObj = sheetKeyObj[keysPath[0]];
      keysPath.splice(0, 1);
    }
    sheetKeyObj[keysPath[0]] = selection;
    this.props.updatePlayerClues(this.state.playerId, newSheet);
  };

  render = () => {
    const gameData = this.props.game.gameData;
    const setupData = this.props.game.setupData;
    const sheet = gameData.sheets[this.state.playerId];

    return (
      <div>
        <div>
          {`Victim: `}
          {setupData.characters[gameData.victim].name} (#{gameData.victim})
        </div>
        <div>
          {`Found At: `}
          {setupData.locations[gameData.scene].name}
        </div>
        <div>
          <div>
            {`Sex of the murderer:`}
            <div>
              <RadioButtonGroup
                name="murdererSex"
                valueSelected={sheet.clueSelections.sex}
                onChange={e =>
                  this.updateClueSelection(["sex"], e.target.value)
                }
              >
                <RadioButton value="male" label="Male" />
                <RadioButton value="female" label="Female" />
              </RadioButtonGroup>
            </div>
          </div>
          <div>
            {`Where the murderer went:`}
            <div>
              <RadioButtonGroup
                name="murdererSide"
                valueSelected={sheet.clueSelections.hiding.side}
                onChange={e =>
                  this.updateClueSelection(["hiding", "side"], e.target.value)
                }
              >
                <RadioButton value="west" label="West" />
                <RadioButton value="east" label="East" />
              </RadioButtonGroup>
            </div>
            <div>
              <RadioButtonGroup
                name="murdererTown"
                valueSelected={sheet.clueSelections.hiding.town}
                onChange={e =>
                  this.updateClueSelection(["hiding", "town"], e.target.value)
                }
              >
                <RadioButton value="uptown" label="Uptown" />
                <RadioButton value="midtown" label="Midtown" />
                <RadioButton value="downtown" label="Downtown" />
              </RadioButtonGroup>
            </div>
          </div>
          <div>
            {`Weapon used in murder:`}
            <div>
              <RadioButtonGroup
                name="murdererWeapon"
                valueSelected={sheet.clueSelections.weapons.used}
                onChange={e =>
                  this.updateClueSelection(["weapons", "used"], e.target.value)
                }
              >
                <RadioButton value=".38" label=".38" />
                <RadioButton value=".45" label=".45" />
              </RadioButtonGroup>
            </div>
            <div>
              <RadioButtonGroup
                name="38Prints"
                valueSelected={sheet.clueSelections.weapons[".38"].fingerprint}
                onChange={e =>
                  this.updateClueSelection(
                    ["weapons", ".38", "fingerprint"],
                    e.target.value
                  )
                }
              >
                <RadioButton value="odd" label="Odd" />
                <RadioButton value="even" label="Even" />
              </RadioButtonGroup>
              <RadioButtonGroup
                name="45Prints"
                valueSelected={sheet.clueSelections.weapons[".45"].fingerprint}
                onChange={e =>
                  this.updateClueSelection(
                    ["weapons", ".45", "fingerprint"],
                    e.target.value
                  )
                }
              >
                <RadioButton value="odd" label="Odd" />
                <RadioButton value="even" label="Even" />
              </RadioButtonGroup>
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

export default connect(mapStateToProps, mapDispatchToProps)(Facts);
