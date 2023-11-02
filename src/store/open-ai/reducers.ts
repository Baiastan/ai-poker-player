import { Record } from 'immutable';

import * as actions from './actions';

import { cards } from '../../components/cards/cardsData';

interface GptSuggestionsProps {
  handCards: string;
  possibleHands: string;
  highestPossibleHand: string;
  currentHighestHand: string;
  suggestion: string;
  action: string;
}

const GptSuggestionsStructure: GptSuggestionsProps = {
  handCards: '',
  possibleHands: '',
  highestPossibleHand: '',
  currentHighestHand: '',
  suggestion: '',
  action: '',
};

export const GptRecord = Record(GptSuggestionsStructure);

const initialState = new GptRecord();

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const openAIReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case actions.REQUEST_GPT_SUCCEEDED: {
      return state.merge({ handCards: action.payload.handCards });
    }
    case actions.SET_SUGGESTION: {
      console.log('reducers: ', action.suggestion);

      return state.merge({ suggestion: action.suggestion });
    }

    default:
      return initialState;
  }
};

export default openAIReducer;
