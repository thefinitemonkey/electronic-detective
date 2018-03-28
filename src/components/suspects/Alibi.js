import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { css } from "react-emotion";
import { body, bodyStrong, bodyCondensed } from "../../utils/globalcss";

class Alibi extends PureComponent {
  state = {
    alibi: this.props.game.gameData.alibis[this.props.suspectId] || []
  };

  getRandomInt = max => {
    return Math.floor(Math.random() * Math.floor(max));
  };

  createAlibi = () => {
    // Create array of the list of possible alibi facts to provide
    const arrFacts = ["side", "town", "location", "suspect", "suspect"];

    // Get a random number of facts (zero-based)
    const numFacts = this.getRandomInt(3);

    // Build a secondary array of the facts that will be shared in the alibi
    let arrSelectedFacts = [];
    for (let i = 0; i < numFacts + 1; i++) {
      const factPos = this.getRandomInt(numFacts);
      arrSelectedFacts.push(arrFacts[factPos]);
      arrFacts.splice(factPos, 1);
    }

    // Create a duplicate of the attendees that we'll be able to work with
    const attendeeArr = [];
    const location = this.props.game.gameData.locations[
      this.props.characterLocations[this.props.suspectId]
    ];
    location.occupants.forEach = occupant => {
      if (occupant !== this.props.suspectId) attendeeArr.push(occupant);
    };

    // Create an array for holding the facts that will be shared in the alibi
    const alibiArr = [];
    let pos = 0;
    for (let fact of arrSelectedFacts) {
      switch (fact) {
        case "side":
          alibiArr.push({
            id: pos,
            fact: `I was on the ${
              this.props.characterData.location.address.side
            } side`
          });
          break;
        case "town":
          alibiArr.push({
            id: pos,
            fact: `I was in the ${
              this.props.characterData.location.address.town
            } area`
          });
          break;
        case "location":
          alibiArr.push({
            id: pos,
            fact: `I was at the ${this.props.characterData.location.name}`
          });
          break;
        case "suspect":
          const attendeeNum = this.getRandomInt(attendeeArr.length);
          alibiArr.push({
            id: pos,
            fact: `I was with ${attendeeArr[attendeeNum].name}`
          });
          attendeeArr.splice(attendeeNum, 1);
          break;
        default: {
        }
      }

      pos++;
    }

    return alibiArr;
  };
}

function mapStateToProps(game) {
  // Create a hash map of characterId:location pairs
  const locations = game.gameData.locations;
  const characterLocations = {};
  Object.keys(locations).forEach = lKey => {
    Object.keys(locations[key].occupants).forEach = cKey => {
      characterLocations[cKey] = lKey;
    };
  };

  return { game, characterLocations };
}

export default connect(mapStateToProps)(Alibi);
