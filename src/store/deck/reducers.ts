import { Record } from 'immutable';

import * as actions from './actions';
import {
  cardShuffler,
  popSelectedCard,
  renderAndPopCards,
} from '../../lib/utils';
import { Card, ResponseData } from '../../types/card';
import { cards } from '../../components/cards/cardsData';

interface DeckRecordProps {
  deck: Card[];
  cut: boolean;
  renderedCards: Card[];
  shuffledCards: Card[];
  selectedCards: Card[];
  numberOfCuts: number;
  actionText: string;
  responseData: ResponseData;
  numberOfShuffles: number;
  destination: string;
  numberOfPlayers: number;
}

const DeckRecordStructure: DeckRecordProps = {
  deck: cards,
  cut: false,
  responseData: {
    currentRank: '',
    handStrength: 0,
    aiSuggestion: '',
    params: {
      action: '',
      level: '',
      color: '#2e2e2e',
    },
  },
  renderedCards: [],
  selectedCards: [],
  shuffledCards: cardShuffler(cards),
  numberOfCuts: 0,
  destination: 'selectedCards',
  numberOfShuffles: 1,
  actionText: '',
  numberOfPlayers: 0,
};

export const DeckRecord = Record(DeckRecordStructure);

const initialState = new DeckRecord();

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const deckCardReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case actions.CUT_CARD: {
      if (state.get('shuffledCards').length === 0) {
        return state.merge({ actionText: 'No Cards to Cut' });
      }
      const updatedShuffledCards = state.get('shuffledCards').slice(0, -1);

      return state.merge({
        shuffledCards: updatedShuffledCards,
        numberOfCuts: state.get('numberOfCuts') + 1,
        cut: true,
        actionText: 'Cut',
      });
    }

    case actions.SET_RESPONSE_DATA: {
      return state.merge({
        responseData: action.payload,
      });
    }

    case actions.RENDER_CARDS: {
      const { renderedCards, newDeck } = renderAndPopCards(
        state.get('shuffledCards'),
        action.numToRender,
      );

      if (action.numToRender === 52) {
        if (state.get('renderedCards').length === 52) {
          return state.merge({
            renderedCards: [],
            cut: false,
            shuffledCards: cardShuffler(cards),
            actionText: 'All Cards are rendered - Initializing',
          });
        }
        return state.merge({
          renderedCards: [...state.get('renderedCards'), ...renderedCards],
          shuffledCards: newDeck,
          actionText: 'No Cards In the Deck',
        });
      } else if (action.numToRender === 2) {
        return state.merge({
          selectedCards: [...state.get('selectedCards'), ...renderedCards],
          shuffledCards: newDeck,
          actionText: '',
        });
      } else {
        return state.merge({
          renderedCards: [...state.get('renderedCards'), ...renderedCards],
          cut: false,
          shuffledCards: newDeck,
          actionText: '',
        });
      }
    }
    case actions.SHUFFLE_DECK: {
      if (action.init) {
        return state.merge({
          shuffledCards: cardShuffler(cards),
          renderedCards: [],
          selectedCards: [],
          numberOfCuts: 0,
          cut: false,
          numberOfShuffles: 1,
          actionText: 'Initiliazed',
        });
      } else if (state.get('shuffledCards').length <= 0) {
        return state.merge({
          ...initialState,
          renderedCards: [],
          selectedCards: [],
          shuffledCards: cardShuffler(cards),
          actionText: 'empty deck - reinitiliazing',
        });
      } else {
        return state.merge({
          actionText: `Shuffled ${state.get('numberOfShuffles')} times`,
          shuffledCards: cardShuffler(state.get('shuffledCards')),
          numberOfShuffles: 1 + state.get('numberOfShuffles'),
        });
      }
    }
    case actions.SET_DESTINATION:
      return state.merge({
        destination: action.destination,
      });
    case actions.SET_ACTION_TEXT:
      return state.merge({
        actionText: action.actionText,
      });
    case actions.SET_SELECTED_CARD: {
      const newDeck = popSelectedCard(
        action.payload.id,
        state.get('shuffledCards'),
      );

      const destination = state.get('destination');

      return state.merge({
        // @ts-ignore
        [destination]: [...state.get(destination), action.payload],
        shuffledCards: newDeck,
        actionText: '',
      });
    }

    case actions.DELETE_CARD: {
      const newDeck = popSelectedCard(action.id, state.get(action.destination));

      return state.merge({
        [action.destination]: newDeck,
        shuffledCards: [...state.get('shuffledCards'), action.card],
      });
    }

    default:
      return initialState;
  }
};

export default deckCardReducer;
