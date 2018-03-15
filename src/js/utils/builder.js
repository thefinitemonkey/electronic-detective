// Game builder for taking in setup data and number of players
// to generate a game solution state

getRandomInt = max => {
  return Math.floor(Math.random() * Math.floor(max));
};

objToArray = obj => {
  // Convert the keys in the object into an array
  const keys = Object.keys(obj);
  const array = [];
  keys.forEach(key => {
    const newObj = obj[key];
    newObj["id"] = key;
    array.push(newObj);
  });

  return newObj;
};

export function buildGame(setupData, numPlayers) {
  // First need to pick a victim, and a murderer
  const charactersArr = objToArray(setupData.characters);
  const victim = characterArr[getRandomInt(charactersArr.length)].id;
  charactersArr.splice(victim, 1);
  const murderer = charactersArr[getRandomInt(charactersArr.length)].id;

  // Every location gets an address
  const locationsArr = objToArray(setupData.locations);
  const addressesArr = objToArray(setupData.addresses);
  locationsArr.forEach(location => {
    const address = getRandomInt(addressesArr.length);
    location.address = addressesArr[address];
    addresses.splice(address, 1);
  });

  // One of the locations is the scene of the crime
  const scene = locationsArr[getRandomInt(locationsArr.length)].id;
  locationsArr.splice(scene, 1);

  // Pick the weapon for the crime
  const weaponsArr = objToArray(setupData.weapons);
  const weapon = weaponsArr[getRandomInt(weaponsArr.length)].id;

  // Everywhere that isn't the scene of the crime has one
  // odd-numbered male, one odd-numbered female, one
  // even-numbered male, and one even-numbered female
  // with the exception of the victim being left out
  const evenMenArr = [];
  const oddMenArr = [];
  const evenWomenArr = [];
  const oddWomenArr = [];
  charactersArr.forEach(character => {
    if (character.gender === "M") {
      if (character.odd === true) {
        oddMenArr.push(character);
      } else {
        evenMenArr.push(character);
      }
    } else {
      if (character.odd === true) {
        oddWomenArr.push(character);
      } else {
        evenWomenArr.push(character);
      }
    }
  });
  const sortChars = [evenMenArr, oddMenArr, evenWomenArr, oddWomenArr];

  // Randomize the locations order before putting people
  // in each of them so as to not always have the
  // empty spot at the last location in the list
  randLocationsArr = [];
  const numLocs = locationsArr.length;
  for (let i = 0; i < numLocs; i++) {
    const index = getRandomInt(locationsArr.length);
    randLocationsArr.push(locationsArr[index]);
    locationsArr.splice(index, 1);
  }
  // Each location gets occupied
  randLocationsArr.forEach(location => {
    const occupants = [];
    sortChars.forEach(sortArr => {
      if (sortArr.length) {
        const index = getRandomInt(sortArr.length);
        occupants.push(sortArr[index].id);
        sortArr.splice(index, 1);
      }
    });
    location.occupants = occupants;
  });
  // Turn our locations from an array to an object again
  const newLocationsObj = {};
  randLocationsArr.forEach(location => {
    const id = location.id;
    delete location.id;
    newLocationsObj[id] = location;
  });

  // Create the number of case sheets for the number of players
  const sheetsObj = {};
  for (let i = 0; i < numPlayers; i++) {
    const newSheet = Object.assign({}, setupData.sheet);
    sheetsObj[i] = newSheet;
  }

  // Construct the final game state object
  return (gameObj = {
    sheets: sheetsObj,
    locations: randLocationsArr,
    victim,
    murderer,
    weapon
  });
}
