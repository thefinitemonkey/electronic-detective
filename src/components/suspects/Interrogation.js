import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { css } from "react-emotion";
import { h2, h3, bodyStrong } from "../../utils/globalcss";
import Alibi from "./Alibi";
import Questions from "./Questions";

class Interrogation extends PureComponent {
  state = { questionsRemaining: 3 };

  handleQuestionClick = () => {
    this.setState({ questionsRemaining: this.state.questionsRemaining - 1 });
  };

  render = () => {
    const character = this.props.game.setupData.characters[
      this.props.suspectId
    ];

    return (
      <div>
        <h2 className={h2}>{`${this.state.questionsRemaining} Question${
          this.state.questionsRemaining > 1 ? `s` : ``
        } Left`}</h2>
        <div className={infoBlock}>
          <div>
            <div className={characterImages}>
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
            <div className={bodyStrong}>{character.name}</div>
          </div>
          <div>
            <h3 className={[h3, statementHeader].join(" ")}>
              Initial Statement
            </h3>
            <div>
              <Alibi suspectId={this.props.suspectId} />
            </div>
          </div>
        </div>
        <div>
          <h3 className={[h3, statementHeader].join(" ")}>
            Available Questions
          </h3>
          <div>
            <Questions
              suspectId={this.props.suspectId}
              handleQuestionClick={this.handleQuestionClick}
            />
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
  margin-right: 20px;
`;

const infoBlock = css`
  display: flex;
  flex-wrap: wrap;
`;

const statementHeader = css`
  margin-top: 0;
`;

function mapStateToProps(game) {
  return { game };
}

export default connect(mapStateToProps)(Interrogation);
