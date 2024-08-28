import { Card } from '../../types/card';

export const SET_CARD_DECK = 'SET_CARD_DECK';
export const RENDER_CARDS = 'RENDER_CARDS';
export const SET_RENDERED_CARDS = 'SET_RENDER_CARDS';
export const TOGGLE_CUT = 'TOGGLE_CUT';
export const CUT_CARD = 'CUT_CARD';
export const SHUFFLE_DECK = 'SHUFFLE_DECK';
export const SET_SHUFFLED_DECK = 'SET_SHUFLLED_DECK';
export const SET_SELECTED_CARD = 'SET_SELECTED_CARD';
export const SET_ACTION_TEXT = 'SET_ACTION_TEXT';
export const SET_DESTINATION = 'SET_DESTINATION';
export const DELETE_CARD = 'DELETE_CARD';
export const SET_RESPONSE_DATA = 'SET_RESPONSE_DATA';

interface DeckCard {
  type: string;
  payload?: Card[];
}

export const setResponseData = (payload: object) => ({
  type: SET_RESPONSE_DATA,
  payload,
});

export const setCardDeck = (payload: Card[]): DeckCard => ({
  type: SET_CARD_DECK,
  payload,
});

export const cutCard = (): DeckCard => ({
  type: CUT_CARD,
});

export const shuffleDeck = (init: boolean) => ({
  type: SHUFFLE_DECK,
  init,
});

export const renderCards = (numToRender: number) => ({
  type: RENDER_CARDS,
  numToRender,
});

export const selectCard = (payload: Card) => ({
  type: SET_SELECTED_CARD,
  payload,
});

export const setActionText = (actionText: string) => ({
  type: SET_ACTION_TEXT,
  actionText,
});

export const setDestination = (destination: string) => ({
  type: SET_DESTINATION,
  destination,
});

interface DeleteCardProps {
  destination: string;
  card: Card;
}

export const deleteCard = ({ destination, card }: DeleteCardProps) => ({
  type: DELETE_CARD,
  id: card.id,
  destination,
  card,
});
