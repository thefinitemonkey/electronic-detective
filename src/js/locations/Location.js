// Location class for Electronic Detective

import React, {Component} from 'react';


const Location = function (props) {
    return (
        <div className="Location">
            <header className="Location-header">
                <h2 className="Location-id">{props.locationData.id}</h2>
            </header>
            <p className="Location-name">
                <strong>{props.locationData.name}</strong>
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
                    <td>{props.locationData.attendees.men[0] && props.locationData.attendees.men[0].id}</td>
                    <td>{props.locationData.attendees.women[0] && props.locationData.attendees.women[0].id}</td>
                </tr>
                <tr>
                    <td>{props.locationData.attendees.men[1] && props.locationData.attendees.men[1].id}</td>
                    <td>{props.locationData.attendees.women[1] && props.locationData.attendees.women[1].id}</td>
                </tr>
                </tbody>
            </table>
            <div className="Location-address">
                <div className="Location-side">
                    {props.locationData.address.side}
                </div>
                <div className="Location-town">
                    {props.locationData.address.town}
                </div>
            </div>
            <div className="Location-weapon">
                Weapon: {props.locationData.weapon.type}
            </div>
        </div>
    );
}

export default Location;