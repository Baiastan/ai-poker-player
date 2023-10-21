export interface Card {
  rank: string;
  suit: string;
  cover?: string;
  joker?: string;
}

export interface Deck {
  deck: Card[];
}
