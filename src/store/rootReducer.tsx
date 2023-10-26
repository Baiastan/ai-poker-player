import { combineReducers } from 'redux';
import deckCardReducer from './deck/reducers';

const rootReducer = combineReducers({
  deck: deckCardReducer,
});

export default rootReducer;
