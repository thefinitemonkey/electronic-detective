import React, { PureComponent } from "react";
import TextField from "material-ui/TextField";
import { connect } from "react-redux";
import { updateLocationOccupant } from "../../actions/index";

class Location extends PureComponent {
  state = {
    occupant: this.props.game.gameData.sheets[this.props.game.playerId]
      .locations[this.props.locationId].occupants[this.props.occupantIndex]
  };

  updateState = value => {
    this.setState({ occupant: value });
  };

  updateOccupant = (playerId, locationId, index, value) => {
    this.props.updateLocationOccupant(playerId, locationId, index, value);
  };

  render = () => {
    //const gameData = this.props.game.gameData;
    //const setupData = this.props.game.setupData;
    const playerId = this.props.game.playerId;
    //const location = gameData.sheets[playerId].locations[this.props.locationId];

    return (
      <div>
        <TextField style={{width:"100%", maxWidth:"95px", fontSize:"13px"}}
          label="Suspect"
          id={this.props.fieldId}
          value={this.state.occupant}
          onChange={e => this.updateState(e.target.value)}
          onBlur={e =>
            this.updateOccupant(
              playerId,
              this.props.locationId,
              this.props.occupantIndex,
              e.target.value
            )
          }
        />
      </div>
    );
  };
}

function mapStateToProps(game) {
  return { game };
}

function mapDispatchToProps(dispatch) {
  return {
    updateLocationOccupant: (playerId, locationId, index, value) =>
      dispatch(updateLocationOccupant(playerId, locationId, index, value))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Location);
