import { FC } from 'react';
import { connect } from 'react-redux';

import { Card, RootState } from '../../../types/card';

import SingleCard from '../../cards/SingleCard';
import ButtonContainer from '../ButtonContainer/ButtonContainer';
import Extras from '../../cards/Extras';
import * as cardActions from '../../../store/deck/actions';

import styles from './PokerTable.module.less';

interface PokerTableProps {
  numberOfCuts: number;
  renderedCards: Card[];
  responseData: {
    params: {
      action: string;
      color: string;
      level: string;
    };
    currentRank: string;
    handStrength: number;
  };
  cut: Function;
  cutCard: Function;
  renderCards: Function;
  shuffleDeck: Function;
  selectedCards: Card[];
}

const PokerTable: FC<PokerTableProps> = ({
  numberOfCuts,
  renderedCards,
  responseData,
  cut,
  cutCard,
  renderCards,
  shuffleDeck,
  selectedCards,
}) => {
  console.log(responseData);
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
        <h2>Cards On Table</h2>
        <div className={styles.renderedCardsContainer}>
          {renderedCards.length === 0 && <Extras cover="blue" />}
          {renderedCards.map((card) => {
            return (
              <SingleCard
                key={card.id}
                suit={card.suit}
                id={card.id}
                destination="renderedCards"
                rank={card.rank}
              />
            );
          })}
        </div>
        <h2>
          Cards On Hands{' '}
          <span className={styles.actionClass}>
            Action: {responseData.params.action.toUpperCase()}
          </span>
        </h2>
        <div className={styles.cardsOnHandContainer}>
          {selectedCards.length === 0 && <Extras cover="blue" />}
          {selectedCards.map((card) => {
            return (
              <SingleCard
                key={card.id}
                suit={card.suit}
                id={card.id}
                destination="selectedCards"
                rank={card.rank}
              />
            );
          })}
        </div>
      </div>
      <div
        className={styles.footer}
        style={{ backgroundColor: responseData.params.color }}
      >
        <div className={styles.numberOfCuts}>{numberOfCuts}</div>
        <div>{responseData.currentRank}</div>
        <div>Points: {responseData.handStrength}</div>
      </div>
    </div>
  );
};

const mapStateToProps = (state: RootState) => ({
  shuffledCards: state.deck.shuffledCards,
  actionText: state.deck.actionText,
  numberOfCuts: state.deck.numberOfCuts,
  cut: state.deck.cut,
  responseData: state.deck.responseData,
  renderedCards: state.deck.renderedCards,
  numberOfShuffles: state.deck.numberOfShuffles,
  selectedCards: state.deck.selectedCards,
});

const mapDispatchToProps = (dispatch: Function) => ({
  cutCard: () => dispatch(cardActions.cutCard()),
  renderCards: (numToRender: number) =>
    dispatch(cardActions.renderCards(numToRender)),
  shuffleDeck: (init: boolean) => dispatch(cardActions.shuffleDeck(init)),
});

// eslint-disable-next-line react-refresh/only-export-components
// @ts-ignore
export default connect(mapStateToProps, mapDispatchToProps)(PokerTable);
