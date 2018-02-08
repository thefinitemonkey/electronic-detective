// Class for managing game setup and play functions

import React, {Component} from 'react';

import Character from "./characters/Character";
import Location from "./locations/Location";

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
			weapon: {}
		}

		// Load in the JSON files for the game setup
        // Create an array of all the promises for each JSON file that we can use
        // to track when all files have been loaded
        const jsonFiles = [
            {"name":"characters.json", "function":this.createCharacters},
            {"name":"locations.json", "function":this.createLocations},
            {"name":"questions.json", "function":this.createQuestions},
            {"name":"casesheet.json", "function":this.createCaseSheet}
        ];
        const promises = jsonFiles.map(this.mapJsonPromises);

        //this.characters = new Characters();
        //this.locations = new Locations();

        // Don't try setting up the game until we have all the game object data loaded
        Promise.all(promises).then(this.createMayhem);

        return this;
	}


    mapJsonPromises = (jsonFile) => {
        return(
            fetch(`/json/${jsonFile.name}`)
                .then((response)=>{return (response.json())})
                .then((json)=>{jsonFile.function(json)})
        )
    }

    createCharacters = (jsonData) => {
        this.setState({characters: jsonData.characters});
    }

    createLocations = (jsonData) => {
		const sides = ["East", "East", "East", "West", "West", "West"];
		const towns = ["Uptown", "Uptown", "Midtown", "Midtown", "Downtown", "Downtown"];
		for (let location of jsonData.locations) {
			const side = sides.splice(this.getRandomInt(sides.length), 1)[0];
			const town = towns.splice(this.getRandomInt(towns.length), 1)[0];
			location.address.side = side;
			location.address.town = town;
		}
        this.setState({locations: jsonData.locations});
    }


    createQuestions = (jsonData) => {
        console.log("Question data loaded");
    }

    createCaseSheet = (jsonData) => {
        console.log("Case sheet data loaded");
    }


    getRandomInt = (max) => {
  		return Math.floor(Math.random() * Math.floor(max));
	}


	createMayhem = () => {
		// Everyone starts as a suspect
		let suspectArr = this.state.characters.slice(0);
		for (let susp of suspectArr) {
			susp.status = "suspect";
		}
		this.setState({characters: suspectArr});

        // Can't have a murder without a weapon
        const weaponNum = this.getRandomInt(2);
        const selectedWeapon = weaponNum ? ".45" : ".38";
        this.setState({weapon: selectedWeapon});

		// But then one is killed, becomes the victim, and is removed from the pool of suspects
		let charCount = suspectArr.length;
		const victimPos = this.getRandomInt(charCount);
		const selectedVictim = suspectArr.splice(victimPos, 1)[0];
		selectedVictim.status = "victim";
		selectedVictim.weapon.type = selectedWeapon;
		this.setState({victim: selectedVictim});

		// One of the remaining suspects is in fact the MURDERER
		charCount = suspectArr.length;
		const murdererPos = this.getRandomInt(charCount);
		const selectedMurderer = suspectArr[murdererPos];
		selectedMurderer.status = "murderer";
		this.setState({murderer: selectedMurderer});

		// Update state of the character list
		this.setState({characters: suspectArr});

		// Select where the murder took place. The victim is still there and nobody
		// else wants to be, so remove it from the list of locations.
		let locationCount = this.state.locations.length;
		const locationPos = this.getRandomInt(locationCount);
		this.setState({scene: this.state.locations[locationPos]});
		const newLocations = this.state.locations.slice(0);
		newLocations.splice(locationPos, 1);
		this.setState({locations: newLocations});

        // Everyone scatter!
		this.scatterSuspects()
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


		for (let group of groups) {
			// Iterate through the characters and find all those matching the criteria and add
			// them to the given array
			for (let character of this.state.characters) {
				if (character.gender === group.gender) {
					if ((character.odd && group.odd) || (!character.odd && !group.odd)) {
						group.arr.push(character);
					}
				}
			}
		}


		// Create a copy of the locations array so we can randomly select locations to populate
		const locCopy = this.state.locations.slice(0);
		const locState = locCopy.slice(0);
		while (locCopy.length) {
			// Randomly select a location
			const randloc = this.getRandomInt(locCopy.length);
			const loc = locCopy[randloc];
			// Pick one character from each of the four groups and add them to the attendees
			// at the selected location
			for (let group of groups) {
				//console.log("In group of groups");
				if (group.arr.length) {
					const randchar = this.getRandomInt(group.arr.length);
					const attendee = group.arr[randchar];
                    loc.attendees[attendee.gender==="M"?"men":"women"].push(attendee);

					// Remove the selected character from the group now that they've been
					// added as an attendee at a location
					group.arr.splice(randchar, 1);
				}
			}

			// Remove the selected location from the pool
			locCopy.splice(randloc, 1);
		}

		// Set the state with the updated locations
		this.setState({locations: locState});
	}



    render = () => {
        return (
            <div className="ElectronicDetective">
				<h1>Electronic Detective Game State</h1>
				<h2>I've been killed</h2>
				<Character characterData={this.state.victim} />
				<h2>I'm the murderer</h2>
				<Character characterData={this.state.murderer} />
				<h2>This is the city</h2>
				<div className="CityList">
					{this.state.locations.map(location =>
						<Location key={location.id} locationData={location} />
					)}
				</div>
            </div>
        )
    }

}

export default GameManager;