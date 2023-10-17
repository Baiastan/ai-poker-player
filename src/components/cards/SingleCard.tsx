import { FC } from 'react';

interface SingleCardProps {
  suit: string;
  rank: string;
}

const SingleCard: FC<SingleCardProps> = ({ suit, rank }) => {
  return <div className={`card ${suit}${rank}`}></div>;
};

export default SingleCard;
