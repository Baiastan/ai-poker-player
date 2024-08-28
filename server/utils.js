import { preflopHandStrength } from './data.js';

const pokerHandRankings = [
  {
    rank: 1,
    name: 'Royal Flush',
    description: 'A, K, Q, J, 10, all of the same suit.',
  },
  {
    rank: 2,
    name: 'Straight Flush',
    description: 'Five consecutive cards of the same suit.',
  },
  {
    rank: 3,
    name: 'Four of a Kind',
    description: 'Four cards of the same rank.',
  },
  {
    rank: 4,
    name: 'Full House',
    description: 'Three cards of one rank and two cards of another rank.',
  },
  {
    rank: 5,
    name: 'Flush',
    description: 'Five cards of the same suit, not in sequence.',
  },
  {
    rank: 6,
    name: 'Straight',
    description: 'Five consecutive cards of different suits.',
  },
  {
    rank: 7,
    name: 'Three of a Kind',
    description: 'Three cards of the same rank.',
  },
  {
    rank: 8,
    name: 'Two Pair',
    description: 'Two cards of one rank, two cards of another rank.',
  },
  {
    rank: 9,
    name: 'One Pair',
    description: 'Two cards of the same rank.',
  },
  {
    rank: 10,
    name: 'High Card',
    description: 'The highest card when no other hand is made.',
  },
];

const levels = {
  2: { level: 2 },
  3: { level: 3 },
  4: { level: 4 },
  5: { level: 5 },
  6: { level: 6 },
  7: { level: 7 },
  8: { level: 8 },
  9: { level: 9 },
  10: { level: 10 },
  J: { level: 11 }, // Jack
  Q: { level: 12 }, // Queen
  K: { level: 13 }, // King
  A: { level: 14 }, // Ace
};

export const cardsToString = (cards) => {
  const stringPoker = {
    hand: '',
    flop: '',
    turn: '',
    river: '',
  };

  const objectPoker = {
    hand: [],
    flop: [],
    turn: [],
    river: [],
  };

  cards.forEach((element, index) => {
    const cardString = `${element.rank} of ${element.suit}`;

    if (index < 2) {
      // Hand
      stringPoker.hand += stringPoker.hand ? `, ${cardString}` : cardString;
      objectPoker.hand.push(element);
    } else if (index >= 2 && index < 5) {
      // Flop
      stringPoker.flop += stringPoker.flop ? `, ${cardString}` : cardString;
      objectPoker.flop.push(element);
    } else if (index === 5) {
      // Turn
      stringPoker.turn = cardString;
      objectPoker.turn.push(element);
    } else if (index === 6) {
      // River
      objectPoker.river.push(element);
      stringPoker.river = cardString;
    }
  });

  return { stringPoker, objectPoker };
};

export const evaluateHandStrength = (cards) => {
  let suits = {};
  let values = {};

  for (const card of cards) {
    const suit = card.suit;
    const value = card.rank;

    suits[suit] = (suits[suit] || 0) + 1;
    values[value] = (values[value] || 0) + 1;
  }

  let sortedValues = Object.keys(values).sort(
    (a, b) => levels[a].level - levels[b].level,
  );

  // Check for each hand type, from highest to lowest
  if (isRoyalFlush(cards, suits, sortedValues)) return 'Royal Flush';
  if (isStraightFlush(cards, suits, sortedValues)) return 'Straight Flush';
  if (isFourOfAKind(values)) return 'Four of a Kind';
  if (isFullHouse(values)) return 'Full House';
  if (isFlush(suits)) return 'Flush';
  if (isStraight(sortedValues)) return 'Straight';
  if (isThreeOfAKind(values)) return 'Three of a Kind';
  if (isTwoPair(values)) return 'Two Pair';
  if (isOnePair(values)) return 'One Pair';

  return 'High Card'; // If no other hand is found
};

export function isNuts(holeCards, communityCards) {
  const yourBestHand = evaluateHandStrength([...holeCards, ...communityCards]);

  // Simulate all possible hands opponents could have
  const deck = generateDeck();
  const possibleOpponentHands = generatePossibleHands(
    deck,
    holeCards,
    communityCards,
  );

  console.log('all possible handds: ', possibleOpponentHands);

  // Check each possible opponent hand
  for (let opponentHand of possibleOpponentHands) {
    const opponentBestHand = evaluateHandStrength([
      ...opponentHand,
      ...communityCards,
    ]);

    // Compare your best hand to the opponent's best hand
    if (compareHands(opponentBestHand, yourBestHand) > 0) {
      // If any opponent hand is stronger, it's not the nuts
      return false;
    }
  }

  // If no opponent hand is stronger, you have the nuts
  return true;
}

