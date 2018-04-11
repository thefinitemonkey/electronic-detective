import { createStore, applyMiddleware, compose } from "redux";
//import thunk from "redux-thunk";
import createSagaMiddleware from "redux-saga";
import game from "../reducers/game";
import { getSetupDataSaga } from "../sagas/index";

const logger = store => next => action => {
  console.group(action.type);
  console.info("dispatching", action);
  let result = next(action);
  console.log("next state", store.getState());
  console.groupEnd(action.type);
  return result;
};
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const sagaMiddleware = createSagaMiddleware();

const store = () => {
  const newStore = createStore(game, composeEnhancers(applyMiddleware(sagaMiddleware, logger)));
  sagaMiddleware.run(getSetupDataSaga);
  return newStore;
};

export default store;
