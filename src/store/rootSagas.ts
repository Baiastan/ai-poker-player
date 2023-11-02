import { all } from 'redux-saga/effects';
import { watchOpenAISuggestions } from './open-ai/sagas';

export default function* rootSaga() {
  yield all([
    watchOpenAISuggestions(),
    // any other watchers you have...
  ]);
}
