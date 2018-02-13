// Class for managing game setup and play functions

import React, {Component} from 'react';

import Characters from "./characters/Characters";
import Character from "./characters/Character";
import Location from "./locations/Location";
import "../css/GameManager.css";

class GameManager extends Component {

    constructor(props) {
        super(props);
        this.props = props;
        this.state = {
            characters: [],
            locations: [],
            victim: {},
            murderer: {},
            scene: {},
            weapon: {},
            players: [{}]
        };

        this.gameReady = false;

        this.characters = [];
        this.victim = {};
        this.murderer = {};
        this.locations = [];
        this.weapon = {};
        this.scene = {};

        this.caseSheetTemplate = {};
        this.weapons = [".45", ".38"];

        // Load in the JSON files for the game setup
        // Create an array of all the promises for each JSON file that we can use
        // to track when all files have been loaded
        const jsonFiles = [
            {"name": "characters.json", "function": this.createCharacters},
            {"name": "locations.json", "function": this.createLocations},
            {"name": "questions.json", "function": this.createQuestions},
            {"name": "casesheet.json", "function": this.createCaseSheet}
        ];
        const promises = jsonFiles.map(this.mapJsonPromises);

        //this.characters = new Characters();
        //this.locations = new Locations();

        // Don't try setting up the game until we have all the game object data loaded
        Promise.all(promises).then(this.createMayhem);

        return this;
    }


    mapJsonPromises = (jsonFile) => {
        return (
            fetch(`/json/${jsonFile.name}`)
                .then((response) => {
                    return (response.json())
                })
                .then((json) => {
                    jsonFile.function(json)
                })
        )
    }

    createCharacters = (jsonData) => {
        this.characters = jsonData.characters;
    }

    createLocations = (jsonData) => {
        const addresses = [
            {side: "East", town: "Uptown"},
            {side: "East", town: "Midtown"},
            {side: "East", town: "Downtown"},
            {side: "West", town: "Uptown"},
            {side: "West", town: "Midtown"},
            {side: "West", town: "Downtown"}
        ];
        for (let location of jsonData.locations) {
            const address = addresses.splice(this.getRandomInt(addresses.length), 1)[0];
            location.address.side = address.side;
            location.address.town = address.town;
        }
        this.locations = jsonData.locations;
    }


    createQuestions = (jsonData) => {
        this.setState({questions: jsonData.questions});
    }

    createCaseSheet = (jsonData) => {
        this.caseSheetTemplate = jsonData.casesheet;
    }


    getRandomInt = (max) => {
        return Math.floor(Math.random() * Math.floor(max));
    }


    createMayhem = () => {
        // Can't have a murder without a weapon
        const weaponNum = this.getRandomInt(2);
        const selectedWeapon = this.weapons[weaponNum];

        // Everyone starts as a suspect and knows what the murder weapon is
        let suspectArr = this.characters.slice(0);
        for (let susp of suspectArr) {
            susp.status = "suspect";
            susp.questions = [];

            // Give each suspect the full data to display the questions they are away of
            for (let id of susp.availableQuestions) {
                susp.questions.push(this.state.questions[id - 1]);
            }
            susp.weapon.type = selectedWeapon;
        }

        // But then one is killed, becomes the victim, and is removed from the pool of suspects
        let charCount = suspectArr.length;
        const victimPos = this.getRandomInt(charCount);
        const selectedVictim = suspectArr.splice(victimPos, 1)[0];
        selectedVictim.status = "victim";
        selectedVictim.weapon.type = selectedWeapon;

        // One of the remaining suspects is in fact the MURDERER
        charCount = suspectArr.length;
        const murdererPos = this.getRandomInt(charCount);
        const selectedMurderer = suspectArr[murdererPos];
        selectedMurderer.status = "murderer";

        // Every suspect needs to know about the murderer to be able to answer questions for clues
        for (let susp of suspectArr) {
            susp.murderer = selectedMurderer;
        }

        // Select where the murder took place. The victim is still there and nobody
        // else wants to be, so remove it from the list of locations.
        let locationCount = this.locations.length;
        const locationPos = this.getRandomInt(locationCount);
        const murderScene = this.locations[locationPos];
        selectedVictim.location = murderScene;
        const newLocations = this.locations.slice(0);
        newLocations[locationPos].scene = true;
        newLocations[locationPos].attendees[selectedVictim.gender === "M" ? "men" : "women"].push(selectedVictim);

        this.characters = suspectArr;
        this.victim = selectedVictim;
        this.murderer = selectedMurderer;
        this.locations = newLocations;
        this.weapon = selectedWeapon;
        this.scene = murderScene;


        // Everyone scatter!
        this.scatterSuspects();
        this.tossWeapons();

        this.gameReady = true;
        this.setState({
            characters: this.characters,
            victim: this.victim,
            murderer: this.murderer,
            locations: this.locations,
            weapon: this.weapon,
            scene: this.scene,
            weapons: this.weapons,
            foundMurderer: false
        });
    }


