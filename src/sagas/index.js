import { call, put, take } from "redux-saga/effects";
import { GET_SETUP_DATA, RECEIVE_GET_SETUP_DATA } from "../actions/index";
import * as Api from "../api/Api";

export function* getSetupDataSaga() {
  yield take(GET_SETUP_DATA);
  const setupData = yield call(Api.getSetupData);
  yield put({ type: RECEIVE_GET_SETUP_DATA, setupData });
}
