import {
  RECEIVE_GET_SETUP_DATA,
  BUILD_GAME,
  CHANGE_GAME_SCREEN,
  SET_PLAYER_TURN
} from "../actions/index.js";

/* 
The default state for the game is
{ setupData: {}, gameData: {} }

Populated categories looks like
{ setupData: {characters: {...}, locations: {...}, questions: {...}, weapons: {...}, addresses: {...}, sheet: {...},
              gameData: {murderer: int, victim: int, weapon: int, locations: {...}, sheets: {...} } } }
*/

const game = (
  state = { setupData: {}, gameData: {}, screen: "loading", player: null },
  action
) => {
  const { setupData, gameData, screen, player } = action;

  switch (action.type) {
    case RECEIVE_GET_SETUP_DATA:
      return { ...state, setupData };
    case BUILD_GAME:
      return { ...state, gameData };
    case CHANGE_GAME_SCREEN:
      return { ...state, screen };
    case SET_PLAYER_TURN:
      return { ...state, player };
    default:
      return state;
  }
};

export default game;
