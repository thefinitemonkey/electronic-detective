import React, { PureComponent } from "react";
import TextField from "material-ui/TextField";
import { connect } from "react-redux";
import { updateLocationOccupant } from "../actions/index";

class Location extends PureComponent {
  state = {
    address:
      this.props.area === "side"
        ? this.props.game.gameData.sheets[this.props.game.playerId].locations[
            this.props.locationId
          ].address.side
        : this.props.game.gameData.sheets[this.props.game.playerId].locations[
            this.props.locationId
          ].address.part
  };

  updateState = value => {
    this.setState({ occupant: value });
  };

  updateAddress = (playerId, locationId, part, value) => {
    this.props.updateLocationOccupant(playerId, locationId, part, value);
  };

  render = () => {
    //const gameData = this.props.game.gameData;
    //const setupData = this.props.game.setupData;
    const playerId = this.props.game.playerId;
    //const location = gameData.sheets[playerId].locations[this.props.locationId];

    return (
      <div>
        <TextField
          hintText={this.props.hint}
          id={this.props.fieldId}
          value={this.state.address}
          onChange={e => this.updateState(e.target.value)}
          onBlur={e => this.updateAddress(playerId, this.props.locationId, this.props.area, e.target.value)}
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
