// Class for managing game setup and play functions


export default class GameManager {

	constructor() {

	    // Lovely JavaScript class function bindings
		this.getRandomInt = this.getRandomInt.bind(this);
		this.scatterSuspects = this.scatterSuspects.bind(this);
		this.createMayhem = this.createMayhem.bind(this);


		this.characters = undefined;
		this.locations = undefined;
		this.victim = undefined;
		this.murderer = undefined;
		this.scene = undefined;
		this.weapon = undefined;

		return this;
	}


	getRandomInt(max) {
  		return Math.floor(Math.random() * Math.floor(max));
	}


	setCharacters(characters) {
		this.characters = characters.getCharacters();
	}


	setLocations(locations) {
		this.locations = locations.getLocations();
	}


	createMayhem() {
		// First select a murder victim and remove them from the pool of suspects
		let charCount = this.characters.length;
		const victimPos = this.getRandomInt(charCount);
		this.victim = this.characters[victimPos];
		this.characters.splice(victimPos, 1);
		this.victim.setStatus("Victim");

		// One of the remaining suspects is in fact the MURDERER
		charCount = this.characters.length;
		const murdererPos = this.getRandomInt(charCount);
		this.murderer = this.characters[murdererPos];
		this.murderer.setStatus("Murderer");

		// Which weapon was used for the murder
		const weaponNum = this.getRandomInt(2);
		const weapon = weaponNum ? ".45" : ".38";
		this.victim.setWeapon(weapon);
		this.weapon = weapon;

		// Select where the murder took place. The victim is still there and nobody
		// else wants to be, so remove it from the list of locations.
		let locationCount = this.locations.length;
		const locationPos = this.getRandomInt(locationCount);
		this.scene = this.locations[locationPos];
		this.locations.splice(locationPos, 1);

		// Everyone scatter!
		this.scatterSuspects()
	}


	scatterSuspects() {
		// Each location will have two of each gender, with one of each being odd-numbered index
		// and the other odd-numbered index. The only exception will be the missing victim.

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
			for (let character of this.characters) {
				if (character.gender === group.gender) {
					if ((character.odd && group.odd) || (!character.odd && !group.odd)) {
						group.arr.push(character);
					}
				}
			}
		}


		// Create a copy of the locations array so we can randomly select locations to populate
		const locCopy = Array.from(this.locations);
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
					loc.addAttendee(group.arr[randchar]);
					// Remove the selected character from the group now that they've been
					// added as an attendee at a location
					group.arr.splice(randchar, 1);
				}
			}

			// Remove the selected location from the pool
			locCopy.splice(randloc, 1);
		}
		for (let location of this.locations) {
			console.log(location);
		}
	}

}