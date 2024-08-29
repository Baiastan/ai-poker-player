import { FC } from 'react';
import PokerTable from './PokerTable/PokerTable';
import ChooseCardsForm from './ChooseCardsForm/ChooseCardsForm';
import { RootState } from '../../types/card';

import styles from './PokerTableView.module.less';
import { useSelector } from 'react-redux';

const PokerTableView: FC = () => {
  const shuffledCards = useSelector(
    (state: RootState) => state.deck.shuffledCards,
  );
  const actionText = useSelector((state: RootState) => state.deck.actionText);

  return (
    <div className={styles.pokerTableWrapper}>
      <PokerTable />
      <ChooseCardsForm shuffledCards={shuffledCards} actionText={actionText} />
    </div>
  );
};

export default PokerTableView;
