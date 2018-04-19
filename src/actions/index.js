//import * as Api from "../api/Api";
import * as Builder from "../utils/builder";

export const GET_SETUP_DATA = "GET_SETUP_DATA";
export const RECEIVE_GET_SETUP_DATA = "RECEIVE_GET_SETUP_DATA";
export const BUILD_GAME = "BUILD_GAME";
export const CHANGE_GAME_SCREEN = "CHANGE_GAME_SCREEN";
export const SET_PLAYER_TURN = "SET_PLAYER_TURN";
export const UPDATE_PLAYER_CLUES = "UPDATE_PLAYER_CLUES";
export const UPDATE_SUSPECT_STATEMENT = "UPDATE_SUSPECT_STATEMENT";
export const UPDATE_LOCATION_OCCUPANT = "UPDATE_LOCATION_OCCUPANT";
export const UPDATE_LOCATION_ADDRESS = "UPDATE_LOCATION_ADDRESS";
export const UPDATE_LOCATION_WEAPON = "UPDATE_LOCATION_WEAPON";
export const CREATE_SUSPECT_ALIBI = "CREATE_SUSPECT_ALIBI";
export const END_PLAYER_TURN = "END_PLAYER_TURN";
export const ACCUSE_SUSPECT = "ACCUSE_SUSPECT";
export const RESET_GAME = "RESET_GAME";
export const SET_GAME_DIFFICULTY = "SET_GAME_DIFFICULTY";
export const SET_NEW_TURN = "SET_NEW_TURN";
export const UPDATE_TURN_DATA = "UPDATE_TURN_DATA";

export const resetGame = () => {
  return {
    type: RESET_GAME
  };
};

export const setGameDifficulty = level => {
  return {
    type: SET_GAME_DIFFICULTY,
    data: { level }
  };
};

export const updateTurnData = data => {
  return {
    type: UPDATE_TURN_DATA,
    data
  };
};

export const setNewTurn = () => {
  return {
    type: SET_NEW_TURN
  };
};

export const getSetupData = () => {
  /*Api.getSetupData().then(data => {
    dispatch(receiveGetSetupData(data));
  });*/
  return {
    type: GET_SETUP_DATA
  };
};

export const receiveGetSetupData = setupData => {
  return {
    type: RECEIVE_GET_SETUP_DATA,
    setupData
  };
};

export const endPlayerTurn = () => {
  return {
    type: END_PLAYER_TURN
  };
};

export const accuseSuspect = (playerId, suspectId, murdererId) => {
  return {
    type: ACCUSE_SUSPECT,
    playerId,
    data: { suspectId, murdererId }
  };
};

/*
export const buildGame = (setupData, players = []) => dispatch => {
  dispatch(finalizeBuildGame(Builder.buildGame(setupData, players)));
};
*/

export const finalizeBuildGame = gameData => {
  return {
    type: BUILD_GAME,
    gameData
  };
};

export const changeGameScreen = screen => {
  return {
    type: CHANGE_GAME_SCREEN,
    screen
  };
};

export const setPlayerTurn = playerId => {
  return {
    type: SET_PLAYER_TURN,
    playerId
  };
};

export const updatePlayerClues = (playerId, sheet) => {
  return {
    type: UPDATE_PLAYER_CLUES,
    playerId,
    sheet
  };
};

export const updateSuspectStatement = (playerId, suspectId, statement) => {
  return {
    type: UPDATE_SUSPECT_STATEMENT,
    playerId,
    data: {
      suspectId,
      statement
    }
  };
};

export const updateLocationOccupant = (
  playerId,
  locationId,
  arrayIndex,
  value
) => {
  return {
    type: UPDATE_LOCATION_OCCUPANT,
    playerId,
    data: {
      locationId,
      arrayIndex,
      value
    }
  };
};

export const updateLocationAddress = (playerId, locationId, part, value) => {
  return {
    type: UPDATE_LOCATION_ADDRESS,
    playerId,
    data: {
      locationId,
      part,
      value
    }
  };
};

export const updateLocationWeapon = (playerId, locationId, value) => {
  return {
    type: UPDATE_LOCATION_WEAPON,
    playerId,
    data: {
      value
    }
  };
};

export const createAlibi = (
  playerId,
  suspectId,
  gameData,
  setupData,
  characterLocations
) => {
  // Create array of the list of possible alibi facts to provide
  const arrFacts = ["side", "town", "location", "suspect", "suspect"];

  // Get a random number of facts (zero-based)
  const numFacts = Builder.getRandomInt(3);

  // Build a secondary array of the facts that will be shared in the alibi
  let arrSelectedFacts = [];
  for (let i = 0; i < numFacts + 1; i++) {
    const factPos = Builder.getRandomInt(arrFacts.length);
    arrSelectedFacts.push(arrFacts[factPos]);
    arrFacts.splice(factPos, 1);
  }

  // Create a duplicate of the attendees that we'll be able to work with
  const attendeeArr = [];
  const suspectLocation = characterLocations[suspectId];
  const location = gameData.locations[suspectLocation];
  location.occupants.forEach(occupant => {
    if (occupant !== suspectId) attendeeArr.push(occupant);
  });

  // Create an array for holding the facts that will be shared in the alibi
  const alibiArr = [];
  arrSelectedFacts.forEach((fact, pos) => {
    switch (fact) {
      case "side":
        alibiArr.push({
          id: pos,
          fact: `I was on the ${
            gameData.locations[suspectLocation].address.side
          } side`
        });
        break;
      case "town":
        alibiArr.push({
          id: pos,
          fact: `I was in the ${
            gameData.locations[suspectLocation].address.town
          } area`
        });
        break;
      case "location":
        alibiArr.push({
          id: pos,
          fact: `I was at the ${gameData.locations[suspectLocation].name}`
        });
        break;
      case "suspect":
        const attendeeNum = Builder.getRandomInt(attendeeArr.length);
        alibiArr.push({
          id: pos,
          fact: `I was with ${
            setupData.characters[attendeeArr[attendeeNum]].name
          }`
        });
        attendeeArr.splice(attendeeNum, 1);
        break;
      default: {
      }
    }
  });

  console.log("Alibi created", alibiArr);

  return {
    type: CREATE_SUSPECT_ALIBI,
    playerId,
    data: {
      suspectId,
      alibiArr
    }
  };
};
