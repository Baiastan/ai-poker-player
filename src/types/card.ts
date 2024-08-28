export interface Card {
  rank: string;
  suit: string;
  id?: string;
  cover?: string;
  joker?: string;
}

type Params = {
  action: string;
  color: string;
  level: string;
};

export interface ResponseData {
  currentRank: string;
  handStrength: number;
  aiSuggestion: string;
  params: Params;
}

export interface Deck {
  deck: Card[];
  responseData: ResponseData;
  shuffledCards: Card[];
  actionText: string;
  numberOfCuts: number;
  numberOfShuffles: number;
  renderedCards: Card[];
  selectedCards: Card[];
  cut: boolean;
  cutCard: () => void;
  renderCards: () => Card[];
  shuffleDeck: () => void;
}
