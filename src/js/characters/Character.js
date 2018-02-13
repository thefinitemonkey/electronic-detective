// Character class for Electronic Detective


import React, {Component} from 'react';
import "../../css/characters/Character.css";
import CharacterQuestions from "./CharacterQuestions";
import CharacterAlibi from "./CharacterAlibi";


class Character extends Component {

    constructor(props) {
        super(props);
        this.props = props;

        const newState = Object.assign({}, props);
        this.state = newState;

        this.imgPath = "\\images\\characters\\";
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
            case "checkPlaceNames":
                this.checkPlaceNames(question.subject, question.responseText);
                break;
            case "checkWeaponLocation":
                this.checkWeaponLocation(question.subject, question.responseText);
                break;
            case "checkPrints":
                this.checkPrints(question.subject, question.responseText);
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


    checkMurdererGender = (subject, response) => {
        // Check whether the murderer is male and display the appropriate response
        const display = this.state.murdererData.gender === "M" ? response.affirmative : response.negative;

        this.setState({answer: display});
    };


    checkTownLocation = (subject, response) => {
        // Get the part of town the subject went to and append it to the affirmative
        // response for display (there is no negative response)
        let display;
        subject === "murderer" ?
            display = response.affirmative + this.state.murdererData.location.address.town :
            display = response.affirmative + this.state.characterData.location.address.town;

        this.setState({answer: display});
    };


    checkMurderWeapon = (subject, response) => {
        // Check the victim to see whether the weapon used was a .38 and display the response
        const display = this.state.characterData.weapon.type === ".38" ?
            response.affirmative : response.negative;

        this.setState({answer: display});
    };


    check38Location = (subject, response) => {
        // Display the location of the .38 from the collection of weapons data
        let weapon;
        for (weapon of this.state.weaponData) {
            if (weapon.type === ".38") break;
        }

        const display = response.affirmative + weapon.location.name;
        this.setState({answer: display});
    };


    check45Location = (subject, response) => {
        // Display the location of the .45 from the collection of weapons data
        let weapon;
        for (weapon of this.state.weaponData) {
            if (weapon.type === ".45") break;
        }

        const display = response.affirmative + weapon.location.name;
        this.setState({answer: display});
    };


    checkEmptySeat = (subject, response) => {
        // Display the location name of the place with only three suspects
        let location;
        for (location of this.state.locationData) {
            if (location.attendees.men.length + location.attendees.women.length === 3) break;
        }

        const display = response.affirmative + location.name;
        this.setState({answer: display});
    };


    checkPlaceNames = (subject, response) => {
        // Check if the murderer was at location A, B, or C and respond appropriately
        const locID = subject === "murderer" ?
            this.state.murdererData.location.id :
            this.state.characterData.location.id;

        const display = (locID === "A" || locID === "B" || locID === "C") ?
            response.affirmative : response.negative;
        this.setState({answer: display});
    };


    checkWeaponLocation = (subject, response) => {
        // Check whether the character was at a location with a weapon
        const display = this.state.characterData.location.weapon.type === null ?
            response.negative : response.positive;

        this.setState({answer: display});
    };


    checkPrints = (subject, response) => {
        // This one is trickier. Only people who were at a location with a weapon can answer.
        if (this.state.characterData.location.weapon.type === null ||
            this.state.characterData.location.weapon.type !== subject) {
            this.setState({answer: response.unknown});
            return;
        }

        // Get the weapon for the character's location
        const weapon = this.state.characterData.location.weapon;

        // If the character is the same gender as the murderer then they have to give a truthful answer
        if (this.state.characterData.gender === this.state.murdererData.gender) {
            const display = weapon.print % 2 === 1 ? response.affirmative : response.negative;
            this.setState({answer: display});
            return;
        }

        // If the character is not the same gender as the murderer then they might lie. It's a coin toss.
        const lie = this.getRandomInt(2);
        const display = lie ? response.negative : response.affirmative;
        this.setState({answer: display});
    };


    getRandomInt = (max) => {
        return Math.floor(Math.random() * Math.floor(max));
    }


    handleSuspectClick = (e, data) => {
        // Update the change in state to Characters
        e.preventDefault();
        this.setState({allowedQuestions: 3});
        this.props.handleSuspectClick(e, data);
    }


    handleEndInterrogationClick = (e) => {
        // Update the change in state to Characters
        e.preventDefault();
        this.setState({renderType: "full"});
        this.props.handleEndInterrogation(e);
    }

    handleViewTabClick = (e, data) => {
        // For switching between character info and character questions views
        e.preventDefault();
        this.setState({renderType: data});

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


    render = () => {
        if (this.state.characterData === undefined) return null;

        if (!this.state.interrogate && this.props.selectedSuspect > -1) return null;

        const portraitImage = (this.state.characterData.images && this.state.characterData.images.portrait) || "";
        const profileImage = (this.state.characterData.images && this.state.characterData.images.profile) || "";

        return (
            <div className="Character">
                <div className="Character-header">
                    <div className="Character-name">{this.state.characterData.name} ({this.state.characterData.id})
                    </div>
                    {this.setViewTabRender()}
                </div>

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
                                            interrogate={this.state.interrogate}/> : ""
                    }
                </div>
                {this.state.interrogate ?
                    < CharacterAlibi characterData={this.state.characterData}/> : ""
                }
                <div className="Character-answertext">
                    {this.state.answer !== undefined && this.state.renderType === "questions" ?
                        <div className="Character-answer">{this.state.answer}</div> : ""
                    }
                </div>
                {this.getInterrogateRender()}
                {this.renderEndInterrogation()}
            </div>
        );
    }
}

export default Character;