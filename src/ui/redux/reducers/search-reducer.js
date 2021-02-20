import * as actions from '../constants/action-types';

const INITIAL_STATE = {
  searchResults: [],
};

const searchReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actions.FETCH_FILTERS:
      return {
        ...state,
        filters: action.payload.data
      };
    case actions.PERFORM_SEARCH_SUCCESS:
      return {
        ...state,
        searchResults: action.payload.results
      }
    default:
      return state;
  }
};

export default searchReducer;