import React, { PureComponent } from "react";
import TextField from "material-ui/TextField";
import { connect } from "react-redux";
import { deepCopy } from "../utils/builder";
import { updatePlayerClues } from "../actions/index";
import OccupantField from "./OccupantField";
import AddressField from "./AddressField";

class Location extends PureComponent {
  updateAddress = (playerId, part, value) => {
    const newSheet = deepCopy(this.props.game.gameData.sheets[playerId]);
    newSheet.locations[this.props.locationId].address[part] = value;
    this.props.updatePlayerClues(playerId, newSheet);
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
    console.log("ping location update");
    const gameData = this.props.game.gameData;
    const setupData = this.props.game.setupData;
    const playerId = this.props.game.playerId;
    const location = gameData.sheets[playerId].locations[this.props.locationId];

    return (
      <div>
        <div>{this.props.locationId}</div>
        <div>{location.name}</div>
        <div>
          <table>
            <thead>
              <tr>
                <th>Men</th>
                <th>Women</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <OccupantField
                    fieldId={`${this.props.locationId}-men-0`}
                    locationId={this.props.locationId}
                    occupantIndex={0}
                  />
                </td>
                <td>
                  <OccupantField
                    fieldId={`${this.props.locationId}-women-2`}
                    locationId={this.props.locationId}
                    occupantIndex={2}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <OccupantField
                    fieldId={`${this.props.locationId}-men-1`}
                    locationId={this.props.locationId}
                    occupantIndex={1}
                  />
                </td>
                <td>
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
        <div>
          <div>Address</div>
          <div>
            <AddressField
              hint="Side of town"
              locationId={this.props.locationId}
              area={"side"}
              fieldId={`${this.props.locationdId}-side`}
            />
          </div>
          <div>
            <AddressField
              hint="Part of town"
              locationId={this.props.locationId}
              area={"town"}
              fieldId={`${this.props.locationdId}-town`}
            />
          </div>
        </div>
        <div>Weapon location</div>
        <div>
          <TextField
            hintText="Type"
            id={`${this.props.locationId}-weapon`}
            value={location.weapon || ""}
            onChange={e => this.updateWeapon(playerId, e.target.value)}
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
    updatePlayerClues: (playerId, sheet) =>
      dispatch(updatePlayerClues(playerId, sheet))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Location);
