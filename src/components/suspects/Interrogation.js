import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { css } from "react-emotion";
import { h2, h3 } from "../../utils/globalcss";
import Alibi from "./Alibi";
import Questions from "./Questions";
import StatementField from "../common/StatementField";
import { updateTurnData } from "../../actions/index";

class Interrogation extends PureComponent {
  state = { questionsRemaining: this.props.game.turn.questionsRemaining };

  handleQuestionClick = () => {
    // If we're out of questions then bubble up to display the end turn
    if (this.state.questionsRemaining - 1 === 0)
      this.props.handleEndTurnDisplay();

    this.setState({ questionsRemaining: this.state.questionsRemaining - 1 });
    this.props.updateTurnData({
      questionsRemaining: this.state.questionsRemaining - 1
    });
  };

  render = () => {
    const character = this.props.game.setupData.characters[
      this.props.suspectId
    ];
    const suspect = { ...character, id: this.props.suspectId };

    return (
      <div>
        <h2 className={h2}>{`${this.state.questionsRemaining} Question${
          this.state.questionsRemaining > 1
            ? `s`
            : this.state.questionsRemaining === 0
              ? `s`
              : ``
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
          </div>
          <div>
            <h3 className={[h3, statementHeader].join(" ")}>
              {character.name}
            </h3>
            <div>
              <Alibi suspectId={this.props.suspectId} />
            </div>
          </div>
        </div>
        <div>
          <div>
            <Questions
              suspectId={this.props.suspectId}
              handleQuestionClick={this.handleQuestionClick}
              questionsRemaining={this.state.questionsRemaining}
            />
          </div>
        </div>
        <div>
          <h3 className={h3}>Suspect Notes</h3>
          <StatementField suspect={suspect} />
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
  margin-bottom: 15px;
`;

const statementHeader = css`
  margin-top: 0;
  margin-bottom: 0;
`;

function mapStateToProps(game) {
  return { game };
}

function mapDispatchToProps(dispatch) {
  return {
    updateTurnData: data => dispatch(updateTurnData(data))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Interrogation);
