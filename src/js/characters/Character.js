// Character class for Electronic Detective


import React from 'react';


const Character = function (props) {
    return (
        <div className="Character">
            <header className="Character-header">
                <div className="Character-name">Name: <strong>{props.characterData.name}</strong></div>
                <img src={props.characterData.faceImage} className="Character-image"
                     alt={props.characterData.name + ' face'}/>
                <img src={props.characterData.profileImage} className="Character-image"
                     alt={props.characterData.name + ' profile'}/>
            </header>
            <p className="Character-info">
                Gender: {props.characterData.gender === "M" ? "Male" : "Female"}
            </p>
            <p className="Character-info">
                Relationship Status: {props.characterData.relationshipStatus}
            </p>
            <p className="Character-info">
                Occcupation: {props.characterData.occupation}
            </p>
        </div>
    );
}

export default Character;