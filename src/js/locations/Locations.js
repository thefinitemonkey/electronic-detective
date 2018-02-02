// Class for managing the locations in the game

import React, { Component } from 'react';
import Location from "./Location.js";


export default class Locations {

	constructor() {

	    // Lovely JavaScript class function bindings
    	//this.render = this.render.bind(this);

		this.list = [];
		this.locationList = "";

		return this;

	}


	createLocations(jsonData) {

		for (const location of jsonData.locations) {
			this.list.push(new Location(location));
		}

		this.locationList = this.list.map(this.mapLocationRender);
	}


	mapLocationRender(location) {
		return (<div key={location.id}>{location.render()}</div>);
	}


	render() {
		return (
			<div className="Locations">
				{this.locationList}
			</div>
		)
	}

}