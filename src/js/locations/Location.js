// Location class for Electronic Detective

import React, { Component } from 'react';



export default class Location extends Component {

	constructor(props) {
		super(props);
		this.state = {
			attendees: {men:[], women:[]},
			scene: props.crime,
			address: {side: this.props.side, town: this.props.town},
			weapon: {type: undefined}
		}

	    // Lovely JavaScript class function bindings
    	this.render = this.render.bind(this);
    	this.addAttendee = this.addAttendee.bind(this);
    	this.addWeapon = this.addWeapon.bind(this);
    	this.setAddress = this.setAddress.bind(this);

		this.id = props.id;
		this.name = props.name;

		return this;
	}


	addAttendee(character) {
		// Add the character to the appropriate list of Men or Women at the location
		// depending on the gender of the character
		const obj = Object.assign({}, this.state.attendees);
		obj[character.gender==="M"?"men":"women"].push(character);
		this.setState({attendees: obj});
	}


	addWeapon(weapontype) {
		this.setState({weapon: {type: weapontype}});
	}


	setAddress(newside, newtown) {
		this.setState({address: {side: newside, town: newtown}});
	}


	setScene() {
		this.setState({scene: true});
	}


	render() {
    	return (
      		<div className="Location">
        		<header className="Location-header">
          			<h1 className="Location-id">{this.id}</h1>
        		</header>
        		<p className="Location-name">
          			{this.name}
	        	</p>
        		<table>
        			<thead>
        				<tr>
        					<th>Men</th>
        					<th>Women</th>
        				</tr>
        			</thead>
        			<tbody>
        				<tr>
        					<td>{this.state.attendees.men[0] && this.state.attendees.men[0].id}</td>
        					<td>{this.state.attendees.women[0] && this.state.attendees.women[0].id}</td>
        				</tr>
        				<tr>
        					<td>{this.state.attendees.men[1] && this.state.attendees.men[1].id}</td>
        					<td>{this.state.attendees.women[1] && this.state.attendees.women[1].id}</td>
        				</tr>
        			</tbody>
        		</table>
        		<div className="Location-address">
        			<div className="Location-side">
        				{this.state.address.side}
        			</div>
        			<div className="Location-town">
        				{this.state.address.town}
        			</div>
        		</div>
        		<div className="Location-weapon">
        			Weapon: {this.state.weapon.type}
        		</div>
    		</div>
    	);
  	}	
}