    scatterSuspects = () => {
        // Each location will have two of each gender, with one of each being odd-numbered index
        // and the other even-numbered index. The only exception will be the missing victim.

        // Break out the suspects into four groups of odd-men, even-men, odd-women, and even-women
        const oddMen = [];
        const evenMen = [];
        const oddWomen = [];
        const evenWomen = [];
        const groups = [
            {odd: true, gender: "M", arr: oddMen},
            {odd: false, gender: "M", arr: evenMen},
            {odd: true, gender: "F", arr: oddWomen},
            {odd: false, gender: "F", arr: evenWomen}
        ];


        const charCopy = this.characters.slice(0);
        for (let group of groups) {
            // Iterate through the characters and find all those matching the criteria and add
            // them to the given array
            for (let character of charCopy) {
                if (character.gender === group.gender) {
                    if ((character.odd && group.odd) || (!character.odd && !group.odd)) {
                        group.arr.push(character);
                    }
                }
            }
        }


        // Create a copy of the locations array so we can randomly select locations to populate
        const locCopy = this.locations.slice(0);
        const locState = locCopy.slice(0);
        while (locCopy.length) {
            // Randomly select a location
            const randloc = this.getRandomInt(locCopy.length);
            const loc = locCopy[randloc];
            // Everyone else is only at places that aren't the crime scene
            if (!loc.scene) {
                // Pick one character from each of the four groups and add them to the attendees
                // at the selected location
                for (let group of groups) {
                    if (group.arr.length) {
                        const randchar = this.getRandomInt(group.arr.length);
                        const attendee = group.arr[randchar];
                        loc.attendees[attendee.gender === "M" ? "men" : "women"].push(attendee);
                        attendee.location = loc;

                        // Remove the selected character from the group now that they've been
                        // added as an attendee at a location
                        group.arr.splice(randchar, 1);
                    }
                }
            }

            // Remove the selected location from the pool
            locCopy.splice(randloc, 1);
        }

        // Set the state with the updated locations
        this.locations = locState;
        this.characters = charCopy;
    }

    tossWeapons = () => {
        // Create working and new state copys of the locations list
        const copyLocs = this.locations.slice(0);
        const workLocs = copyLocs.slice(0);

        // Weed out the crime scene and location of the murderer from the locations
        // Use a value to track our position in the array
        for (let i = workLocs.length; i--; i >= 0) {
            const workLoc = workLocs[i];
            // Check if the body is at this location
            if (workLoc.scene === true) {
                workLocs.splice(i, 1);
                continue;
            }

            // Check if the murderer is at this location
            const attendees = [...workLoc.attendees.men, ...workLoc.attendees.women];
            for (let character of attendees) {
                if (character === this.murderer) {
                    workLocs.splice(i, 1);
                    continue;
                }
            }
        }

        // Put the two weapons at random locations from the remaining list of eligible locations
        const totoss = [];
        const stateWeapons = [];
        for (let option of this.weapons) {
            option === this.weapon
                ? totoss.push({weapon: option, print: this.murderer.id})
                : totoss.push({weapon: option, print: (this.murderer.id + 1)})
        }
        for (let item of totoss) {
            const randpos = this.getRandomInt(workLocs.length);
            const loc = workLocs[randpos];
            loc.weapon.type = item.weapon;
            loc.weapon.print = item.print;
            stateWeapons.push({type: item.weapon, print: item.print, location: loc});
            workLocs.splice(randpos, 1);
        }

        // Set the state with the updated location data
        this.locations = copyLocs;
        this.weapons = stateWeapons;
    }


    handleAccusationClick = (e, foundMurderer) => {
        // Set the state appropriately for whether this character is the murderer
        e.preventDefault();

        if (foundMurderer) this.setState({displayGame: true});
    }


    renderGameState = () => {
        if (!this.state.foundMurderer) return null;

        return (
            <div>
                <h2>This is the city</h2>
                < div className="CityList">
                    {this.state.locations.map(location =>
                        <Location key={location.id} locationData={location}/>
                    )}
                </div>
            </div>
        )
    }

    render = () => {
        {
            // Find a character at a weapon location with the same gender as the murderer
            // For testing purposes only
            /*
            let location;
            for (location of this.state.locations) {
                if (location.weapon.type === ".38") break;
            }
            let char;
            if (location) {
                char = this.state.murderer.gender === "M" ?
                    location.attendees.men[0] :
                    location.attendees.women[0];
            }
            */
        }

        if (!this.gameReady) {
            return (
                <div>Loading...</div>
            )
        }

        return (
            <div className="ElectronicDetective">
                <div>
                    <h1>Electronic Detective Game State</h1>
                    <h2>Find my killer!</h2>
                    <Character characterData={this.state.victim} characterType="victim" renderType="full"/>

                    <h2>We are the suspects</h2>
                    <Characters charactersData={this.state.characters} murdererData={this.state.murderer}
                                weaponsData={this.state.weapons} locationsData={this.state.locations}
                                handleAccusationClick={this.handleAccusationClick}/>

                    {
                        /*
                        <Character characterData={char} murdererData={this.state.murderer}
                                   weaponData={this.state.weapons} locationData={this.state.locations}
                                   renderType="questions" />
                        */

                        // This section will display all the location data for the game setup. Not to be seen
                        // during regular gameplay. Just for development purposes.
                    }
                    {this.renderGameState()}
                </div>
                <div>
                    You'll want to print off a <a target="_blank" href="../../images/Case_Fact_Sheet.jpeg">case
                    sheet</a>
                </div>
            </div>
        )
    }

}

export default GameManager;