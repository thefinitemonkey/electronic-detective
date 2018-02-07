// Character class for Electronic Detective

import React, {Component} from 'react';


export default class Character extends Component {

    constructor(props) {
        super(props);
        this.props = props;

        this.state = {
            ...props
        }

        console.log("character state", this.state);
        return this;
    }


    setStatus = (newstatus) => {
        this.status = newstatus;
    }


    setWeapon = (newweapon) => {
        this.weaponType = newweapon;
    }


    render = () => {
        return (
            <div className="Character">
                <header className="Character-header">
                    <div className="Character-name">Name: {this.state.name}</div>
                    <img src={this.state.faceImage} className="Character-image" alt={this.state.name + ' face'}/>
                    <img src={this.state.profileImage} className="Character-image" alt={this.state.name + ' profile'}/>
                </header>
                <p className="Character-info">
                    Gender: {this.state.gender === "M" ? "Male" : "Female"}
                </p>
                <p className="Character-info">
                    Relationship Status: {this.state.relationshipStatus}
                </p>
                <p className="Character-info">
                    Occcupation: {this.state.occupation}
                </p>
            </div>
        );
    }
}