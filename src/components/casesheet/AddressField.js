import React, { PureComponent } from "react";
import TextField from "material-ui/TextField";
import { connect } from "react-redux";
import { updateLocationAddress } from "../../actions/index";

export class AddressField extends PureComponent {
  state = {
    address:
      this.props.game.gameData.sheets[this.props.game.playerId].locations[
        this.props.locationId
      ].address[this.props.area] || ""
  };

  updateState = value => {
    this.setState({ address: value });
  };

  updateAddress = (playerId, locationId, part, value) => {
    this.props.updateLocationAddress(playerId, locationId, part, value);
  };

  render = () => {
    //const gameData = this.props.game.gameData;
    //const setupData = this.props.game.setupData;
    const playerId = this.props.game.playerId;
    //const location = gameData.sheets[playerId].locations[this.props.locationId];
    return (
      <div>
        <TextField
          style={{ fontSize: "13px", width: "100%" }}
          label={this.props.hint}
          id={this.props.fieldId}
          value={this.state.address}
          onChange={e => this.updateState(e.target.value)}
          onBlur={e =>
            this.updateAddress(
              playerId,
              this.props.locationId,
              this.props.area,
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
    updateLocationAddress: (playerId, locationId, part, value) =>
      dispatch(updateLocationAddress(playerId, locationId, part, value))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AddressField);
