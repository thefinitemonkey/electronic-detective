import React, { PureComponent } from "react";
import TextField from "material-ui/TextField";
import { connect } from "react-redux";
import { deepCopy } from "../../utils/builder";
import { updatePlayerClues } from "../../actions/index";
import OccupantField from "./OccupantField";
import AddressField from "./AddressField";
import { css } from "react-emotion";
import {
  bodyStrong,
  bodyCondensed,
} from "../../utils/globalcss";

export class Location extends PureComponent {
  state = {
    weapon: this.props.game.gameData.sheets[this.props.game.playerId].locations[
      this.props.locationId
    ].weapon
  };

  updateState = weapon => {
    this.setState({ weapon });
  };

  updateWeapon = (playerId, value) => {
    const newSheet = deepCopy(this.props.game.gameData.sheets[playerId]);
    newSheet.locations[this.props.locationId].weapon = value;
    this.props.updatePlayerClues(playerId, newSheet);
  };

  componentWillReceiveProps = props => {
    this.props = props;
  };

  render = () => {
    const gameData = this.props.game.gameData;
    const playerId = this.props.game.playerId;
    const location = gameData.sheets[playerId].locations[this.props.locationId];

    return (
      <div className={relativePosition} >
        <div className={bodyStrong}>{this.props.locationId}</div>
        <div className={bodyCondensed}>{location.name}</div>
        <div>
          <table className={occupantTable}>
            <thead>
              <tr>
                <th className={bodyStrong}>Men</th>
                <th className={bodyStrong}>Women</th>
              </tr>
            </thead>
            <tbody>
              <tr className={occupantRow}>
                <td className={occupantCol}>
                  <OccupantField
                    fieldId={`${this.props.locationId}-men-0`}
                    locationId={this.props.locationId}
                    occupantIndex={0}
                  />
                </td>
                <td className={occupantCol}>
                  <OccupantField
                    fieldId={`${this.props.locationId}-women-2`}
                    locationId={this.props.locationId}
                    occupantIndex={2}
                  />
                </td>
              </tr>
              <tr className={occupantRow}>
                <td className={occupantCol}>
                  <OccupantField
                    fieldId={`${this.props.locationId}-men-1`}
                    locationId={this.props.locationId}
                    occupantIndex={1}
                  />
                </td>
                <td className={occupantCol}>
                  <OccupantField
                    fieldId={`${this.props.locationId}-women-3`}
                    locationId={this.props.locationId}
                    occupantIndex={3}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className={addressSection}>
          <div className={bodyStrong}>Address</div>
          <div>
            <AddressField
              hint="Side of town"
              locationId={this.props.locationId}
              area={"side"}
              fieldId={`${this.props.locationId}-side`}
            />
          </div>
          <div>
            <AddressField
              hint="Part of town"
              locationId={this.props.locationId}
              area={"town"}
              fieldId={`${this.props.locationId}-town`}
            />
          </div>
        </div>
        <div className={bodyStrong}>Weapon location</div>
        <div>
          <TextField
            style={{ fontSize: "13px", width: "100%" }}
            label="Type"
            id={`${this.props.locationId}-weapon`}
            value={this.state.weapon}
            onChange={e => this.updateState(e.target.value)}
            onBlur={e => this.updateWeapon(playerId, e.target.value)}
          />
        </div>
        {this.props.game.gameData.scene === this.props.locationId && (
          <div className={crimeScene} />
        )}
      </div>
    );
  };
}

const relativePosition = css`
  position: relative;
`

const crimeScene = css`
  background-image: url("./images/policetape.png");
  background-size: 100%;
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
`;

const occupantTable = css`
  border-spacing: 7px 0px;
  position: relative;
  left: -8px;
  margin-top: 10px;
  margin-bottom: 25px;
`;

const occupantRow = css`
  width: 100%;
`;

const occupantCol = css`
  width: 50%;
`;

const addressSection = css`
  margin-bottom: 25px;
`

function mapStateToProps(game) {
  return { game };
}

function mapDispatchToProps(dispatch) {
  return {
    updatePlayerClues: (playerId, sheet) =>
      dispatch(updatePlayerClues(playerId, sheet))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Location);
