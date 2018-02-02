import React, { Component } from 'react';
import logo from '../logo.svg';
import '../css/App.css';
import Characters from "./characters/Characters.js";
import Locations from "./locations/Locations.js";

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      characterList: "",
      locationList: ""
    }

    // Lovely JavaScript class function bindings
    this.createCharacters = this.createCharacters.bind(this);
    this.createLocations = this.createLocations.bind(this);
    this.createQuestions = this.createQuestions.bind(this);
    this.createCaseSheet = this.createCaseSheet.bind(this);
    this.initGame = this.initGame.bind(this);
    this.render = this.render.bind(this);

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

    // Set properties to hold the various game objects
    this.characters = new Characters();
    this.locations = new Locations();

    // Don't try setting up the game until we have all the game object data loaded
    Promise.all(promises).then(this.initGame);
  }

  mapJsonPromises(jsonFile){
    return(
      fetch(`/json/${jsonFile.name}`)
      .then((response)=>{return (response.json())})
      .then((json)=>{jsonFile.function(json)})
    )
  }

  createCharacters(jsonData){
    this.characters.createCharacters(jsonData);
    const newList = this.characters.render();
    this.setState({characterList: newList});
  }

  createLocations(jsonData){
    this.locations.createLocations(jsonData);
    const newList = this.locations.render();
    this.setState({locationList: newList});
  }

  createQuestions(jsonData){
    console.log("Question data loaded");
  }

  createCaseSheet(jsonData){
    console.log("Case sheet data loaded");
  }


  initGame(renderFunction) {
    // All of the JSON data has loaded (and objects are created), so set up the game
    console.log("Ready to init game");
    console.log(this);
  }


  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <div className="CharacterList">
          {this.state.locationList}
        </div>
      </div>
    );
  }
}

export default App;
