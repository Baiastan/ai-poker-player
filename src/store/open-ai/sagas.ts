import { takeEvery, call, put, select } from 'redux-saga/effects';
import { requestGpt, requestSucceeded, requestFailed } from './actions';
import { REQUEST_GPT } from './actions';

const selectedCards = (state) => state.deck.selectedCards;
const gtpUrl = 'http://localhost:3001/api/ai/poker';

const fetchOpenAISuggestions = function* () {
  try {
    const cardsOnHand = yield select(selectedCards);

    const response = yield call(fetch, gtpUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(cardsOnHand),
    });

    if (response.ok) {
      const data = yield call([response, 'json']);
      yield put(requestSucceeded(data.message));
    } else {
      yield put(requestFailed('Error fetching gpt'));
    }
  } catch (error) {
    yield put(requestFailed(error.message));
  }
};

export function* watchOpenAISuggestions() {
  yield takeEvery(REQUEST_GPT, fetchOpenAISuggestions);
}
