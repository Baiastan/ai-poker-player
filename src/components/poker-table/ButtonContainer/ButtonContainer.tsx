import React, { FC } from 'react';

import PrimaryButton from '../../common/PrimaryButton';

import styles from './ButtonContainer.module.less';

interface ButtonContainerProps {
  shuffle: (init?: boolean) => void;
  onRenderCards: (num?: number) => void;
  cutCard: () => void;
  cut: boolean;
}

const ButtonContainer: FC<ButtonContainerProps> = ({
  shuffle,
  onRenderCards,
  cutCard,
  cut,
}) => {
  return (
    <div className={styles.buttonContainer}>
      <PrimaryButton text={'Suffle'} onClick={() => shuffle()} />
      <PrimaryButton
        text={'Render All Cards'}
        onClick={() => onRenderCards(52)}
      />
      <PrimaryButton text={'Render 2 cards'} onClick={() => onRenderCards(2)} />
      <PrimaryButton text={'Cut'} onClick={() => cutCard()} color="orange" />
      <PrimaryButton
        text={'Three Card'}
        disabled={!cut}
        onClick={() => onRenderCards(3)}
        color="blue"
      />
      <PrimaryButton
        text={'One Card'}
        disabled={!cut}
        onClick={() => onRenderCards(1)}
        color="salmon"
      />
      <PrimaryButton
        text={'Initialize'}
        onClick={() => shuffle(true)}
        color={'black'}
      />
    </div>
  );
};

export default ButtonContainer;
