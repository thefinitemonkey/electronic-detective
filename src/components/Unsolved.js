import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { h2, body, bodyStrong } from "../utils/globalcss";
import { changeGameScreen, resetGame } from "../actions/index";
import RaisedButton from "material-ui/RaisedButton";

class Unsolved extends PureComponent {
  state = { gameOver: null };

  componentDidMount = () => {
    // If there is only one active player then they made
    // a bad guess and the game is over. Otherwise they
    // will be removed and the game will continue
    if (Object.keys(this.props.game.gameData.sheets).length === 1) {
      this.setState({ gameOver: true });
      return;
    }
    this.setState({ gameOver: false });
  };

  handlePlayAgain = () => {
    this.props.resetGame();
  };

  handleContinueGame = () => {
    this.props.changeGameScreen("investigation");
  };

  render = () => {
    if (this.state.gameOver === null) return null;

    return (
      <div>
        {this.state.gameOver ? (
          <div>
            <h2 className={h2}>GAME OVER</h2>
            <div className={body}>
              The murderer got away with his crime and eliminated the
              invetigators along the way.
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
        ) : (
          <div>
            <h2 className={h2}>INCORRECT ACCUSATION</h2>
            <div className={body}>
              While you were looking at the wrong person, the Real Killer snuck
              up and took you out as well! You are no longer in the game.
            </div>
            <div>
              <RaisedButton
                primary={true}
                label={`${
                  this.props.game.gameData.sheets[this.props.game.playerId].name
                }'s Turn`}
                onClick={e => this.handleContinueGame()}
              />
            </div>
          </div>
        )}
      </div>
    );
  };
}

function mapStateToProps(game) {
  return { game };
}

function mapDispatchToProps(dispatch) {
  return {
    resetGame: () => dispatch(resetGame()),
    changeGameScreen: screen => dispatch(changeGameScreen(screen))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Unsolved);
