import {
  RECEIVE_GET_SETUP_DATA,
  BUILD_GAME,
  CHANGE_GAME_SCREEN,
  SET_PLAYER_TURN,
  UPDATE_PLAYER_CLUES,
  UPDATE_SUSPECT_STATEMENT,
  UPDATE_LOCATION_OCCUPANT,
  UPDATE_LOCATION_ADDRESS,
  CREATE_SUSPECT_ALIBI,
  END_PLAYER_TURN,
  ACCUSE_SUSPECT,
  RESET_GAME,
  SET_GAME_DIFFICULTY,
  SET_NEW_TURN,
  UPDATE_TURN_DATA
} from "../actions/index.js";

/* 
The default state for the game is
{ setupData: {}, 
  gameData: {}, 
  screen: "loading", 
  playerId: null, 
  difficulty: 3, 
  turn: { 
    display: "list", 
    interrogationSuspect: 0, 
    questionsRemaining: 3, 
    questionsAnswered: {}, 
    answerOrder: [] 
  } 
}

Populated categories looks like
{ setupData: {
  characters: {...}, 
  locations: {...}, 
  questions: {...}, 
  weapons: {...}, 
  addresses: {...}, 
  sheet: {...},
}
  gameData: {
    murderer: int, 
    victim: int, 
    weapon: int, 
    locations: {...}, 
    sheets: {...} 
  } 
}
*/

