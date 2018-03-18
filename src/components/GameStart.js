import React, { PureComponent } from "react";
import { connect } from "react-redux";
import RaisedButton from "material-ui/RaisedButton";
import { changeGameScreen } from "../actions/index";

class GameStart extends PureComponent {
  render = () => {
    const victimId = this.props.game.gameData.victim;
    const victim = this.props.game.setupData.characters[victimId];
    const scene = this.props.game.setupData.locations[
      this.props.game.gameData.scene
    ].name;
    const imgSource = `/images/characters/${victim.images.portrait}`;

    return (
      <div>
        <div>
          <img src={imgSource} />
        </div>
        <div>
          {victim.name} (#{victimId}) was murdered at the {scene}!
        </div>
        <div>
          <RaisedButton
            label={`Start ${this.props.game.gameData.sheets[0].name}'s turn`}
            primary={true}
          />
        </div>
      </div>
    );
  };
}

const style = { margin: 12 };

function mapStateToProps(game) {
  return { game };
}

function mapDispatchToProps(dispatch) {
  return {
    changeGameScreen: screen => dispatch(changeGameScreen(screen))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(GameStart);
