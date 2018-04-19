import React, { PureComponent } from "react";
import Radio, { RadioGroup } from "material-ui/Radio";
import { FormControlLabel } from "material-ui/Form";
import { connect } from "react-redux";
import { deepCopy } from "../../utils/builder";
import { updatePlayerClues } from "../../actions/index";
import { css } from "react-emotion";
import { body, bodyStrong } from "../../utils/globalcss";

export class Facts extends PureComponent {
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
        <div className={[clueSection, victimInfo].join(" ")}>
          <div className={[body, victimInfoHeading].join(" ")}>
            <span className={bodyStrong}>{`Victim: `}</span>
            {setupData.characters[gameData.victim].name} (#{gameData.victim})
          </div>
          <div className={body}>
            <span className={bodyStrong}>{`Found At: `}</span>
            {setupData.locations[gameData.scene].name}
          </div>
        </div>
        <div className={body}>
          <div className={[clueSection, victimInfo].join(" ")}>
            <div
              className={[bodyStrong, radioHeading].join(" ")}
            >{`Sex of the murderer:`}</div>
            <div className={radioGroupDiv}>
              <RadioGroup
                style={rowStyle}
                className={[radioGroup, radioGroupCol, victimInfo].join(" ")}
                name="murdererSex"
                value={sheet.clueSelections.sex}
                onChange={e =>
                  this.updateClueSelection(["sex"], e.target.value)
                }
              >
                <FormControlLabel
                  control={<Radio />}
                  value="male"
                  label="Male"
                  className={radioButton}
                  style={{ maxWidth: "33%" }}
                />
                <FormControlLabel
                  control={<Radio />}
                  value="female"
                  label="Female"
                  className={[radioButton, radioButtonLastChild].join(" ")}
                  style={{ maxWidth: "33%" }}
                />
              </RadioGroup>
            </div>
          </div>
          <div>
            <div className={[clueSection, victimInfo].join(" ")}>
              <div className={[bodyStrong, radioHeading].join(" ")}>
                {`Where the murderer went:`}
              </div>
              <div className={radioGroupDiv}>
                <div>
                  <RadioGroup
                    style={rowStyle}
                    className={[radioGroup, radioGroupRow, victimInfo].join(
                      " "
                    )}
                    name="murdererSide"
                    value={sheet.clueSelections.hiding.side}
                    onChange={e =>
                      this.updateClueSelection(
                        ["hiding", "side"],
                        e.target.value
                      )
                    }
                  >
                    <FormControlLabel
                      control={<Radio />}
                      value="west"
                      label="West"
                      style={{ maxWidth: "33%" }}
                      className={radioButton}
                    />
                    <FormControlLabel
                      control={<Radio />}
                      value="east"
                      label="East"
                      style={{ maxWidth: "33%" }}
                      className={[radioButton, radioButtonLastChild].join(" ")}
                    />
                  </RadioGroup>
                </div>
                <div>
                  <RadioGroup
                    style={rowStyle}
                    className={[radioGroup, radioGroupRow, victimInfo].join(
                      " "
                    )}
                    name="murdererTown"
                    value={sheet.clueSelections.hiding.town}
                    onChange={e =>
                      this.updateClueSelection(
                        ["hiding", "town"],
                        e.target.value
                      )
                    }
                  >
                    <FormControlLabel
                      control={<Radio />}
                      value="uptown"
                      label="Uptown"
                      className={radioButton}
                      style={{ maxWidth: "33%" }}
                    />
                    <FormControlLabel
                      control={<Radio />}
                      value="midtown"
                      label="Midtown"
                      className={radioButton}
                      style={{ maxWidth: "33%" }}
                    />
                    <FormControlLabel
                      control={<Radio />}
                      value="downtown"
                      label="Downtown"
                      className={[radioButton, radioButtonLastChild].join(" ")}
                      style={{ maxWidth: "33%" }}
                    />
                  </RadioGroup>
                </div>{" "}
              </div>
            </div>
          </div>
          <div className={[clueSection, victimInfo].join(" ")}>
            <div className={[bodyStrong, radioHeading].join(" ")}>
              {`Weapon used in murder:`}
            </div>
            <div className={radioGroupDiv}>
              <RadioGroup
                style={rowStyle}
                className={[radioGroup, radioGroupRow, victimInfo].join(" ")}
                name="murdererWeapon"
                value={sheet.clueSelections.weapons.used}
                onChange={e =>
                  this.updateClueSelection(["weapons", "used"], e.target.value)
                }
              >
                <FormControlLabel
                  control={<Radio />}
                  value=".38"
                  label=".38"
                  className={radioButton}
                  style={{ maxWidth: "33%" }}
                />
                <FormControlLabel
                  control={<Radio />}
                  value=".45"
                  label=".45"
                  className={radioButton}
                  style={{ maxWidth: "33%" }}
                />
              </RadioGroup>

              <div className={victimInfo}>
                <div className={[fingerprintGroup, threeColumn].join(" ")}>
                  <RadioGroup
                    style={colStyle}
                    name="38Prints"
                    value={sheet.clueSelections.weapons[".38"].fingerprint}
                    onChange={e =>
                      this.updateClueSelection(
                        ["weapons", ".38", "fingerprint"],
                        e.target.value
                      )
                    }
                  >
                    <FormControlLabel
                      control={<Radio />}
                      value="odd"
                      label="Odd"
                    />
                    <FormControlLabel
                      control={<Radio />}
                      value="even"
                      label="Even"
                    />
                  </RadioGroup>
                </div>
                <div className={[fingerprintGroup, threeColumn].join(" ")}>
                  <RadioGroup
                    style={colStyle}
                    name="45Prints"
                    value={sheet.clueSelections.weapons[".45"].fingerprint}
                    onChange={e =>
                      this.updateClueSelection(
                        ["weapons", ".45", "fingerprint"],
                        e.target.value
                      )
                    }
                  >
                    <FormControlLabel
                      control={<Radio />}
                      value="odd"
                      label="Odd"
                    />
                    <FormControlLabel
                      control={<Radio />}
                      value="even"
                      label="Even"
                    />
                  </RadioGroup>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
}

const clueSection = css`
  margin-bottom: 15px;
`;

const victimInfo = css`
  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;
`;

const victimInfoHeading = css`
  margin-right: 15px;
`;

const radioHeading = css`
  flex: 0.3;
`;

const radioGroupDiv = css`
  flex: 0.6;
`;

const radioGroup = css`
  display: flex;
  flex: 1;
  justify-content: flex-start;
`;

const radioGroupRow = css`
  flex-direction: row;
`;

const rowStyle = {
  flexDirection: "row"
};

const colStyle = {
  flexDirection: "column"
};

const radioGroupCol = css`
  flex-direction: column;
`;

const radioButton = css`
  //margin-right: 20px;
  margin-bottom: 15px;
  flex: 1 1 auto;
`;

const radioButtonLastChild = css`
  margin-right: 0;
`;

const fingerprintGroup = css`
  flex: 1;
`;

const threeColumn = css`
  max-width: 33%;
  display: table;
`;

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
