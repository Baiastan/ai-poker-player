interface Deck {
  rank: string;
  suit: string;
}

export const cardShuffler = (deck: Deck[]): Deck[] => {
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
  deck: Deck[],
  numToRender: number = 1,
): { renderedCards: Deck[]; newDeck: Deck[] } => {
  const renderedCards: Deck[] = [];

  for (let i = 0; i < numToRender; i++) {
    if (deck.length > 0) {
      renderedCards.push(deck.pop() as Deck);
    }
  }

  return {
    renderedCards,
    newDeck: deck,
  };
};
