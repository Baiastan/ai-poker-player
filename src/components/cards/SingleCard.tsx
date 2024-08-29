import { FC } from 'react';

import './SingleCard.less';
import { Card } from '../../types/card';
import { deleteCard } from '../../store/deck/actions';
import { useDispatch } from 'react-redux';

interface SingleCardProps extends Card {
  destination: string;
}

const SingleCard: FC<SingleCardProps> = ({ suit, rank, id, destination }) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(
      deleteCard({
        destination,
        card: {
          suit,
          rank,
          id,
        },
      }),
    );
  };

  return (
    <div className={`card ${suit}${rank}`} onDoubleClick={handleDelete}></div>
  );
};

export default SingleCard;
