import React from 'react';

import styles from './PokerTableView.module.less';
import Cards from '../cards/Cards';

const PokerTableView = () => {
  return (
    <div className={styles.container}>
      <Cards />
    </div>
  );
};

export default PokerTableView;
