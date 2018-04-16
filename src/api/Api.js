// API functions for loading, saving, and managing game data

/* export function getSetupData() {
  // Get the data for all of the setup files and return them
  // as a single object
  const sheet = fetch("/json/casesheet.json");
  const characters = fetch("/json/characters.json");
  const locations = fetch("/json/locations.json");
  const questions = fetch("/json/questions.json");
  const weapons = fetch("/json/weapons.json");
  const addresses = fetch("/json/addresses.json");

  const setupData = {
    sheet: {},
    characters: {},
    locations: {},
    questions: {},
    weapons: {},
    addresses: {}
  };

  return Promise.all([
    sheet,
    characters,
    locations,
    questions,
    weapons,
    addresses
  ])
    .then(data => {
      return Promise.all([
        data[0].json(),
        data[1].json(),
        data[2].json(),
        data[3].json(),
        data[4].json(),
        data[5].json()
      ]);
    })
    .then(jsonData => {
      setupData.sheet = jsonData[0];
      setupData.characters = jsonData[1];
      setupData.locations = jsonData[2];
      setupData.questions = jsonData[3];
      setupData.weapons = jsonData[4];
      setupData.addresses = jsonData[5];

      return setupData;
    })
    .catch(error => {
      console.log("error loading setup data", error);
    });
}*/

// Fetch the required file and return the JSON data from
// the Promise
export function getSetupDataFile(url) {
  return fetch(url).then(data => {
    return data.json();
  });
}
