export interface Card {
  rank: string;
  suit: string;
  cover?: string;
  joker?: string;
}

export interface Deck {
  deck: Card[];
  shuffledCards: Card[];
  actionText: string;
  numberOfCuts: number;
  numberOfShuffles: number;
  renderedCards: Card[];
  cut: boolean;
  cutCard: () => void;
  renderCards: () => Card[];
  shuffleDeck: () => void;
}
