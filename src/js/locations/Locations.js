// Class for managing the locations in the game


export default class Locations {

	constructor() {

	    // Lovely JavaScript class function bindings
    	//this.render = this.render.bind(this);

		this.list = [];

		return this;

	}


	createLocations(jsonData) {

		for (const location of jsonData.locations) {
			this.list.push(new Location(location));
		}

	}

}