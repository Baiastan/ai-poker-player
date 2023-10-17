import React from 'react';

import SingleCard from './SingleCard';
import { cards } from './cardsData.js';

import './Cards.less';

interface Card {
  suit: string;
  rank: string;
}

const Cards = () => {
  return (
    <div className="cards-container">
      {cards.map((card: Card) => (
        <SingleCard key={`${card.suit}-${card.rank}`} {...card} />
      ))}
    </div>
  );
};

export default Cards;
