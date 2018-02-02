// Class for managing the characters in the game

import React, { Component } from 'react';
import Character from "./Character.js";


export default class Characters extends Component {

	constructor(props) {

		super(props);
		this.state = {
			characterList: ""
		}

	    // Lovely JavaScript class function bindings
    	this.render = this.render.bind(this);

		this.list = [];

		return this;

	}


	createCharacters(jsonData) {

		for (const character of jsonData.characters) {
			this.list.push(new Character(character));
		}

		const newList = this.list.map(this.mapCharacterRender);
		//this.setState({characterList: newList});
		this.characterList = newList;

	}


	getCharacters() {
		return this.list;
	}


	mapCharacterRender(character) {
		return (<div key={character.id}>{character.render()}</div>);
	}


	render() {
		return (
	    	<div className="Characters">
	    		{this.characterList}
	    	</div>
	  	);
	}
}