import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { css } from "react-emotion";
import { h2, h3, body, bodyStrong, bodyCondensed } from "../../utils/globalcss";

class Interrogation extends PureComponent {
  state = { questionRemaining: 3 };

  render = () => {
      const character = this.props.game.setupData.characters[this.props.suspectId];

      return (
          <div>{character.name}</div>
      )
  }
}

function mapStateToProps(game) {
  return { game };
}

export default connect(mapStateToProps)(Interrogation);
