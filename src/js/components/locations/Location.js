// Location class for Electronic Detective

import React from 'react';
import ErrorBoundary from "../ErrorBoundary";
import "../../css/locations/Location.css";


const Location = function (props) {
    const attendees = props.locationData.attendees;
    const address = props.locationData.address;
    const weapon = props.locationData.weapon;
    const scene = props.locationData.scene;
    const m0 = attendees.men[0] && attendees.men[0].name;
    const m1 = attendees.men[1] && attendees.men[1].name;
    const w0 = attendees.women[0] && attendees.women[0].name;
    const w1 = attendees.women[1] && attendees.women[1].name;


    return (
        <div className={scene ? "Scene" : "Location"}>
            <ErrorBoundary>
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
                            <td>{m0 ? attendees.men[0].name : ` `}
                                {m0 ? ` (${attendees.men[0].id})` : ` `}</td>
                            <td>{w0 ? attendees.women[0].name : ` `}
                                {w0 ? ` (${attendees.women[0].id})` : ` `}</td>
                        </tr>
                        <tr>
                            <td>{m1 ? attendees.men[1].name : ` `}
                                {m1 ? ` (${attendees.men[1].id})` : ` `}</td>
                            <td>{w1 ? attendees.women[1].name : ` `}
                                {w1 ? ` (${attendees.women[1].id})` : ` `}</td>
                        </tr>
                    </tbody>
                </table>
                <div className="Location-address">
                    {address.side}{` Side / `}{address.town}
                </div>
                <div className="Location-weapon">
                    {weapon.type && `Weapon: `}{weapon.type}
                </div>
            </ErrorBoundary>
        </div>
    );
}

export default Location;