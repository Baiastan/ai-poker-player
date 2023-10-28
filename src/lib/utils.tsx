import { Card } from '../types/card';

export const cardShuffler = (deck: Card[]): Card[] => {
  const shuffledDeck = [...deck];

  for (let i = shuffledDeck.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));
    [shuffledDeck[i], shuffledDeck[randomIndex]] = [
      shuffledDeck[randomIndex],
      shuffledDeck[i],
    ];
  }

  return shuffledDeck;
};

export const renderAndPopCards = (
  deck: Card[],
  numToRender: number = 1,
): { renderedCards: Card[]; newDeck: Card[] } => {
  const renderedCards: Card[] = [];

  for (let i = 0; i < numToRender; i++) {
    if (deck.length > 0) {
      renderedCards.push(deck.pop() as Card);
    }
  }

  return {
    renderedCards,
    newDeck: deck,
  };
};

export const popSelectedCard = (id: string, deck: Card[]): Card[] => {
  return deck.filter((card) => card.id !== id);
};
