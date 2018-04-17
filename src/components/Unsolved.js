import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { h2, body, bodyStrong } from "../utils/globalcss";
import { changeGameScreen, resetGame } from "../actions/index";
import Button from "material-ui/Button";
import { css } from "react-emotion";

class Unsolved extends PureComponent {
  state = { gameOver: null };

  componentDidMount = () => {
    // If there is only one active player then they made
    // a bad guess and the game is over. Otherwise they
    // will be removed and the game will continue
    if (this.props.game.gameData.sheets.numPlayers === 0) {
      this.setState({ gameOver: true });
      return;
    }
    this.setState({ gameOver: false });
  };

  /*
  static getDerivedStateFromProps = (nextProps, prevState) => {
    if (nextProps.game.gameData.sheets.numPlayers === 0) {
      return { gameOver: true };
    }
    return { gameOver: false };
  }
  */

  handlePlayAgain = () => {
    this.props.resetGame();
  };

  handleContinueGame = () => {
    this.props.changeGameScreen("investigation");
  };

  render = () => {
    if (this.state.gameOver === null) return null;

    return (
      <div className={horzContainer}>
        {this.state.gameOver ? (
          <div className={vertContainer}>
            <h2 className={h2}>GAME OVER</h2>
            <div className={[body, trkText].join(" ")}>
              The Real Killer got away with his crime and bumped off the
              invetigators along the way.
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
              {`${
                this.props.game.setupData.characters[
                  this.props.game.gameData.murderer
                ].name
              } -- The Real Killer`}
            </div>
            <div className={playAgainButton}>
              <Button variant="raised" onClick={e => this.handlePlayAgain()}>
                Play Again
              </Button>
            </div>
          </div>
        ) : (
          <div className={vertContainer}>
            <h2 className={h2}>INCORRECT ACCUSATION</h2>
            <div className={[body, trkText].join(" ")}>
              While you were looking at the wrong person, the Real Killer snuck
              up and took you out as well! You are no longer in the game.
            </div>
            <div>
              <Button
                variant="raised"
                className={playAgainButton}
                onClick={e => this.handleContinueGame()}
              >{`${
                this.props.game.gameData.sheets[this.props.game.playerId].name
              }'s Turn`}</Button>
            </div>
          </div>
        )}
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
    resetGame: () => dispatch(resetGame()),
    changeGameScreen: screen => dispatch(changeGameScreen(screen))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Unsolved);
