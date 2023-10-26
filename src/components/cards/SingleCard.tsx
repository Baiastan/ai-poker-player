import { FC } from 'react';

import './SingleCard.less';
import { Card } from '../../types/card';
import Extras from './Extras';

const SingleCard: FC<Card> = ({ suit, rank }) => {
  return <div className={`card ${suit}${rank}`}></div>;
};

export default SingleCard;
