import { FC } from 'react';
import PokerTable from './PokerTable/PokerTable';
import ChooseCardsForm from './ChooseCardsForm/ChooseCardsForm';
import { Deck } from '../../types/card';

import styles from './PokerTableView.module.less';
import { useSelector } from 'react-redux';

const PokerTableView: FC<Deck> = ({ deck }) => {
  const shuffledCards = useSelector((state) => state.deck.shuffledCards);
  const actionText = useSelector((state) => state.deck.actionText);

  return (
    <div className={styles.pokerTableWrapper}>
      <PokerTable deck={deck} />
      <ChooseCardsForm shuffledCards={shuffledCards} actionText={actionText} />
    </div>
  );
};

export default PokerTableView;
