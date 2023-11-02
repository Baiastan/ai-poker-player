import { combineReducers } from 'redux';
import deckCardReducer from './deck/reducers';
import openAIReducer from './open-ai/reducers';

const rootReducer = combineReducers({
  deck: deckCardReducer,
  ai: openAIReducer,
});

export default rootReducer;