const game = (
  state = {
    setupData: {},
    gameData: {},
    screen: "loading",
    playerId: null,
    difficulty: 3,
    turn: {
      display: "list",
      interrogationSuspect: 0,
      questionsRemaining: 3,
      questionsAnswered: {},
      answerOrder: []
    }
  },
  action
) => {
  const { setupData, gameData, screen, playerId, sheet, data } = action;

  switch (action.type) {
    case SET_NEW_TURN: {
      return {
        ...state,
        turn: {
          display: "list",
          interrogationSuspect: 0,
          questionsRemaining: state.difficulty,
          questionsAnswered: {},
          answerOrder: []
        }
      };
    }
    case UPDATE_TURN_DATA: {
      if (!data) return state;
      return { ...state, turn: { ...state.turn, ...data } };
    }
    case RESET_GAME: {
      return { ...state, gameData: {}, screen: "players", playerId: null };
    }
    case SET_GAME_DIFFICULTY: {
      if (!data.level) return state;
      return {
        ...state,
        difficulty: data.level,
        turn: { ...state.turn, questionsRemaining: data.level }
      };
    }
    case END_PLAYER_TURN: {
      const sheetKeys = Object.keys(state.gameData.sheets);
      const playerIndex = sheetKeys.indexOf(state.playerId.toString());
      const newIndex =
        playerIndex === sheetKeys.length - 2 ? 0 : playerIndex + 1;
      const newPlayer = sheetKeys[newIndex];
      return {
        ...state,
        playerId: newPlayer,
        screen: "startturn",
        turn: {
          display: "list",
          interrogationSuspect: 0,
          questionsRemaining: state.difficulty,
          questionsAnswered: {},
          answerOrder: []
        }
      };
    }
    case ACCUSE_SUSPECT: {
      if (
        playerId === undefined ||
        data.suspectId === undefined ||
        data.murdererId === undefined
      )
        return state;
      if (data.suspectId === data.murdererId)
        return { ...state, screen: "solved" };

      const newSheets = { ...state.gameData.sheets };
      newSheets.numPlayers = newSheets.numPlayers - 1;
      const sheetKeys = Object.keys(newSheets);
      // Don't consider the numPlayers key when determining who the next
      // player will be once this one is removed
      const currentPlayerIndex = sheetKeys.indexOf(playerId.toString());
      const nextIndex =
        currentPlayerIndex === sheetKeys.length - 2
          ? 0
          : currentPlayerIndex + 1;
      const newPlayerId = sheetKeys[nextIndex];
      delete newSheets[playerId];
      const newGameData = { ...state.gameData, sheets: newSheets };
      const newState = {
        ...state,
        gameData: newGameData,
        screen: "unsolved",
        playerId: newPlayerId
      };
      return newState;
    }
    case RECEIVE_GET_SETUP_DATA:
      return { ...state, setupData };
    case BUILD_GAME:
      return { ...state, gameData };
    case CHANGE_GAME_SCREEN:
      return { ...state, screen };
    case SET_PLAYER_TURN:
      return { ...state, playerId };
    case UPDATE_PLAYER_CLUES: {
      const gameData = { ...state.gameData };
      const sheets = { ...gameData.sheets };
      sheets[playerId] = sheet;
      const newGameData = { ...gameData, sheets };
      return { ...state, gameData: newGameData };
    }
    case UPDATE_SUSPECT_STATEMENT: {
      if (
        !data ||
        data.suspectId === null ||
        data.statement === null ||
        playerId === null
      )
        return state;
      const gameData = state.gameData;
      const sheets = gameData.sheets;
      const sheet = sheets[playerId];
      const statements = sheet.suspectStatements;
      const revisedSuspectStatements = { ...statements };
      revisedSuspectStatements[data.suspectId] = data.statement;
      const revisedSheet = {
        ...sheet,
        suspectStatements: revisedSuspectStatements
      };
      const revisedSheets = { ...sheets };
      revisedSheets[playerId] = revisedSheet;
      const revisedGameData = { ...gameData, sheets: revisedSheets };
      return { ...state, gameData: revisedGameData };
    }
    case UPDATE_LOCATION_OCCUPANT: {
      if (
        !data ||
        data.locationId === null ||
        data.arrayIndex === null ||
        data.value === null
      )
        return state;
      const gameData = state.gameData;
      const sheets = gameData.sheets;
      const sheet = sheets[playerId];
      const locations = sheet.locations;
      const location = locations[data.locationId];
      const newOccupants = location.occupants.slice(0);
      newOccupants.splice(data.arrayIndex, 1, data.value);
      const revisedLocation = { ...location, occupants: newOccupants };
      const revisedLocations = { ...locations };
      revisedLocations[data.locationId] = revisedLocation;
      const revisedSheet = { ...sheet, locations: revisedLocations };
      const revisedSheets = { ...sheets };
      revisedSheets[playerId] = revisedSheet;
      const revisedGameData = { ...gameData, sheets: revisedSheets };
      return { ...state, gameData: revisedGameData };
    }
    case UPDATE_LOCATION_ADDRESS: {
      if (
        !data ||
        data.locationId === null ||
        data.area === null ||
        data.value === null
      )
        return state;

      const gameData = state.gameData;
      const sheets = gameData.sheets;
      const sheet = sheets[playerId];
      const locations = sheet.locations;
      const location = locations[data.locationId];
      const revisedAddress = { ...location.address };
      revisedAddress[data.part] = data.value;
      const revisedLocation = { ...location, address: revisedAddress };
      const revisedLocations = { ...locations };
      revisedLocations[data.locationId] = revisedLocation;
      const revisedSheet = { ...sheet, locations: revisedLocations };
      const revisedSheets = { ...sheets };
      revisedSheets[playerId] = revisedSheet;
      const revisedGameData = { ...gameData, sheets: revisedSheets };
      return { ...state, gameData: revisedGameData };
    }
    case CREATE_SUSPECT_ALIBI: {
      console.log("Create alibi", data);
      if (!data || data.suspecId === null || data.alibiArr === null)
        return state;

      const gameData = state.gameData;
      const alibis = gameData.alibis || {};
      const alibi = {};
      alibi[data.suspectId] = data.alibiArr;
      const newAlibis = { ...alibis, ...alibi };
      const newGameData = { ...gameData, alibis: newAlibis };
      return { ...state, gameData: newGameData };
    }
    default:
      return state;
  }
};

export default game;
