// Character class for Electronic Detective


import React, {Component} from 'react';
import "../../css/characters/Questions.css";

class CharacterQuestions extends Component {

    constructor(props) {
        super(props);
        this.props = props;

        const clickedState = [];
        for (let i = 0; i++; i < this.props.questions.length) {
            clickedState.push(false);
        }

        this.state = {
            clicked: clickedState,
            allowed: 3,
            asked: 0
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
        this.setState({clicked: clickedState, asked: newAsked});

        this.props.handleQuestionClick(data);
    }


    handleSuspectClick = (e, data) => {
        // Don't let the standard browser click go anywhere
        e.preventDefault();

        // New interrogation, so reset the question counter
        this.setState({asked: 0});

        // Update this character to be the interrogated suspect
        this.props.handleSuspectClick(data);
    }


    getQuestionRender = () => {
        if (this.props.selectedSuspect) {
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
                        {question.question}
                    </div>
                )}
            </div>
        )
    }


    getSelectRender = () => {
        if (this.props.selectedSuspect) return null;

        return (
            <div className="Questions-selectsuspect">
                <a href={`interrogate-link-${this.props.characterId}`} key={this.props.characterId}
                    onClick={((e) => this.handleSuspectClick(e, this.props.characterId))}>
                    Interrogate suspect</a>
            </div>
        )
    }

    render = () => {
        return (
            <div className="Questions">
                {this.getQuestionRender()}
                {this.getSelectRender()}
            </div>
        );
    }
}

export default CharacterQuestions;