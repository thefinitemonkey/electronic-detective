// Characters class for Electronic Detective


import React, {Component} from 'react';
import "../../css/characters/Character.css";
import Character from "./Character";


class Characters extends Component {

    constructor(props) {
        super(props);
        this.props = props;

        this.state = {
            murderer: this.props.murdererData,
            characters: this.props.charactersData,
            weapons: this.props.weaponsData,
            locations: this.props.locationsData
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


    render = () => {
        if (!this.state.characters) return null;

        return (
            <div className="Characters-list">
                {this.state.characters.map(character =>
                    <Character key={character.id} characterData={character} murdererData={this.state.murderer}
                               weaponData={this.state.weapons} locationData={this.state.locations}
                               renderType="full"/>
                )}
            </div>
        )
    }
}

export default Characters;