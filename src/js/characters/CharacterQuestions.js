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


    componentWillReceiveProps = (props) => {
        this.props = props;
        this.setState({allowed: props.allowedQuestions, asked: 0});
    };


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


    /*
    handleSuspectClick = (e, data) => {
        // Don't let the standard browser click go anywhere
        e.preventDefault();

        // New interrogation, so reset the question counter
        this.setState({asked: 0});

        // Update this character to be the interrogated suspect
        this.props.handleSuspectClick(data);
    }
    */


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
                        {question.question}
                    </div>
                )}
            </div>
        )
    }


    render = () => {
        return (
            <div className="Questions">
                {this.getQuestionRender()}
            </div>
        );
    }
}

export default CharacterQuestions;