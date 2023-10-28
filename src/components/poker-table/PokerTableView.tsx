import { FC } from 'react';
import PokerTable from './PokerTable/PokerTable';
import ChooseCardsForm from './ChooseCardsForm/ChooseCardsForm';
import { Deck } from '../../types/card';

import styles from './PokerTableView.module.less';
import { useSelector } from 'react-redux';

const PokerTableView: FC<Deck> = ({ deck }) => {
  const shuffledCards = useSelector((state) => state.deck.shuffledCards);

  return (
    <div className={styles.pokerTableWrapper}>
      <PokerTable deck={deck} />
      <ChooseCardsForm shuffledCards={shuffledCards} />
    </div>
  );
};

export default PokerTableView;