export function getHandIndicator(points) {
  console.log(points);
  const enums = {
    FOLD: { action: 'fold', color: 'grey', level: 'weak' },
    LEVEL1: {
      action: "don't raise, if others are not raising",
      color: 'blue',
      level: 'risky',
    },
    LEVEL2: {
      action: 'raise from late position',
      color: 'red',
      level: 'playable',
    },
    LEVEL3: {
      action: 'raise from middle position or later',
      color: 'green',
      level: 'good',
    },
    LEVEL4: {
      action: 'raise from any position',
      color: 'black',
      level: 'strong',
    },
  };

  if (points < 40) {
    return enums.FOLD;
  } else if (points >= 40 && points <= 55) {
    return enums.LEVEL1;
  } else if (points > 55 && points <= 63) {
    return enums.LEVEL2;
  } else if (points > 63 && points < 75) {
    return enums.LEVEL3;
  } else if (points >= 75) {
    return enums.LEVEL4;
  } else {
    return 'No Points';
  }
}

function compareHands(hand1, hand2) {
  const handRankings = [
    'High Card',
    'One Pair',
    'Two Pair',
    'Three of a Kind',
    'Straight',
    'Flush',
    'Full House',
    'Four of a Kind',
    'Straight Flush',
    'Royal Flush',
  ];

  const rank1 = handRankings.indexOf(hand1);
  const rank2 = handRankings.indexOf(hand2);

  return rank1 - rank2;
}

// Helper function to generate a deck of cards, excluding hole cards and community cards
function generateDeck() {
  const suits = ['hearts', 'diamonds', 'clubs', 'spades']; // Hearts, Diamonds, Clubs, Spades
  const ranks = [
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
    'A',
  ];

  const deck = [];
  suits.forEach((suit) => {
    ranks.forEach((rank) => {
      deck.push({
        suit: suit,
        rank: rank,
        id: `${suit}-${rank}`,
      });
    });
  });
  return deck;
}

// Helper function to generate all possible opponent hands (2-card combinations)
function generatePossibleHands(deck, holeCards, communityCards) {
  // Create a set of IDs for holeCards and communityCards
  const holeAndCommunityCardIds = new Set(
    [...holeCards, ...communityCards].map((card) => card.id),
  );

  // Filter out holeCards and communityCards from the deck based on IDs
  const availableCards = deck.filter(
    (card) => !holeAndCommunityCardIds.has(card.id),
  );

  let possibleHands = [];

  // Generate all possible pairs of available cards
  for (let i = 0; i < availableCards.length; i++) {
    for (let j = i + 1; j < availableCards.length; j++) {
      possibleHands.push([availableCards[i], availableCards[j]]);
    }
  }

  return possibleHands;
}

export const getHandCardStrength = (cards) => {
  console.log('getHandCardStrength: ', cards);
  if (cards.length < 2) {
    return;
  }

  let ch = '';
  let sortedHand = '';

  let card1 = cards[0];
  let card2 = cards[1];

  if (card1.rank !== card2.rank) {
    if (card1.suit === card2.suit) {
      ch = 's';
    } else {
      ch = 'o';
    }
  }

  if (levels[card1.rank].level > levels[card2.rank].level) {
    sortedHand = card1.rank + card2.rank;
  } else {
    sortedHand = card2.rank + card1.rank;
  }

  let key = sortedHand + ch;

  const strength = preflopHandStrength[key];

  return strength;
};

function isRoyalFlush(cards, suits) {
  // Check if there's a flush with A, K, Q, J, 10 of the same suit
  if (!isFlush(suits)) return false;
  return ['A', 'K', 'Q', 'J', '10'].every((value) =>
    cards.some((card) => card.rank.includes(value)),
  );
}

function isStraightFlush(cards, suits, sortedValues) {
  // Check if there's a straight of the same suit
  return isFlush(suits) && isStraight(sortedValues);
}

function isFourOfAKind(values) {
  // Check if there are four cards of the same value
  return Object.values(values).some((count) => count === 4);
}

function isFullHouse(values) {
  // Check if there are three cards of one value and two cards of another value
  return Object.values(values).includes(3) && Object.values(values).includes(2);
}

function isFlush(suits) {
  // Check if there are five cards of the same suit
  return Object.values(suits).some((count) => count >= 5);
}

function isStraight(sortedValues) {
  // Check if there are five consecutive values
  const currentLevels = sortedValues.map((value) => levels[value].level);
  for (let i = 0; i <= currentLevels.length - 5; i++) {
    if (currentLevels[i] === currentLevels[i + 4] - 4) return true; // Check for consecutive sequence
  }
  // Special case for wheel straight: A, 2, 3, 4, 5
  return ['A', '2', '3', '4', '5'].every((value) =>
    sortedValues.includes(value),
  );
}

function isThreeOfAKind(values) {
  // Check if there are three cards of the same value
  return Object.values(values).some((count) => count === 3);
}

function isTwoPair(values) {
  // Check if there are two different pairs
  return Object.values(values).filter((count) => count === 2).length === 2;
}

function isOnePair(values) {
  // Check if there is one pair
  return Object.values(values).some((count) => count === 2);
}
