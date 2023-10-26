import { FC } from 'react';
import PokerTable from './PokerTable/PokerTable';
import ChooseCardsForm from './ChooseCardsForm/ChooseCardsForm';
import { Deck } from '../../types/card';

import styles from './PokerTableView.module.less';

const PokerTableView: FC<Deck> = ({ deck }) => {
  return (
    <div className={styles.pokerTableWrapper}>
      <PokerTable deck={deck} />
      <ChooseCardsForm />
    </div>
  );
};

export default PokerTableView;
