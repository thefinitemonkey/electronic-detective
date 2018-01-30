// Character class for Electronic Detective

class Character extends Component {

	constructor(props, jsonData) {
		super(props);

		const this.id = jsonData.id;
		const this.odd = this.id % 2 === 1 ? true : false;
		const this.name = jsonData.name;
		const this.gender = jsonData.gender;
		const this.occupation = jsonData.occupation;
		const this.relationshipID = jsonData.relationshipID;
		const this.relationshipStatus = jsonData.relationshipStatus;
		const this.faceImage = jsonData.images.face;
		const this.profileImage = jsonData.images.profile;
		const this.questions = jsonData.availableQuestions;

		let this.locationName = "";
		let this.locationSide = "";
		let this.locationTown = "";
		let this.status = "suspect";
		let this.weaponType = "";
	}


	render() {
    	return (
      		<div className="Character">
        		<header className="Character-header">
          			<h1 className="App-title">{this.name}</h1>
	          		<img src={this.faceImage} className="Character-image" alt="{this.name}{' '}face image" />
    	      		<img src={this.profileImage} className="Character-image" alt="{this.name}{' '}profile image" />
        		</header>
        		<p className="Character-info">
          			Gender: {this.gender === "M" ? "Male" : "Female"}
	        	</p>
        		<p className="Character-info">
          			Relationship Status: {this.relationshipStatus}
	        	</p>
        		<p className="Character-info">
          			Occcupation: {this.occupation}
	        	</p>
    		</div>
    	);
  	}	
}