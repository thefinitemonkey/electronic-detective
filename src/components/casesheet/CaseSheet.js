import React, { PureComponent } from "react";
import { connect } from "react-redux";
import Facts from "./Facts";
import Location from "./Location";
import Statements from "./Statements";
import {css} from "react-emotion";
import {h1, h2, h3} from "../../utils/globalcss";

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
        <h2 className={h2}>{sheet.name}
        {`'s Case Sheet`}</h2>
        <div>
          <h3 className={h3}>{`The Facts`}</h3>
          <Facts />
        </div>
        <div>
          <h3 className={h3}>{`Who was where?`}</h3>
          {this.state.locationKeys.map(key => (
            <div key={key}>
              <Location locationId={key} />
            </div>
          ))}
        </div>
        <div>
          <h3 className={h3}>{`Suspect statements`}</h3>
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
