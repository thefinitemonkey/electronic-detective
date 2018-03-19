import React, { PureComponent } from "react";
import TextField from "material-ui/TextField";
import RaisedButton from "material-ui/RaisedButton";
import { connect } from "react-redux";
import { deepCopy } from "../utils/builder";
import { updatePlayerClues } from "../actions/index";

class Location extends PureComponent {
  updateOccupant = (playerId, index, value) => {
    const newSheet = deepCopy(this.props.game.gameData.sheets[playerId]);
    newSheet.locations[this.props.locationId].occupants[index] = value;
    this.props.updatePlayerClues(playerId, newSheet);
  };

  componentWillReceiveProps = props => {
      this.props = props;
  }

  render = () => {
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
                  <TextField
                    id={`${this.props.locationId}-men-0`}
                    value={location.occupants[0]}
                    onChange={e =>
                      this.updateOccupant(playerId, 0, e.target.value)
                    }
                  />
                </td>
                <td>
                  <TextField
                    id={`${this.props.locationId}-women-2`}
                    value={location.occupants[2]}
                    onChange={e =>
                      this.updateOccupant(playerId, 2, e.target.value)
                    }
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <TextField
                    id={`${this.props.locationId}-men-1`}
                    value={location.occupants[1]}
                    onChange={e =>
                      this.updateOccupant(playerId, 1, e.target.value)
                    }
                  />
                </td>
                <td>
                  <TextField
                    id={`${this.props.locationId}-women-3`}
                    value={location.occupants[3]}
                    onChange={e =>
                      this.updateOccupant(playerId, 3, e.target.value)
                    }
                  />
                </td>
              </tr>
            </tbody>
          </table>
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
