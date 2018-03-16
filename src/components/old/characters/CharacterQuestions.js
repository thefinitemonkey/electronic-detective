// Character class for Electronic Detective


import React, { Component } from 'react';
import "../../css/characters/Questions.css";
import ErrorBoundary from "../ErrorBoundary";

class CharacterQuestions extends Component {

    constructor(props) {
        super(props);
        this.props = props;

        // Set up the clicked state of each of the questions
        let clickedState = [];
        if (this.props.clickedState) { clickedState = this.props.clickedState } else {
            for (let i = 0; i++; i < this.props.questions.length) {
                clickedState.push(false);
            }
        };

        // Set the allowed and asked number of questions
        const allowedNum = this.props.allowed ? this.props.allowed : 3;
        const askedNum = this.props.asked ? this.props.asked : 0;

        this.state = {
            clicked: clickedState,
            allowed: allowedNum,
            asked: askedNum
        };
    }


    handleQuestionClick = (e, data) => {
        // Don't let the standard browser click go anywhere
        e.preventDefault();

        // Increment the number of questions asked
        const newAsked = this.state.asked + 1;

        // Update the state of the clicked item to true
        const clickedState = this.state.clicked.slice(0);
        clickedState[data - 1] = true;
        this.setState({ clicked: clickedState, asked: newAsked });

        this.props.handleQuestionClick(data);
    }


    getQuestionRender = () => {
        if (this.props.interrogate && (this.state.asked < this.state.allowed)) {
            return (
                <div>
                    {this.props.questions && this.props.questions.map(question =>
                        <div className="Question" key={question.id}>
                            <a href={`question-link-${question.id}`} key={question.id}
                                className={this.state.clicked[question.id - 1] ?
                                    "Question-clicked" : "Question-unclicked"}
                                onClick={((e) => this.handleQuestionClick(e, question.id))}>
                                {question.question}
                            </a>
                        </div>
                    )}
                </div>
            )
        }

        return (
            <div>
                {this.props.questions && this.props.questions.map(question =>
                    <div className="Question" key={question.id}>
                        <span className={this.state.clicked[question.id - 1] ?
                            "Question-clicked" : "Question-unclicked"}>
                            {question.question}
                        </span>
                    </div>
                )}
            </div>
        )
    }


    render = () => {
        return (
            <div className="Questions">
                <ErrorBoundary>
                    {this.getQuestionRender()}
                </ErrorBoundary>
            </div>
        );
    }
}

export default CharacterQuestions;