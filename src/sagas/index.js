import { call, all, put, take } from "redux-saga/effects";
import { GET_SETUP_DATA, RECEIVE_GET_SETUP_DATA } from "../actions/index";
//import * as Api from "../api/Api";

export function* getSetupDataSaga() {
  yield take(GET_SETUP_DATA);

  const [sh, ch, lo, qu, we, ad] = yield all([
    call(fetch, "/json/casesheet.json"),
    call(fetch, "/json/characters.json"),
    call(fetch, "/json/locations.json"),
    call(fetch, "/json/questions.json"),
    call(fetch, "/json/weapons.json"),
    call(fetch, "/json/addresses.json")
  ]);

  const [
    sheet,
    characters,
    locations,
    questions,
    weapons,
    addresses
  ] = yield all([
    (sh.json()),
    (ch.json()),
    (lo.json()),
    (qu.json()),
    (we.json()),
    (ad.json())
  ]);

  //const setupData = yield call(Api.getSetupData);
  yield put({
    type: RECEIVE_GET_SETUP_DATA,
    setupData: { sheet, characters, locations, questions, weapons, addresses }
  });
}
