// Character alibi class for Electronic Detective

import React, { Component } from 'react';
import "../../css/characters/Character.css";
import ErrorBoundary from "../ErrorBoundary";


class CharacterAlibi extends Component {

    constructor(props) {
        super(props);
        this.props = props;
        this.state = {};
    }


    componentDidMount = () => {
        this.createAlibi();
    }


    getRandomInt = (max) => {
        return Math.floor(Math.random() * Math.floor(max));
    }


    createAlibi = () => {
        // Create array of the list of possible alibi facts to provide
        const arrFacts = ["side", "town", "location", "suspect", "suspect"];

        // Get a random number of facts (zero-based)
        const numFacts = this.getRandomInt(3);

        // Build a secondary array of the facts that will be shared in the alibi
        const arrSelectedFacts = [];
        for (let i = 0; i < numFacts + 1; i++) {
            const factPos = this.getRandomInt(numFacts);
            arrSelectedFacts.push(arrFacts[factPos]);
            arrFacts.splice(factPos, 1);
        }

        // Create a duplicate of the attendees that we'll be able to work with
        const attendeeArr = [];
        for (let attendee in this.props.characterData.location.attendees.men) {
            if (this.props.characterData.location.attendees.men[attendee] !== this.props.characterData) {
                attendeeArr.push(this.props.characterData.location.attendees.men[attendee]);
            }
        }
        for (let attendee in this.props.characterData.location.attendees.women) {
            if (this.props.characterData.location.attendees.women[attendee] !== this.props.characterData) {
                attendeeArr.push(this.props.characterData.location.attendees.women[attendee]);
            }
        }

        // Create an array for holding the facts that will be shared in the alibi
        const alibiArr = [];
        let pos = 0;
        for (let fact of arrSelectedFacts) {
            switch (fact) {
                case "side":
                    alibiArr.push({
                        id: pos,
                        fact: `I was on the ${this.props.characterData.location.address.side} side`
                    });
                    break;
                case "town":
                    alibiArr.push({ id: pos, fact: `I was ${this.props.characterData.location.address.town}` });
                    break;
                case "location":
                    alibiArr.push({ id: pos, fact: `I was at the ${this.props.characterData.location.name}` });
                    break;
                case "suspect":
                    const attendeeNum = this.getRandomInt(attendeeArr.length);
                    alibiArr.push({ id: pos, fact: `I was with ${attendeeArr[attendeeNum].name}` });
                    attendeeArr.splice(attendeeNum, 1);
                    break;
                default: { }
            }

            pos++;
        }

        this.setState({ alibi: alibiArr });
    }


    render = () => {
        if (!this.state.alibi) return null;

        return (
            <div className="Character-alibi">
                <ErrorBoundary>
                    {this.state.alibi.map(fact =>
                        <div className="Character-alibifact" key={fact.id}>{fact.fact}</div>)}
                </ErrorBoundary>
            </div>
        )
    }

}

export default CharacterAlibi;