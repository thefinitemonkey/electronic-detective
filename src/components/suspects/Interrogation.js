import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { css } from "react-emotion";
import { h2, h3, body, bodyStrong, bodyCondensed } from "../../utils/globalcss";

class Interrogation extends PureComponent {
  state = { questionsRemaining: 3 };

  render = () => {
    const character = this.props.game.setupData.characters[
      this.props.suspectId
    ];

    return (
      <div>
        <h2 className={h2}>{`${this.state.questionsRemaining} Question${
          this.state.questionsRemaining > 1 ? `s` : ``
        } Left`}</h2>
        <div>
          <div className={characterImages} >
            <div>
              <img
                className={characterImage}
                src={`./images/characters/${character.images.portrait}`}
                alt={`${character.name} portrait`}
              />
            </div>
            <div>
              <img
                className={characterImage}
                src={`./images/characters/${character.images.profile}`}
                alt={`${character.name} profile`}
              />
            </div>
          </div>
          <div className={bodyStrong} >
            {character.name}
          </div>
        </div>
      </div>
    );
  };
}

const characterImage = css`
  width: 100px;
  margin-right: 10px;
`;

const characterImages = css`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 5px;
`;

function mapStateToProps(game) {
  return { game };
}

export default connect(mapStateToProps)(Interrogation);
