import { FC } from 'react';
import { connect } from 'react-redux';

import { Card, Deck } from '../../../types/card';

import SingleCard from '../../cards/SingleCard';
import ButtonContainer from '../ButtonContainer/ButtonContainer';
import Extras from '../../cards/Extras';
import * as cardActions from '../../../store/deck/actions';

import styles from './PokerTable.module.less';

const PokerTable: FC<Deck> = ({
  shuffledCards,
  actionText,
  numberOfCuts,
  renderedCards,
  cut,
  cutCard,
  renderCards,
  shuffleDeck,
}) => {
  return (
    <div className={styles.container}>
      <div>
        <ButtonContainer
          shuffle={shuffleDeck}
          cut={cut}
          onRenderCards={renderCards}
          cutCard={cutCard}
        />
      </div>
      <div className={styles.cardsContainer}>
        {shuffledCards.length === 52 && <Extras cover="blue" />}
        {renderedCards.map((card, index: number) => {
          return (
            <SingleCard
              key={`card-${index}`}
              suit={card.suit}
              rank={card.rank}
            />
          );
        })}
      </div>
      <div className={styles.footer}>
        <div className={styles.numberOfCuts}>{numberOfCuts}</div>
        {<div className={styles.actionText}>{actionText}</div>}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  shuffledCards: state.deck.shuffledCards,
  actionText: state.deck.actionText,
  numberOfCuts: state.deck.numberOfCuts,
  cut: state.deck.cut,
  renderedCards: state.deck.renderedCards,
  numberOfShuffles: state.deck.numberOfShuffles,
});

const mapDispatchToProps = (dispatch) => ({
  cutCard: () => dispatch(cardActions.cutCard()),
  renderCards: (numToRender: number) =>
    dispatch(cardActions.renderCards(numToRender)),
  shuffleDeck: (init: boolean) => dispatch(cardActions.shuffleDeck(init)),
});

// eslint-disable-next-line react-refresh/only-export-components
export default connect(mapStateToProps, mapDispatchToProps)(PokerTable);
