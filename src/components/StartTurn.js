import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { h2 } from "../utils/globalcss";
import Button from "material-ui/Button";
import { changeGameScreen } from "../actions/index";
import { css } from "react-emotion";

class StartTurn extends PureComponent {
  render = () => {
    return (
      <div className={horzContainer}>
        <div className={vertContainer}>
          <h2 className={h2}>{`${
            this.props.game.gameData.sheets[this.props.game.playerId].name
          }'s Turn`}</h2>
          <div className={nextTurnButton}>
            <Button variant="raised"
              onClick={e => this.props.changeGameScreen("investigation")}
            >Start Turn</Button>
          </div>
        </div>
      </div>
    );
  };
}

const horzContainer = css`
  display: flex;
  flex: 1;
  justify-content: center;
`;

const vertContainer = css`
  display: flex;
  flex-direction: column;
  max-width: 400px;
  justify-content: center;
  align-items: center;
`;

const nextTurnButton = css`
  margin-top: 25px;
`;

function mapStateToProps(game) {
  return { game };
}

function mapDispatchToProps(dispatch) {
  return {
    changeGameScreen: screen => dispatch(changeGameScreen(screen))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(StartTurn);
