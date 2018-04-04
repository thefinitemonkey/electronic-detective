import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { h1 } from "../utils/globalcss";
import RaisedButton from "material-ui/RaisedButton";
import { changeGameScreen } from "../actions/index";

class StartTurn extends PureComponent {
  render = () => {
    return (
      <div>
        <h1 className={h1}>{`${
          this.props.game.gameData.sheets[this.props.game.playerId]
            .name
        }'s Turn`}</h1>
        <div>
          <RaisedButton
            primary={true}
            label="Start Turn"
            onClick={e => this.props.changeGameScreen("interrogation")}
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
    changeGameScreen: screen => dispatch(changeGameScreen(screen))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(StartTurn);
