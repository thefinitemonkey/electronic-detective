// Class for managing the locations in the game

import React, { Component } from 'react';
import Location from "./Location.js";


export default class Locations extends Component {

	constructor(props) {
		super(props);
		this.state = {
			list: [],
			locationList: ""
		}

	    // Lovely JavaScript class function bindings
    	//this.render = this.render.bind(this);
        //this.createLocations = this.createLocations.bind(this);
		//this.updateLocationsState = this.updateLocationsState.bind(this);

		this.props = props;
		this.list = [];
		this.mounted = false;

		return this;

	}


	componentDidMount = () => {
	    console.log("this at mount", this);
	    this.mounted = true;
	    console.log("did mount");
	    this.updateLocationsState();
    }


    componentWillUnmount = () => {
	    console.log("unmounting");
	    this.mounted = false;
    }


    updateLocationsState = () => {
	    console.log("this at update", this);
	    if (!this.mounted) return;
	    console.log("before slice", this.list);
	    const arr = this.list.slice(0);
	    console.log("after slice", this.list);
	    console.log("duplicate", arr);
	    this.setState({list:arr});
    }


	createLocations = (jsonData) => {
		for (const location of jsonData.locations) {
            this.list.push(new Location(location));
		}
		console.log("list", this.list);
        console.log("mounted", this.mounted);
        this.updateLocationsState();

	}



	getLocations = () => {
		return this.state.list;
	}



	render = () => {
		return (
			<div className="Locations">
                Locations<br />
				{ this.state.list.map(location =>
					<Location key={location.id} props={this.props} />
				)}
			</div>
		)
	}

}