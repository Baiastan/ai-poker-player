import React from 'react';
import CardWrapper from '../../common/CardWrapper';

import styles from './ChooseCardsForm.module.less';
import DiamondsIcon from '../../card-icons/DiamondsIcon';
import HeartsIcon from '../../card-icons/HeartsIcon';
import ClubsIcon from '../../card-icons/ClubsIcon';
import SpadesIcon from '../../card-icons/SpadesIcon';

import { ranks } from '../../cards/cardsData';
import SecondaryButton from '../../common/SecondaryButton';

const ChooseCardsForm = () => {
  const submitHandler = (e) => {
    e.preventDefault();
  };

  const chooseCard = (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log(e.currentTarget.value);
  };

  return (
    <CardWrapper className={styles.formContainer}>
      <form onSubmit={submitHandler}>
        <h2>Choose Cards</h2>
        <div className={styles.suitesContainer}>
          <SecondaryButton
            color="white"
            value="diamonds"
            onClick={(e) => chooseCard(e)}
          >
            <DiamondsIcon width="40" height="40" />
          </SecondaryButton>
          <SecondaryButton
            color="white"
            value="hearts"
            onClick={(e) => chooseCard(e)}
          >
            <HeartsIcon width="40" height="40" />
          </SecondaryButton>
          <SecondaryButton
            color="white"
            value="clubs"
            onClick={(e) => chooseCard(e)}
          >
            <ClubsIcon width="40" height="40" />
          </SecondaryButton>
          <SecondaryButton
            color="white"
            value="spades"
            onClick={(e) => chooseCard(e)}
          >
            <SpadesIcon height="40" width="40" />
          </SecondaryButton>
        </div>
        <div className={styles.ranksContainer}>
          {ranks.map((rank) => {
            return (
              <SecondaryButton key={rank}>
                <span>{rank}</span>
              </SecondaryButton>
            );
          })}
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
