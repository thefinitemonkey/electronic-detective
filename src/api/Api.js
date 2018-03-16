// API functions for loading, saving, and managing game data

export function getSetupData() {
  // Get the data for all of the setup files and return them
  // as a single object
  const sheet = fetch("/json/casesheet.json");
  const characters = fetch("/json/characters.json");
  const locations = fetch("/json/locations.json");
  const questions = fetch("/json/questions.json");
  const weapons = fetch("/json/weapons.json");
  const addresses = fetch("/json/addresses.json");

  const setupData = { sheet: {}, characters: {}, locations: {}, questions: {}, weapons: {}, addresses: {} };

  Promise.all([sheet, characters, locations, questions, weapons, addresses])
    .then(data => {
      setupData.sheet = JSON.parse(data[0]);
      setupData.characters = JSON.parse(data[1]);
      setupData.locations = JSON.parse(data[2]);
      setupData.questions = JSON.parse(data[3]);
      setupData.weapons = JSON.parse(data[4]);
      setupData.addresses = JSON.parse(data[5]);
    })
    .catch(error => {
      console.log("error loading setup data", error);
    });

  return setupData;
}
