import * as actions from '../constants/action-types';

const INITIAL_STATE = {
  filters: []
};

const searchReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actions.FETCH_FILTERS:
      return {
        ...state,
        filters: action.payload.data
      };
    default:
      return state;
  }
};

export default searchReducer;