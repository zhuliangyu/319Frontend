import * as actions from '../constants/action-types';

const INITIAL_STATE = {
  searchResults: [],
  searchSuccess: false,
  searchFailure: false,
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
        searchResults: action.payload.results,
        searchSuccess: true,
      }
    case actions.PERFORM_SEARCH_FAILURE:
      return {
        ...state,
        searchFailure: true,
      }
    default:
      return state;
  }
};

export default searchReducer;