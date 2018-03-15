import * as Api from "../api";
import * as Builder from "../utils/builder";

export const RECEIVE_GET_SETUP_DATA;
export const BUILD_GAME;

export const getSetupData = () => dispatch => {
    Api.getSetupData().then(data => {dispatch(receiveGetSetupData(data))});
}

export const receiveGetSetupData = setupData => {
    return {
        type: RECEIVE_GET_SETUP_DATA,
        setupData
    }
}

export const buildGame = (setupData, numPlayers) => dispatch => {
    dispatch(finalizeBuildGame(Builder.buildGame(setupData, numPlayers)));
}

export const finalizeBuildGame = gameData => {
    return{
        type: BUILD_GAME,
        gameData
    }
}