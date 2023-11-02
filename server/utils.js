export const cardsToString = (cards) => {
  const poker = {
    hand: '',
    flop: '',
    turn: '',
    river: '',
  };

  cards.forEach((element, index) => {
    const cardString = `${element.rank} of ${element.suit}`;

    if (index < 2) {
      // Hand
      poker.hand += poker.hand ? `, ${cardString}` : cardString;
    } else if (index >= 2 && index < 5) {
      // Flop
      poker.flop += poker.flop ? `, ${cardString}` : cardString;
    } else if (index === 5) {
      // Turn
      poker.turn = cardString;
    } else if (index === 6) {
      // River
      poker.river = cardString;
    }
  });

  return poker;
};
