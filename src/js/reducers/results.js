import { Map, List} from 'immutable';

import {
  SETUP_REQUESTS,
  FETCH_PACKAGE_REQUEST,
  FETCH_PACKAGE_SUCCESS,
  FETCH_PACKAGE_FAILURE
} from '../actions';

const initialState = Map({
  isFetching: false,
  errored: false,
  response: List(),
  completed: 0,
  total: 0
});

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SETUP_REQUESTS:
      return state
        .set('response', List())
        .set('total', action.numberOfPackages);
    case FETCH_PACKAGE_REQUEST:
      return state
        .set('isFetching', true)
        .set('errored', false);
    case FETCH_PACKAGE_SUCCESS:
      return state
        .set('completed', state.get('completed') + 1)
        .set('isFetching', false)
        .set('errored', false);
    case FETCH_PACKAGE_FAILURE:
      return state
        .set('completed', state.get('completed') + 1)
        .set('isFetching', false)
        .set('errored', true);
    default:
      return state;
  }
};
