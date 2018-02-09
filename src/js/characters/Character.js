// Character class for Electronic Detective


import React, {Component} from 'react';
import "../../css/characters/Character.css";
import CharacterQuestions from "./CharacterQuestions";


class Character extends Component {

    constructor(props) {
        super(props);
        this.props = props;

        this.state = {characterData: {}};

        this.imgPath = "\\images\\characters\\";
    }


    componentWillReceiveProps = (props) => {
        const newState = Object.assign({}, props);
        this.setState(newState);
    };


    handleQuestionClick = (id) => {
        // Find the question with the id
        let question = {};
        for (question of this.state.characterData.questions) {
            if (question.id === id) break;
        }

        // Need to check which function to run for the selected question and then post back the answer
        switch (question.answerFunction) {
            case "checkEastSide":
                this.checkEastSide(question.subject, question.responseText);
                break;
            case "checkMurdererGender":
                this.checkMurdererGender(question.subject, question.responseText);
                break;
            case "checkTownLocation":
                this.checkTownLocation(question.subject, question.responseText);
                break;
            case "checkMurderWeapon":
                this.checkMurderWeapon(question.subject, question.responseText);
                break;
            case "check38Location":
                this.check38Location(question.subject, question.responseText);
                break;
            case "check45Location":
                this.check45Location(question.subject, question.responseText);
                break;
            case "checkEmptySeat":
                this.checkEmptySeat(question.subject, question.responseText);
                break;
            case "checkPlaceName":
                this.checkPlaceName(question.subject, question.responseText);
                break;
            case "checkWeaponLocation":
                this.checkWeaponLocation(question.subject, question.responseText);
                break;
            case "check38Prints":
                this.check38Prints(question.subject, question.responseText);
                break;
            case "check45Prints":
                this.check45Prints(question.subject, question.responseText);
                break;
            default:
        }

    };


    checkEastSide = (subject, response) => {
        // Check whether the suspect or murderer was on the East side of town and display the
        // appropriate response for the question
        const side = subject === "suspect" ?
            this.state.characterData.location.address.side :
            this.state.murdererData.location.address.side;

        const display = side === "East" ? response.affirmative : response.negative;

        this.setState({answer: display});
    };


    checkMurdererGender = (subject, responseText) => {

    };


    checkTownLocation = (subject, responseText) => {

    };


    checkMurderWeapon = (subject, responseText) => {

    };


    check38Location = (subject, responseText) => {

    };


    check45Location = (subject, responseText) => {

    };


    checkEmptySeat = (subject, responseText) => {

    };


    checkPlaceName = (subject, responseText) => {

    };


    checkWeaponLocation = (subject, responseText) => {

    };


    check38Prints = (subject, responseText) => {

    };


    check45Prints = (subject, responseText) => {

    };


    render = () => {
        const portraitImage = (this.state.characterData.images && this.state.characterData.images.portrait) || "";
        const profileImage = (this.state.characterData.images && this.state.characterData.images.profile) || "";

        return (
            <div className="Character">
                <div className="Character-name">{this.state.characterData.name}</div>
                <div className="Character-info">
                    <div className="Character-images">
                        <div className="Character-image">
                            <img src={this.imgPath + portraitImage} alt={this.state.characterData.name +
                            ' face'}/>
                        </div>
                        {this.state.renderType === "full" ?
                            <div className="Character-image">
                                <img src={this.imgPath + profileImage} alt={this.state.characterData.name +
                                ' profile'}/>
                            </div> : ""
                        }
                    </div>
                    {this.state.renderType === "full" ?
                        <div className="Character-demographics">
                            <div className="Character-text">
                                Gender: {this.state.characterData.gender === "M" ? "Male" : "Female"}
                            </div>
                            <div className="Character-text">
                                Relationship Status: {this.state.characterData.relationshipStatus}
                                {this.state.characterData.spouse
                                    ? ` to ${this.state.characterData.spouse} (${this.state.characterData.relationshipID})`
                                    : ``}
                            </div>
                            <div className="Character-text">
                                Occcupation: {this.state.characterData.occupation}
                            </div>
                        </div> : ""
                    }
                    {this.state.renderType === "questions" ?
                        <CharacterQuestions questions={this.state.characterData.questions}
                                            handleQuestionClick={this.handleQuestionClick}/> : ""
                    }
                </div>
                {this.state.answer !== undefined ?
                    <div className="Character-answer">{this.state.answer}</div> : ""
                }
            </div>
        );
    }
}

export default Character;