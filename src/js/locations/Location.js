// Location class for Electronic Detective

import React from 'react';
import "../../css/locations/Location.css";


const Location = function (props) {
    const attendees = props.locationData.attendees;
    const address = props.locationData.address;
    const weapon = props.locationData.weapon;
    const scene = props.locationData.scene;

    return (
        <div className={scene ? "Scene" : "Location"}>
            <header className="Location-header">
                <h2 className="Location-id">{props.locationData.id}</h2>
            </header>
            <p className="Location-name">
                <strong>{props.locationData.name}</strong>
            </p>
            <table className="AttendeesTable">
                <thead>
                <tr>
                    <th>Men</th>
                    <th>Women</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>{((attendees.men[0] && attendees.men[0].name) || ` `)}</td>
                    <td>{((attendees.women[0] && attendees.women[0].name) || ` `)}</td>
                </tr>
                <tr>
                    <td>{((attendees.men[1] && attendees.men[1].name) || ` `)}</td>
                    <td>{((attendees.women[1] && attendees.women[1].name) || ` `)}</td>
                </tr>
                </tbody>
            </table>
            <div className="Location-address">
                {address.side}{` Side / `}{address.town}
            </div>
            <div className="Location-weapon">
                {weapon.type && `Weapon: `}{weapon.type}
            </div>
        </div>
    );
}

export default Location;