import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { css } from "react-emotion";
import { body } from "../../utils/globalcss";
import { createAlibi } from "../../actions/index";

class Alibi extends PureComponent {
  state = {
    alibi: this.props.game.gameData.alibis[this.props.suspectId] || []
  };

  componentDidMount = () => {
    if (!this.state.alibi.length) {
      // There isn't an alibi for this suspect yet, so dispatch to get one
      // and don't display an alibi yet
      this.props.createAlibi(
        this.props.playerId,
        this.props.suspectId,
        this.props.game.gameData,
        this.props.game.setupData,
        this.props.characterLocations
      );
    }
  };

  componentWillReceiveProps = props => {
    this.props = props;
    this.setState({
      alibi: this.props.game.gameData.alibis[this.props.suspectId]
    });
  };

  render = () => {
    return (
      <div>
        <ul className={[body, alibiList].join(" ")}>
          {this.state.alibi.map(info => <li key={info.id}>{info.fact}</li>)}
        </ul>
      </div>
    );
  };
}

const alibiList = css`
    padding-left: 15px;
    margin-top: 5px;
`

function mapStateToProps(game) {
  // Create a hash map of characterId:location pairs
  const locations = game.gameData.locations;
  const characterLocations = {};
  Object.keys(locations).forEach(lKey => {
    Object.keys(locations[lKey].occupants).forEach(cKey => {
      characterLocations[locations[lKey].occupants[cKey]] = lKey;
    });
  });

  return { game, characterLocations };
}

function mapDispatchToProps(dispatch) {
  return {
    createAlibi: (
      playerId,
      suspectId,
      gameData,
      setupData,
      characterLocations
    ) =>
      dispatch(
        createAlibi(
          playerId,
          suspectId,
          gameData,
          setupData,
          characterLocations
        )
      )
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Alibi);
