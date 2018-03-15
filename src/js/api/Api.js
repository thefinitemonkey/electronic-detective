// API functions for loading, saving, and managing game data

export function getSetupData() {
  // Get the data for all of the setup files and return them
  // as a single object
  const sheet = fetch("/json/casesheet.json");
  const characters = fetch("/json/characters.json");
  const locations = fetch("/json/locations.json");
  const questions = fetch("/json/questions.json");

  const setupData = { sheet: {}, characters: {}, locations: {}, questions: {} };

  Promise.all([sheet, characters, locations, questions])
    .then(data => {
      setupData.sheet = data[0];
      setupData.characters = data[1];
      setupData.locations = data[2];
      setupData.questions = data[3];
    })
    .catch(error => {
      console.log("error loading setup data", error);
    });

  return setupData;
}
