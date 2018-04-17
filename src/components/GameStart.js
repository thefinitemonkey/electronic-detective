import React, { PureComponent } from "react";
import { connect } from "react-redux";
import Button from "material-ui/Button";
import { changeGameScreen, setPlayerTurn } from "../actions/index";
import { css } from "react-emotion";
import { h2, body, bodyStrong } from "../utils/globalcss";

class GameStart extends PureComponent {
  componentWillReceiveProps = props => {
    this.props = props;
    if (props.game.playerId !== null)
      this.props.changeGameScreen("investigation");
  };

  setPlayerTurn = player => {
    this.props.setPlayerTurn(player);
  };

  render = () => {
    const setupData = this.props.game.setupData;
    const gameData = this.props.game.gameData;

    const victimId = gameData.victim;
    const victim = setupData.characters[victimId];
    const scene = setupData.locations[gameData.scene].name;
    const imgSource = `/images/characters/${victim.images.portrait}`;

    return (
      <div className={container}>
        <div className={spacertop} />
        <div className={[spacermid].join(" ")}>
          <h2 className={[h2, h2crime].join(" ")}>The Crime</h2>
          <div className={centeredcontainer}>
            <div>
              <img src={imgSource} alt={`Victim`} />
            </div>
            <div className={framecontainer}>
              <img
                src={`/images/funeral_frame.png`}
                alt={`Frame`}
                width={`300px`}
              />
            </div>
          </div>
          <div className={crimeTextArea}>
            <span className={[bodyStrong, crimeText].join(" ")}>
              {victim.name} (#{victimId})
            </span>{" "}
            <span className={[body, crimeText].join(" ")}>
              was murdered at the
            </span>{" "}
            <span className={[bodyStrong, crimeText].join(" ")}>{scene}</span>!
          </div>
          <div className={centeredcontainer}>
            <div className={startGameButton}>
              <Button variant="raised"
                onClick={() => this.setPlayerTurn(0)}
              >Start Investigation</Button>
            </div>
          </div>
        </div>
        <div className={spacerbottom} />
      </div>
    );
  };
}

const h2crime = css`
  margin-bottom: 55px;
`;

const container = css`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 1;
  min-height: 600px;
`;

/*
const rightcontainer = css`
  display: flex;
  justify-content: flex-end;
`;
*/

const centeredcontainer = css`
  display: flex;
  justify-content: center;
  position: relative;
`;

const framecontainer = css`
  position: absolute;
  left: -62px;
  top: -40px;
`;

const startGameButton = css`
  margin-top: 25px;
`;

const spacertop = css`
  flex: 1;
`;

const spacermid = css`
  flex: 3;
`;

const spacerbottom = css`
  flex: 2;
`;

const crimeTextArea = css`
  max-width: 205px;
  margin-top: 75px;
`;

const crimeText = css`
  margin-top: 15px;
  font-size: 16px;
`;

function mapStateToProps(game) {
  return { game };
}

function mapDispatchToProps(dispatch) {
  return {
    changeGameScreen: screen => dispatch(changeGameScreen(screen)),
    setPlayerTurn: player => dispatch(setPlayerTurn(player))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(GameStart);
