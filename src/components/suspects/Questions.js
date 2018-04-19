import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { css } from "react-emotion";
import { h3, body } from "../../utils/globalcss";
import { getQuestionResponse } from "./AnswerLogic";
import { updateTurnData } from "../../actions/index";

class Questions extends PureComponent {
  state = {
    questionsAnswered: this.props.game.turn.questionsAnswered,
    answerOrder: this.props.game.turn.answerOrder,
    questionsRemaining: this.props.questionsRemaining
  };

  handleQuestionClick = (e, index, question) => {
    e.preventDefault();
    if (this.state.questionsRemaining === 0) return;
    if (this.state.questionsAnswered[index]) return;

    // Get the answer to the question
    const objAnswer = getQuestionResponse(
      this.props.game,
      this.props.suspectId,
      question
    );
    // Bubble the click up to the parent
    this.props.handleQuestionClick();

    // Set the state with the new answer information
    const newAnswer = {};
    newAnswer[index] = objAnswer.answer;
    const newQuestionsAnswered = {
      ...this.state.questionsAnswered,
      ...newAnswer
    };
    const newOrder = this.state.answerOrder.slice(0);
    newOrder.push(index);
    this.setState({
      questionsAnswered: newQuestionsAnswered,
      questionsRemaining: this.state.questionsRemaining - 1,
      answerOrder: newOrder
    });
    this.props.updateTurnData({
      questionsAnswered: newQuestionsAnswered,
      answerOrder: newOrder
    });
  };

  render = () => {
    // Get the question data for the questions this character will answer
    const availableQuestions = this.props.game.setupData.characters[
      this.props.suspectId
    ].availableQuestions;
    const questions = [];
    availableQuestions.forEach(qId => {
      questions.push(this.props.game.setupData.questions[qId]);
    });

    return (
      <div className={twoColumn}>
        <div className={column}>
          <h3 className={[h3, statementHeader].join(" ")}>
            Available Questions
          </h3>

          {questions.map((question, index) => (
            <div key={index} className={questionDiv}>
              <a
                className={
                  this.state.questionsRemaining > 0
                    ? this.state.questionsAnswered[index]
                      ? [body, disabledQuestionLink].join(" ")
                      : [body, questionLink].join(" ")
                    : [body, disabledQuestionLink].join(" ")
                }
                href={`answer-question-${index}`}
                onClick={e => this.handleQuestionClick(e, index, question)}
              >{`${question.question}`}</a>
            </div>
          ))}
        </div>
        <div className={column}>
          <h3 className={[h3, statementHeader].join(" ")}>Answers</h3>

          {this.state.answerOrder.map(key => (
            <div key={key} className={questionDiv}>
              <span className={body}>{`${
                this.state.questionsAnswered[key]
              }`}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };
}

const twoColumn = css`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
`;

const column = css`
  flex: 1;
  min-width: 345px;
  margin-bottom: 20px;
`;

const questionLink = css`
  text-decoration: none;
  color: blue;
`;

const disabledQuestionLink = css`
  text-decoration: line-through;
  color: gray;
`;

const questionDiv = css`
  margin-bottom: 20px;
`;

const statementHeader = css`
  margin-top: 0;
`;

function mapStateToProps(game) {
  return { game };
}

function mapDispatchToProps(dispatch) {
  return {
    updateTurnData: data => dispatch(updateTurnData(data))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Questions);
