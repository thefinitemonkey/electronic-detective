import { getRandomInt } from "../../utils/builder";

class AnswerLogic {
  static getQuestionResponse = (game, suspectId, question) => {
    // Determine which question function to use and data to pass
    // based on the question passed in
    const subjectId =
      question.subject === "murderer" ? game.gameData.murderer : suspectId;
    const response = question.responseText;

    switch (question.answerFunction) {
      case "checkEastSide":
        return this.checkEastSide(game, subjectId, response);
      case "checkMurdererGender":
        return this.checkMurdererGender(game, subjectId, response);
      case "checkTownLocation":
        return this.checkTownLocation(game, subjectId, response);
      case "checkMurderWeapon":
        return this.checkMurderWeapon(game, subjectId, response);
      case "check38Location":
        return this.check38Location(game, subjectId, response);
      case "check45Location":
        return this.check45Location(game, subjectId, response);
      case "checkEmptySeat":
        return this.checkEmptySeat(game, subjectId, response);
      case "checkPlaceNames":
        return this.checkPlaceNames(game, subjectId, response);
      case "checkWeaponLocation":
        return this.checkWeaponLocation(game, subjectId, response);
      case "checkPrints":
        return this.checkPrints(game, subjectId, response, question.subject);
    }
  };

  makeLocationHashMap = gameData => {
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

  checkEastSide = (game, subjectId, response) => {
    // Get the hash map
    const hashMap = this.makeLocationHashMap(game.gameData);

    // Check whether the suspect or murderer was on the East side of town and display the
    // appropriate response for the question
    const side = game.gameData.locations[hashMap[subjectId]].address.side;
    const display = side === "East" ? response.affirmative : response.negative;

    return { answer: display };
  };

  checkMurdererGender = (game, subjectId, response) => {
    // Check whether the murderer is male and display the appropriate response
    const display =
      game.setupData.characters[game.gameData.murderer].gender === "M"
        ? response.affirmative
        : response.negative;

    return { answer: display };
  };

  checkTownLocation = (game, subjectId, response) => {
    // Get the hash map
    const hashMap = this.makeLocationHashMap(game.gameData);

    // Get the part of town the subject went to and append it to the affirmative
    // response for display (there is no negative response)
    const display =
      response.affirmative +
      game.gameData.locations[hashMap[subjectId]].address.town;

    return { answer: display };
  };

  checkMurderWeapon = (game, subjectId, response) => {
    // Check the victim to see whether the weapon used was a .38 and display the response
    const display =
      game.gameData.weapon === ".38" ? response.affirmative : response.negative;

    return { answer: display };
  };

  check38Location = (game, subjectId, response) => {
    // Display the location of the .38 from the collection of weapons data
    let weaponLoc = "";
    Object.entries(game.gameData.locations).forEach(locArr => {
      if (locArr[1].weapon === ".38") {
        weaponLoc = locArr[0];
      }
    });

    const display =
      response.affirmative + game.gameData.locations[weaponLoc].name;
    return { answer: display };
  };

  check45Location = (game, subjectId, response) => {
    // Display the location of the .45 from the collection of weapons data
    let weaponLoc = "";
    Object.entries(game.gameData.locations).forEach(locArr => {
      if (locArr[1].weapon === ".45") {
        weaponLoc = locArr[0];
      }
    });

    const display =
      response.affirmative + game.gameData.locations[weaponLoc].name;
    return { answer: display };
  };

  checkEmptySeat = (game, subjectId, response) => {
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

  checkPlaceNames = (game, subjectId, response) => {
    // Get the hash map
    const hashMap = this.makeLocationHashMap(game.gameData);

    // Check if the subject was at location A, B, or C and respond appropriately
    const locID = hashMap[subjectId];

    const display =
      locID === "A" || locID === "B" || locID === "C"
        ? response.affirmative
        : response.negative;
    return { answer: display };
  };

  checkWeaponLocation = (game, subjectId, response) => {
    // Get the hash map
    const hashMap = this.makeLocationHashMap(game.gameData);

    // Check whether the character was at a location with a weapon
    const display =
      game.gameData.locations[hashMap[subjectId]].weapon === null
        ? response.negative
        : response.affirmative;

    return { answer: display };
  };

  checkPrints = (game, subjectId, response, targetWeapon) => {
    // Get the hash map
    const hashMap = this.makeLocationHashMap(game.gameData);
    const weapon = game.gameData.locations[hashMap[subjectId]].weapon;

    // This one is trickier. Only people who were at a location with a weapon can answer.
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
    const lie = this.getRandomInt(2);
    const display = lie ? response.negative : response.affirmative;
    return { answer: display };
  };
}

export default AnswerLogic;
