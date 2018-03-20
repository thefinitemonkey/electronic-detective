import {
  RECEIVE_GET_SETUP_DATA,
  BUILD_GAME,
  CHANGE_GAME_SCREEN,
  SET_PLAYER_TURN,
  UPDATE_PLAYER_CLUES,
  UPDATE_SUSPECT_STATEMENT
} from "../actions/index.js";
import { R_OK } from "constants";

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
  const { setupData, gameData, screen, playerId, sheet, data } = action;

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
        typeof playerId !== "number"
      )
        return state;
      const gameData = { ...state.gameData };
      const sheets = { ...gameData.sheets };
      const sheet = sheets[playerId];
      const newStatement = {};
      newStatement[data.suspectId] = data.statement;
      const statements = sheet.suspectStatements;
      const suspectStatements = { ...statements, ...newStatement };
      const revisedSheet = { ...sheet, suspectStatements };
      const revisedSheetObj = {};
      revisedSheetObj[playerId] = revisedSheet;
      const revisedSheets = { ...sheets, ...revisedSheetObj };
      const revisedGameData = { ...gameData, sheets: revisedSheets };
      return { ...state, gameData: revisedGameData };
    }
    default:
      return state;
  }
};

export default game;
