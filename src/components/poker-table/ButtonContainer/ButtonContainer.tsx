import React, { FC } from 'react';

import PrimaryButton from '../../common/PrimaryButton';

import styles from './ButtonContainer.module.less';

interface ButtonContainerProps {
  shuffle: (init?: boolean) => void;
  onRenderCards: (num?: number) => void;
  cutCard: () => void;
  isCut: boolean;
}

const ButtonContainer: FC<ButtonContainerProps> = ({
  shuffle,
  onRenderCards,
  cutCard,
  isCut,
}) => {
  return (
    <div className={styles.buttonContainer}>
      <PrimaryButton text={'Suffle'} onClick={() => shuffle()} />
      <PrimaryButton
        text={'Render All Cards'}
        onClick={() => onRenderCards()}
      />
      <PrimaryButton text={'Render 2 cards'} onClick={() => onRenderCards(2)} />
      <PrimaryButton text={'Cut'} onClick={() => cutCard()} color="orange" />
      <PrimaryButton
        text={'Flop'}
        disabled={!isCut}
        onClick={() => onRenderCards(3)}
        color="blue"
      />
      <PrimaryButton
        text={'Turn'}
        disabled={!isCut}
        onClick={() => onRenderCards(1)}
        color="salmon"
      />
      <PrimaryButton
        text={'River'}
        disabled={!isCut}
        onClick={() => onRenderCards(1)}
        color="orange"
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
