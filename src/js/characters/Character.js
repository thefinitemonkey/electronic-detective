// Character class for Electronic Detective

import React, { Component } from 'react';



export default class Character extends Component {

	constructor(props) {
		super(props);

	    // Lovely JavaScript class function bindings
    	this.render = this.render.bind(this);

		this.id = props.id;
		this.odd = this.id % 2 === 1 ? true : false;
		this.name = props.name;
		this.gender = props.gender;
		this.occupation = props.occupation;
		this.relationshipID = props.relationshipID;
		this.relationshipStatus = props.relationshipStatus;
		this.faceImage = props.images.face;
		this.profileImage = props.images.profile;
		this.questions = props.availableQuestions;

		this.locationName = "";
		this.locationSide = "";
		this.locationTown = "";
		this.status = "suspect";
		this.weaponType = "";

		return this;
	}


	render() {
    	return (
      		<div className="Character">
        		<header className="Character-header">
          			<h1 className="App-title">{this.name}</h1>
	          		<img src={this.faceImage} className="Character-image" alt={this.name + ' face'} />
    	      		<img src={this.profileImage} className="Character-image" alt={this.name + ' profile'} />
        		</header>
        		<p className="Character-info">
          			Gender: {this.gender === "M" ? "Male" : "Female"}
	        	</p>
        		<p className="Character-info">
          			Relationship Status: {this.relationshipStatus}
	        	</p>
        		<p className="Character-info">
          			Occcupation: {this.occupation}
	        	</p>
    		</div>
    	);
  	}	
}