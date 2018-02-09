// Character class for Electronic Detective


import React from 'react';
import "../../css/characters/Character.css";


const Character = function (props) {
    const imgPath = "\\images\\characters\\";
    const portraitImage = (props.characterData.images && props.characterData.images.portrait) || "";
    const profileImage = (props.characterData.images && props.characterData.images.profile) || "";

    return (
        <div className="Character">
            <div className="Character-info">
                <div className="Character-images">
                    <div className="Character-image">
                        <img src={imgPath + portraitImage} alt={props.characterData.name + ' face'}/>
                    </div>
                    {props.renderType === "full" ?
                        <div className="Character-image">
                            <img src={imgPath + profileImage} alt={props.characterData.name + ' profile'}/>
                        </div> : ""
                    }
                </div>
                <div className="Character-demographics">
                    <div className="Character-name">{props.characterData.name}</div>
                    <div className="Character-text">
                        Gender: {props.characterData.gender === "M" ? "Male" : "Female"}
                    </div>
                    <div className="Character-text">
                        Relationship Status: {props.characterData.relationshipStatus}
                        {props.characterData.spouse
                            ? ` to ${props.characterData.spouse} (${props.characterData.relationshipID})`
                            : ``}
                    </div>
                    <div className="Character-text">
                        Occcupation: {props.characterData.occupation}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Character;