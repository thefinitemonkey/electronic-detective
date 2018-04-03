import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { css } from "react-emotion";
import { body, bodyStrong, bodyCondensed } from "../../utils/globalcss";
import AnswerLogic from "./AnswerLogic";

class Questions extends PureComponent {
  state = {
    questionsAsked: [],
    questionsRemaining: this.props.questionsRemaining
  };

  handleQuestionClick = (e, index, question) => {
    e.preventDefault();
    
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
      <div>
        {questions.map((question, index) => (
          <div key={index} className={questionDiv}>
            <a className={[body, questionLink].join(" ")}
              href={`answer-question-${index}`}
              onClick={e =>
                this.handleQuestionClick(
                  e,
                  index,
                  question
                )
              }
            >{`${question.question}`}</a>
          </div>
        ))}
      </div>
    );
  };
}

const questionLink = css`
    text-decoration: none;
    color: blue;
`

const questionDiv = css`
    margin-bottom: 20px;
`

function mapStateToProps(game) {
  return { game };
}

export default connect(mapStateToProps)(Questions);
