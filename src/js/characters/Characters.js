// Characters class for Electronic Detective


import React, { Component } from 'react';
import "../../css/characters/Character.css";
import Character from "./Character";
import ErrorBoundary from "../ErrorBoundary";


class Characters extends Component {

    constructor(props) {
        super(props);
        this.props = props;

        this.state = {
            murderer: this.props.murdererData,
            characters: this.props.charactersData,
            weapons: this.props.weaponsData,
            locations: this.props.locationsData,
            selectedSuspect: -1
        };
    }


    componentWillReceiveProps = (props) => {
        this.setState({
            murderer: this.props.murdererData,
            characters: this.props.charactersData,
            weapons: this.props.weaponsData,
            locations: this.props.locationsData
        });
    };

    handleSuspectClick = (e, data) => {
        // Update the state to reflect the selected suspect id
        this.setState({ selectedSuspect: data });
    }


    handleEndInterrogationClick = (e) => {
        // Update the state to reflect that nobody is being interrogated
        this.setState({ selectedSuspect: -1 });
    }


    handleAccusationClick = (e, foundMurderer) => {
        // Set the state appropriately for whether this character is the murderer
        e.preventDefault();

        this.props.handleAccusationClick(e, foundMurderer);
    }


    render = () => {
        if (!this.state.characters) return null;

        return (
            <div className="Characters-list">
                <ErrorBoundary>
                    {this.state.characters.map(character =>
                        <Character key={character.id} characterData={character} murdererData={this.state.murderer}
                            weaponData={this.state.weapons} locationData={this.state.locations}
                            renderType="full" selectedSuspect={this.state.selectedSuspect}
                            handleSuspectClick={this.handleSuspectClick}
                            handleEndInterrogation={this.handleEndInterrogationClick}
                            handleAccusationClick={this.handleAccusationClick} />
                    )}
                </ErrorBoundary>
            </div>
        )
    }
}

export default Characters;