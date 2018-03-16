// Character class for Electronic Detective


import React, { Component } from 'react';
import "../../css/characters/Character.css";
import CharacterQuestions from "./CharacterQuestions";
import CharacterAnswerLogic from "./CharacterAnswerLogic";
import CharacterAlibi from "./CharacterAlibi";
import ErrorBoundary from "../ErrorBoundary";


class Character extends Component {

    constructor(props) {
        super(props);
        this.props = props;

        const newState = Object.assign({}, props);
        this.state = newState;

        this.imgPath = "./images/characters/";
    }


    componentWillReceiveProps = (props) => {
        this.props = props;
        const newState = Object.assign({}, props);
        newState.interrogate = (props.selectedSuspect === newState.characterData.id);
        if (newState.interrogate) newState.renderType = "questions";
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
                this.setState(CharacterAnswerLogic.checkEastSide(this.state, question.subject, question.responseText));
                break;
            case "checkMurdererGender":
                this.setState(CharacterAnswerLogic.checkMurdererGender(this.state, question.subject, question.responseText));
                break;
            case "checkTownLocation":
                this.setState(CharacterAnswerLogic.checkTownLocation(this.state, question.subject, question.responseText));
                break;
            case "checkMurderWeapon":
                this.setState(CharacterAnswerLogic.checkMurderWeapon(this.state, question.subject, question.responseText));
                break;
            case "check38Location":
                this.setState(CharacterAnswerLogic.check38Location(this.state, question.subject, question.responseText));
                break;
            case "check45Location":
                this.setState(CharacterAnswerLogic.check45Location(this.state, question.subject, question.responseText));
                break;
            case "checkEmptySeat":
                this.setState(CharacterAnswerLogic.checkEmptySeat(this.state, question.subject, question.responseText));
                break;
            case "checkPlaceNames":
                this.setState(CharacterAnswerLogic.checkPlaceNames(this.state, question.subject, question.responseText));
                break;
            case "checkWeaponLocation":
                this.setState(CharacterAnswerLogic.checkWeaponLocation(this.state, question.subject, question.responseText));
                break;
            case "checkPrints":
                this.setState(CharacterAnswerLogic.checkPrints(this.state, question.subject, question.responseText));
                break;
            default:
        }

    };





    handleSuspectClick = (e, data) => {
        // Update the change in state to Characters
        e.preventDefault();
        this.setState({ allowedQuestions: this.props.allowedQuestions });
        this.props.handleSuspectClick(e, data);
    }


    handleEndInterrogationClick = (e) => {
        // Update the change in state to Characters
        e.preventDefault();
        this.setState({ renderType: "full", answer: undefined });

        this.props.handleEndInterrogation(e);
    }

    handleViewTabClick = (e, data) => {
        // For switching between character info and character questions views
        e.preventDefault();
        this.setState({ renderType: data });

    }


    handleAccusationClick = (e) => {
        // Set the state appropriately for whether this character is the murderer
        e.preventDefault();
        let foundMurderer = false;

        if (this.props.characterData === this.props.murdererData) {
            this.setState({ accused: true, murderer: true });
            foundMurderer = true;
        } else {
            this.setState({ accused: true, murderer: false });
        }

        this.props.handleAccusationClick(e, foundMurderer);
    }


    setViewTabRender = () => {
        if (this.props.characterType === "victim") return null;

        if (this.state.renderType === "questions" && this.state.interrogate) return null;

        return (
            <div className="Character-viewtypetabs">
                <div className="Character-viewtypetab">
                    <a href="fullswitch" className={this.state.renderType === "questions" ?
                        "Character-switchviewtype" : "Character-noswitchviewtype"}
                        onClick={((e) => this.handleViewTabClick(e, "full"))}>Info</a>
                </div>
                <div className="Character-viewtypetab">
                    <a href="questionsswitch" className={this.state.renderType === "questions" ?
                        "Character-noswitchviewtype" : "Character-switchviewtype"}
                        onClick={((e) => this.handleViewTabClick(e, "questions"))}>Questions</a>
                </div>
            </div>
        );
    }


    getInterrogateRender = () => {
        if (this.state.interrogate || this.props.characterType === "victim") return null;

        return (
            <div className="Character-selectsuspect">
                <a href={`interrogate-link-${this.state.characterData.id}`} key={this.state.characterData.id}
                    onClick={((e) => this.handleSuspectClick(e, this.state.characterData.id))}>
                    Interrogate suspect</a>
            </div>
        )
    }


    renderEndInterrogation = () => {
        if (this.state.interrogate) {
            return (
                <div className="Character-endinterrogation">
                    <a href={`link-interrogation-end-${this.state.characterData.id}`}
                        onClick={((e) => this.handleEndInterrogationClick(e))}
                    >End interrogation</a>
                </div>
            )
        }
    }


    renderAccusation = () => {
        if (this.props.characterType === "victim") return;

        return (
            <div className="Character-accusation">
                <a href={`link-accusation-${this.state.characterData.id}`}
                    onClick={((e) => this.handleAccusationClick(e))}>
                    Accuse Suspect</a>
            </div>
        )

    }


    renderAccusationResponse = () => {
        if (!this.state.accused) return null;

        return (
            <div className="Character-accusationresponse">
                {this.state.accused && !this.state.murderer ?
                    <div className="Character-notguiltyresponse">
                        Just wait until my lawyers get a hold of you for making wrongful accusations like that!
                    </div> :
                    <div className="Character-guiltyresponse">
                        Yeah, I did it. And I would have gotten away with it too if it wasn't for you kids!
                    </div>}
            </div>
        )
    }


    render = () => {
        if (this.state.characterData === undefined) return null;

        if (!this.state.interrogate && this.props.selectedSuspect > -1) return null;

        const portraitImage = (this.state.characterData.images && this.state.characterData.images.portrait) || "";
        const profileImage = (this.state.characterData.images && this.state.characterData.images.profile) || "";

        return (
            <div className="Character">
                <ErrorBoundary>
                    <div className="Character-header">
                        <div className="Character-name">{this.state.characterData.name} ({this.state.characterData.id})
                    </div>
                        {this.setViewTabRender()}
                    </div>

                    <div className="Character-info">
                        <div className="Character-images">
                            <div className="Character-image">
                                <img src={this.imgPath + portraitImage} alt={this.state.characterData.name +
                                    ' face'} />
                            </div>
                            {this.state.renderType === "full" ?
                                <div className="Character-image">
                                    <img src={this.imgPath + profileImage} alt={this.state.characterData.name +
                                        ' profile'} />
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
                                {this.props.characterType === "victim" && this.state.characterData.location ?
                                    <div className="Character-victimlocation">
                                        I was murdered at the <span className="Character-locationname">
                                            {this.state.characterData.location.name}</span>
                                    </div> : ""
                                }
                            </div> : ""
                        }
                        {this.state.renderType === "questions" ?
                            <CharacterQuestions questions={this.state.characterData.questions}
                                allowedQuestions={this.state.allowedQuestions}
                                characterId={this.state.characterData.id}
                                handleQuestionClick={this.handleQuestionClick}
                                handleSuspectClick={this.handleSuspectClick}
                                interrogate={this.state.interrogate} /> : ""
                        }
                    </div>
                    {this.renderAccusationResponse()}
                    {this.state.interrogate ?
                        < CharacterAlibi characterData={this.state.characterData} /> : ""
                    }
                    <div className="Character-answertext">
                        {this.state.answer !== undefined && this.state.renderType === "questions" ?
                            <div className="Character-answer">{this.state.answer}</div> : ""
                        }
                    </div>
                    <div className="Character-actions">
                        {this.getInterrogateRender()}
                        {this.renderEndInterrogation()}
                        {this.renderAccusation()}
                    </div>
                </ErrorBoundary>
            </div>
        );
    }
}

export default Character;