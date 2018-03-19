import {
  RECEIVE_GET_SETUP_DATA,
  BUILD_GAME,
  CHANGE_GAME_SCREEN,
  SET_PLAYER_TURN,
  UPDATE_PLAYER_CLUES
} from "../actions/index.js";

/* 
The default state for the game is
{ setupData: {}, gameData: {} }

Populated categories looks like
{ setupData: {characters: {...}, locations: {...}, questions: {...}, weapons: {...}, addresses: {...}, sheet: {...},
              gameData: {murderer: int, victim: int, weapon: int, locations: {...}, sheets: {...} } } }
*/

const game = (
  state = { setupData: {}, gameData: {}, screen: "loading", playerId: null },
  action
) => {
  const { setupData, gameData, screen, playerId, sheet } = action;

  switch (action.type) {
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
      gameData.sheets[playerId] = sheet;
      return { ...state, gameData };
    }
    default:
      return state;
  }
};

export default game;
