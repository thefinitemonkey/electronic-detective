import React, { PureComponent } from "react";
import { connect } from "react-redux";
import Facts from "./Facts";
import Location from "./Location";
import Statements from "./Statements";

class CaseSheet extends PureComponent {
  constructor(props) {
    super(props);
    this.props = props;

    const playerId = this.props.game.playerId;
    const locationKeys = Object.keys(
      this.props.game.gameData.sheets[playerId].locations
    );

    this.state = { playerId, locationKeys };
  }

  render = () => {
    const gameData = this.props.game.gameData;
    const setupData = this.props.game.setupData;
    const sheet = gameData.sheets[this.state.playerId];

    return (
      <div>
        {sheet.name}
        {`'s Case Sheet`}
        <div>
          {`The Facts`}
          <Facts />
        </div>
        <div>
          {`Who was where?`}
          {this.state.locationKeys.map(key => (
            <div key={key}>
              <Location locationId={key} />
            </div>
          ))}
        </div>
        <div>
          {`Suspect statements`}
          <Statements />
        </div>
      </div>
    );
  };
}

function mapStateToProps(game) {
  return { game };
}

export default connect(mapStateToProps)(CaseSheet);
