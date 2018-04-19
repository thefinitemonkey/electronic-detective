import React, { PureComponent } from "react";
import { connect } from "react-redux";
import Facts from "./Facts";
import Location from "./Location";
import Statements from "./Statements";
import { css } from "react-emotion";
import { h2, h3 } from "../../utils/globalcss";

export class CaseSheet extends PureComponent {
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
    const sheet = gameData.sheets[this.state.playerId];

    return (
      <div>
        <h2 className={h2}>
          {sheet.name}
          {`'s Case Sheet`}
        </h2>
        <div>
          <h3 className={h3}>{`The Facts`}</h3>
          <Facts />
        </div>
        <div>
          <h3 className={h3}>{`Who was where?`}</h3>
          <div className={locationList}>
            {this.state.locationKeys.map(key => (
              <div key={key} className={location}>
                <Location locationId={key} />
              </div>
            ))}
          </div>
        </div>
        <div>
          <h3 className={h3}>{`Suspect statements`}</h3>
          <Statements />
        </div>
      </div>
    );
  };
}

const locationList = css`
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
`;

const location = css`
  flex: 1;
  margin: 0 25px 50px 25px;
  max-width: 200px;
  min-width: 200px;
`;

function mapStateToProps(game) {
  return { game };
}

export default connect(mapStateToProps)(CaseSheet);
