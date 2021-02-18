import { combineReducers } from 'redux';
import searchReducer from './reducers/search-reducer';

export default combineReducers({
  searchReducer: searchReducer,
});
