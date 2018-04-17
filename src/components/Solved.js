import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { h2, body, bodyStrong } from "../utils/globalcss";
import { resetGame } from "../actions/index";
import Button from "material-ui/Button";
import { css } from "react-emotion";

class Solved extends PureComponent {
  handlePlayAgain = () => {
    this.props.resetGame();
  };

  render = () => {
    return (
      <div className={horzContainer}>
        <div className={vertContainer}>
          <h2 className={h2}>{`${
            this.props.game.gameData.sheets[this.props.game.playerId].name
          } WINS`}</h2>
          <div className={[body, trkText].join(" ")}>
            The murderer was correctly identified through skillful
            investigation!
          </div>
          <div className={trkPortrait}>
            <img
              src={`/images/characters/${
                this.props.game.setupData.characters[
                  this.props.game.gameData.murderer
                ].images.portrait
              }`}
              alt={"Murderer Profile"}
            />
          </div>
          <div className={[bodyStrong, trkName].join(" ")}>
            {
              this.props.game.setupData.characters[
                this.props.game.gameData.murderer
              ].name
            }
          </div>
          <div className={playAgainButton}>
            <Button variant="raised"
              onClick={e => this.handlePlayAgain()}
            >Play Again</Button>
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

const trkText = css`
  font-size: 16px;
`;

const trkName = css`
  font-size: 18px;
`;

const trkPortrait = css`
  margin-top: 20px;
  margin-bottom: 20px;
`;

const playAgainButton = css`
  margin-top: 25px;
`;

function mapStateToProps(game) {
  return { game };
}

function mapDispatchToProps(dispatch) {
  return {
    resetGame: () => dispatch(resetGame())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Solved);
