import { Record } from 'immutable';

import * as actions from './actions';
import { cardShuffler, renderAndPopCards } from '../../lib/utils';
import { Card } from '../../types/card';
import { cards } from '../../components/cards/cardsData';

interface DeckRecordProps {
  deck: Card[];
  cut: boolean;
  renderedCards: Card[];
  shuffledCards: Card[];
  numberOfCuts: number;
  actionText: string;
  numberOfShuffles: number;
}

const DeckRecordStructure: DeckRecordProps = {
  deck: cards,
  cut: false,
  renderedCards: [],
  shuffledCards: cardShuffler(cards),
  numberOfCuts: 0,
  numberOfShuffles: 1,
  actionText: '',
};

export const DeckRecord = Record(DeckRecordStructure);

const initialState = new DeckRecord();

const deckCardReducer = (state = initialState, action) => {
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
          numberOfCuts: 0,
          cut: false,
          numberOfShuffles: 1,
          actionText: 'Initiliazed',
        });
      } else if (state.get('shuffledCards').length <= 0) {
        return state.merge({
          ...initialState,
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

    default:
      return initialState;
  }
};

export default deckCardReducer;
