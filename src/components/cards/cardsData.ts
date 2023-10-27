export const suits: string[] = ['hearts', 'diamonds', 'clubs', 'spades'];
export const ranks: string[] = [
  'A',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '10',
  'J',
  'Q',
  'K',
];

interface Card {
  suit: string;
  rank: string;
}

export const cards: Card[] = suits.flatMap((suit) =>
  ranks.map((rank) => ({ suit, rank })),
);

export const extras: string[] = ['joker1', 'joker2', 'blue', 'red'];
