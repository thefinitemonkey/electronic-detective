import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { h2, body, bodyStrong } from "../utils/globalcss";
import { resetGame } from "../actions/index";
import RaisedButton from "material-ui/RaisedButton";

class Solved extends PureComponent {
  handlePlayAgain = () => {
    this.props.resetGame();
  };

  render = () => {
    return (
      <div>
        <div>
          <h2 className={h2}>{`${this.props.game.gameData.sheets[this.props.game.playerId].name} WINS`}</h2>
          <div className={body}>
            The murderer was correctly identified through skillful investigation!
          </div>
          <div>
            <img
              src={`/images/characters/${
                this.props.game.setupData.characters[
                  this.props.game.gameData.murderer
                ].images.portrait
              }`}
              alt={"Murderer Profile"}
            />
          </div>
          <div className={bodyStrong}>
            {
              this.props.game.setupData.characters[
                this.props.game.gameData.murderer
              ].name
            }
          </div>
          <div>
            <RaisedButton
              primary={true}
              label="Play Again"
              onClick={e => this.handlePlayAgain()}
            />
          </div>
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
    resetGame: () => dispatch(resetGame())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Solved);
