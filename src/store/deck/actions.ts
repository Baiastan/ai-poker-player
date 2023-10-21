import { Card } from '../../types/card';

export const SET_CARD_DECK = 'SET_CARD_DECK';
export const RENDER_CARDS = 'RENDER_CARDS';
export const SET_RENDERED_CARDS = 'SET_RENDER_CARDS';
export const TOGGLE_CUT = 'TOGGLE_CUT';
export const CUT_CARD = 'CUT_CARD';
export const SHUFFLE_DECK = 'SHUFFLE_DECK';
export const SET_SHUFFLED_DECK = 'SET_SHUFLLED_DECK';

interface DeckCard {
  type: string;
  payload: Card[];
}

export const setCardDeck = (payload: Card[]): DeckCard => ({
  type: SET_CARD_DECK,
  payload,
});

export const setRenderedCards = (payload: Card[]): DeckCard => ({
  type: SET_RENDERED_CARDS,
  payload,
});

interface ToggleCut {
  type: string;
  isCut: boolean;
}

export const toggleCut = (isCut: boolean): ToggleCut => ({
  type: TOGGLE_CUT,
  isCut,
});

export const cutCard = (payload: Card[]): DeckCard => ({
  type: CUT_CARD,
  payload,
});

export const setShuffledCard = (payload: Card[]): DeckCard => ({
  type: SET_SHUFFLED_DECK,
  payload,
});
