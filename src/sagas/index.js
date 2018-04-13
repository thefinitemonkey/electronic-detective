import { call, all, put, take } from "redux-saga/effects";
import { GET_SETUP_DATA, RECEIVE_GET_SETUP_DATA } from "../actions/index";
import {getSetupDataFile} from "../api/Api";
//import * as Api from "../api/Api";

export function* getSetupDataSaga() {
  yield take(GET_SETUP_DATA);

  const [sheet, characters, locations, questions, weapons, addresses] = yield all([
    call(getSetupDataFile, "/json/casesheet.json"),
    call(getSetupDataFile, "/json/characters.json"),
    call(getSetupDataFile, "/json/locations.json"),
    call(getSetupDataFile, "/json/questions.json"),
    call(getSetupDataFile, "/json/weapons.json"),
    call(getSetupDataFile, "/json/addresses.json")
  ]);

  yield put({
    type: RECEIVE_GET_SETUP_DATA,
    setupData: { sheet, characters, locations, questions, weapons, addresses }
  });
}
