import {Map, Stack} from 'immutable';
import actionTypes from '../actions/types';
import requestStatusTypes from '../utils/requestStatusTypes';

const initialState = {
  beginGameId: null,
  startNewGameRequestStatus: requestStatusTypes.UNINITIALIZED,
  joinCurrentGameRequestStatus: requestStatusTypes.UNINITIALIZED,
  gameConfigRequestStatus: requestStatusTypes.UNINITIALIZED,
  gameConfig: new Map(),
  gameEventStack: new Stack(),
  gameEventMessage: 'No game events',
  gameEventRequestStatus: requestStatusTypes.UNINITIALIZED
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.START_NEW_GAME_REQUESTED:
      return {
        ...state,
        startNewGameRequestStatus: requestStatusTypes.PENDING
      };
    case actionTypes.START_NEW_GAME_SUCCEEDED:
      return {
        ...state,
        beginGameId: action.gameId,
        startNewGameRequestStatus: requestStatusTypes.SUCCEEDED
      };
    case actionTypes.START_NEW_GAME_FAILED:
      return {
        ...state,
        startNewGameRequestStatus: requestStatusTypes.FAILED
      };
    case actionTypes.JOIN_CURRENT_GAME_REQUESTED:
      return {
        ...state,
        joinCurrentGameRequestStatus: requestStatusTypes.PENDING
      };
    case actionTypes.JOIN_CURRENT_GAME_SUCCEEDED:
      return {
        ...state,
        beginGameId: action.gameId,
        joinCurrentGameRequestStatus: requestStatusTypes.SUCCEEDED
      };
    case actionTypes.JOIN_CURRENT_GAME_FAILED:
      return {
        ...state,
        joinCurrentGameRequestStatus: requestStatusTypes.FAILED
      };
    case actionTypes.GAME_CONFIG_REQUESTED:
      return {
        ...state,
        gameConfigRequestStatus: requestStatusTypes.PENDING
      };
    case actionTypes.GAME_CONFIG_SUCCEEDED:
      return {
        ...state,
        gameConfig: action.gameConfig,
        gameConfigRequestStatus: requestStatusTypes.SUCCEEDED
      };
    case actionTypes.GAME_CONFIG_FAILED:
      return {
        ...state,
        gameConfigError: action.error,
        gameConfigRequestStatus: requestStatusTypes.FAILED
      };
    case actionTypes.NEW_GAME_EVENT:
      return {
        ...state,
        gameEventStack: state.gameEventStack.push(action.gameEvent)
      };
    case actionTypes.NEW_GAME_EVENT_REQUESTED:
      return {
        ...state,
        gameEventMessage: '',
        gameEventRequestStatus: requestStatusTypes.PENDING
      };
    case actionTypes.NEW_GAME_EVENT_SUCCEEDED:
      return {
        ...state,
        gameEventStack: state.gameEventStack.push(action.gameEvent),
        gameEventMessage: action.eventSuccess,
        gameEventRequestStatus: requestStatusTypes.SUCCEEDED
      };
    case actionTypes.NEW_GAME_EVENT_FAILED:
      return {
        ...state,
        gameEventMessage: action.eventError,
        gameEventRequestStatus: requestStatusTypes.FAILED
      };
    default:
      return state;
  }
};