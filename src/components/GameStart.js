import React, { PureComponent } from "react";
import { connect } from "react-redux";
import RaisedButton from "material-ui/RaisedButton";
import { changeGameScreen, setPlayerTurn } from "../actions/index";

class GameStart extends PureComponent {
  componentWillReceiveProps = (props) => {
    this.props = props;
    if (props.game.playerId !== null) this.props.changeGameScreen("investigation");
  }

  setPlayerTurn = player => {
    this.props.setPlayerTurn(player);
  }

  render = () => {
    const setupData = this.props.game.setupData;
    const gameData = this.props.game.gameData;

    const victimId = gameData.victim;
    const victim = setupData.characters[victimId];
    const scene = setupData.locations[gameData.scene].name;
    const imgSource = `/images/characters/${victim.images.portrait}`;

    return (
      <div>
        <div>
          <img src={imgSource} alt={`Victim`} />
        </div>
        <div>
          {victim.name} (#{victimId}) was murdered at the {scene}!
        </div>
        <div>
          <RaisedButton
            label={`Start Investigation`}
            primary={true}
            onClick={() => this.setPlayerTurn(0)}
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
    changeGameScreen: screen => dispatch(changeGameScreen(screen)),
    setPlayerTurn: player => dispatch(setPlayerTurn(player))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(GameStart);
