import React from 'react';
import CardWrapper from '../../common/CardWrapper';

import styles from './ChooseCardsForm.module.less';
import DiamondsIcon from '../../card-icons/DiamondsIcon';
import HeartsIcon from '../../card-icons/HeartsIcon';

const ChooseCardsForm = () => {
  const submitHandler = (e) => {
    e.preventDefault();
  };

  return (
    <CardWrapper className={styles.formContainer}>
      <form onSubmit={submitHandler}>
        <h2>Choose Cards</h2>
        <div>
          <button>
            <DiamondsIcon width="40" height="40" />
          </button>
          <button>
            <HeartsIcon width="40" height="40" />
          </button>
        </div>
        {/* <div>
          <label htmlFor="suit">Suit</label>
          <input id="suit" type="text" />
        </div>
        <div>
          <label htmlFor="rank">Rank</label>
          <input id="rank" type="text" />
        </div> */}
      </form>
    </CardWrapper>
  );
};

export default ChooseCardsForm;
