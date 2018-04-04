import { getRandomInt } from "../../utils/builder";

export const getQuestionResponse = (game, suspectId, question) => {
  // Determine which question function to use and data to pass
  // based on the question passed in
  const subjectId =
    question.subject === "murderer" ? game.gameData.murderer : suspectId;
  const response = question.responseText;

  switch (question.answerFunction) {
    case "checkEastSide":
      return checkEastSide(game, subjectId, response);
    case "checkMurdererGender":
      return checkMurdererGender(game, subjectId, response);
    case "checkTownLocation":
      return checkTownLocation(game, subjectId, response);
    case "checkMurderWeapon":
      return checkMurderWeapon(game, subjectId, response);
    case "check38Location":
      return check38Location(game, subjectId, response);
    case "check45Location":
      return check45Location(game, subjectId, response);
    case "checkEmptySeat":
      return checkEmptySeat(game, subjectId, response);
    case "checkPlaceNames":
      return checkPlaceNames(game, subjectId, response);
    case "checkWeaponLocation":
      return checkWeaponLocation(game, subjectId, response);
    case "checkPrints":
      return checkPrints(game, subjectId, response, question.subject);
    default:
      return { answer: "" };
  }
};

const makeLocationHashMap = gameData => {
  // Map the suspects in locations to a hash map of {suspectId: locationId}
  const lKeys = Object.keys(gameData.locations);
  const hashMap = {};
  lKeys.forEach(lKey => {
    gameData.locations[lKey].occupants.forEach(occupantId => {
      hashMap[occupantId] = lKey;
    });
  });

  return hashMap;
};

const checkEastSide = (game, subjectId, response) => {
  // Get the hash map
  const hashMap = makeLocationHashMap(game.gameData);

  // Check whether the suspect or murderer was on the East side of town and display the
  // appropriate response for the question
  const side = game.gameData.locations[hashMap[subjectId]].address.side;
  const display = side === "East" ? response.affirmative : response.negative;

  return { answer: display };
};

const checkMurdererGender = (game, subjectId, response) => {
  // Check whether the murderer is male and display the appropriate response
  const display =
    game.setupData.characters[game.gameData.murderer].gender === "M"
      ? response.affirmative
      : response.negative;

  return { answer: display };
};

const checkTownLocation = (game, subjectId, response) => {
  // Get the hash map
  const hashMap = makeLocationHashMap(game.gameData);

  // Get the part of town the subject went to and append it to the affirmative
  // response for display (there is no negative response)
  const display =
    response.affirmative +
    game.gameData.locations[hashMap[subjectId]].address.town;

  return { answer: display };
};

const checkMurderWeapon = (game, subjectId, response) => {
  // Check the victim to see whether the weapon used was a .38 and display the response
  const display =
    game.gameData.weapon === ".38" ? response.affirmative : response.negative;

  return { answer: display };
};

const check38Location = (game, subjectId, response) => {
  // Display the location of the .38 from the collection of weapons data
  let weaponLoc = "";
  Object.entries(game.gameData.locations).forEach(locArr => {
    if (locArr[1].weapon.type === ".38") {
      weaponLoc = locArr[0];
    }
  });

  const display =
    response.affirmative + game.gameData.locations[weaponLoc].name;
  return { answer: display };
};

const check45Location = (game, subjectId, response) => {
  // Display the location of the .45 from the collection of weapons data
  let weaponLoc = "";
  console.log("entries", Object.entries(game.gameData.locations));
  Object.entries(game.gameData.locations).forEach(locArr => {
    if (locArr[1].weapon.type === ".45") {
      weaponLoc = locArr[0];
    }
  });

  const display =
    response.affirmative + game.gameData.locations[weaponLoc].name;
  return { answer: display };
};

const checkEmptySeat = (game, subjectId, response) => {
  // Display the location name of the place with only three suspects
  let occLoc = "";
  Object.entries(game.gameData.locations).forEach(locArr => {
    if (locArr[1].occupants.length === 3) {
      occLoc = locArr[0];
    }
  });

  const display = response.affirmative + game.gameData.locations[occLoc].name;
  return { answer: display };
};

const checkPlaceNames = (game, subjectId, response) => {
  // Get the hash map
  const hashMap = makeLocationHashMap(game.gameData);

  // Check if the subject was at location A, B, or C and respond appropriately
  const locID = hashMap[subjectId];

  const display =
    locID === "A" || locID === "B" || locID === "C"
      ? response.affirmative
      : response.negative;
  return { answer: display };
};

const checkWeaponLocation = (game, subjectId, response) => {
  // Get the hash map
  const hashMap = makeLocationHashMap(game.gameData);

  // Check whether the character was at a location with a weapon
  const display =
    game.gameData.locations[hashMap[subjectId]].weapon === ""
      ? response.negative
      : response.affirmative;

  return { answer: display };
};

const checkPrints = (game, subjectId, response, targetWeapon) => {
  // Get the hash map
  const hashMap = makeLocationHashMap(game.gameData);
  const weapon = game.gameData.locations[hashMap[subjectId]].weapon;

  // one is trickier. Only people who were at a location with a weapon can answer.
  if (weapon === null || weapon.type !== targetWeapon) {
    return { answer: response.unknown };
  }

  // If the character is the same gender as the murderer then they have to give a truthful answer
  const subjectGender = game.setupData.characters[subjectId].gender;
  const murdererGender =
    game.setupData.characters[game.gameData.murderer].gender;
  if (subjectGender === murdererGender) {
    const display =
      weapon.fingerprint === "odd" ? response.affirmative : response.negative;
    return { answer: display };
  }

  // If the character is not the same gender as the murderer then they might lie. It's a coin toss.
  const lie = getRandomInt(2);
  const display = lie ? response.negative : response.affirmative;
  return { answer: display };
};
