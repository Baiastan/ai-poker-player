import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import CardWrapper from '../../common/CardWrapper';

import DiamondsIcon from '../../card-icons/DiamondsIcon';
import HeartsIcon from '../../card-icons/HeartsIcon';
import ClubsIcon from '../../card-icons/ClubsIcon';
import SpadesIcon from '../../card-icons/SpadesIcon';

import { ranks } from '../../cards/cardsData';
import SecondaryButton from '../../common/SecondaryButton';
import PrimaryButton from '../../common/PrimaryButton';
import {
  selectCard,
  setActionText,
  setDestination,
} from '../../../store/deck/actions';
import { Card } from '../../../types/card';

import styles from './ChooseCardsForm.module.less';
import RadioButton from '../../common/RadionButton';

const ChooseCardsForm = ({ shuffledCards }) => {
  const [suit, setSuit] = useState('');
  const [rank, setRank] = useState('');
  // renderedCards: Card[];

  const [activeButton, setActiveButton] = useState('');

  const dispatch = useDispatch();

  useEffect(() => {
    if (suit !== '' && rank !== '') {
      const isCardInDeck = shuffledCards.every(
        (card: Card) => card.id !== `${suit}-${rank}`,
      );

      if (!isCardInDeck) {
        dispatch(selectCard({ suit, rank, id: `${suit}-${rank}` }));
      } else {
        dispatch(setActionText('Card has already been selected!'));
      }
    }
  }, [suit, rank, dispatch]);

  const submitHandler = (e: React.MouseEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const setSuits = (value: string) => {
    setSuit(value);
    setActiveButton(value);
    setRank('');
  };

  return (
    <CardWrapper className={styles.formContainer}>
      <form onSubmit={submitHandler}>
        <div className={styles.formHeader}>
          <h2>Select Cards</h2>
          <div>
            <RadioButton
              id="renderedCards"
              name="destinationOption"
              value="renderedCards"
              label="Table"
              onChange={(value) => dispatch(setDestination(value))}
            />
            <RadioButton
              id="selectedCards"
              name="destinationOption"
              label="Hands"
              value="selectedCards"
              onChange={(value) => dispatch(setDestination(value))}
              // hides the actual radio button
            />
          </div>
        </div>
        <div className={styles.suitesContainer}>
          <PrimaryButton
            color="white"
            value="diamonds"
            className={activeButton === 'diamonds' ? 'activePrimary' : ''}
            onClick={(e) => setSuits(e.currentTarget.value)}
          >
            <DiamondsIcon width="40" height="40" />
          </PrimaryButton>
          <PrimaryButton
            color="white"
            className={activeButton === 'hearts' ? 'activePrimary' : ''}
            value="hearts"
            onClick={(e) => setSuits(e.currentTarget.value)}
          >
            <HeartsIcon width="40" height="40" />
          </PrimaryButton>
          <PrimaryButton
            color="white"
            className={activeButton === 'clubs' ? 'activePrimary' : ''}
            value="clubs"
            onClick={(e) => setSuits(e.currentTarget.value)}
          >
            <ClubsIcon width="40" height="40" />
          </PrimaryButton>
          <PrimaryButton
            color="white"
            className={activeButton === 'spades' ? 'activePrimary' : ''}
            value="spades"
            onClick={(e) => setSuits(e.currentTarget.value)}
          >
            <SpadesIcon height="40" width="40" />
          </PrimaryButton>
        </div>
        <div className={styles.ranksContainer}>
          {ranks.map((rank) => {
            return (
              <SecondaryButton
                key={rank}
                onClick={(e) => {
                  setRank(e.currentTarget.value);
                }}
                value={rank}
              >
                <span>{rank}</span>
              </SecondaryButton>
            );
          })}
        </div>
      </form>
    </CardWrapper>
  );
};

export default ChooseCardsForm;
