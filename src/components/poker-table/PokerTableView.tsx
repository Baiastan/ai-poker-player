import { FC, useEffect, useState } from 'react';

import styles from './PokerTableView.module.less';
import { Card, Deck } from '../../types/card';
import { cardShuffler, renderAndPopCards } from '../../lib/utils';
import SingleCard from '../cards/SingleCard';
import ButtonContainer from './ButtonContainer/ButtonContainer';
import Extras from '../cards/Extras';

const PokerTableView: FC<Deck> = ({ deck }) => {
  //move it to redux later

  const [shuffledDeck, setShuffled] = useState<Card[]>([]);
  const [renderCards, setRenderCard] = useState<Card[]>([]);
  const [actionText, setActionText] = useState('');
  const [numberOfCuts, setNumberOfCuts] = useState(0);

  const [isCut, setIsCut] = useState(false);
  // const [flop, setFlop] = useState(false);
  // const [turn, setTurn] = useState(false);
  // const [river, setRiver] = useState(false);

  const cutCard = () => {
    setNumberOfCuts((prev) => prev + 1);
    setIsCut(true);
    setShuffled((prevDeck) => {
      prevDeck.pop();
      return prevDeck;
    });
  };

  const renderCardsHandler = (numToRender: number = 52) => {
    const { renderedCards, newDeck } = renderAndPopCards(
      shuffledDeck,
      numToRender,
    );
    setActionText('');

    if (numToRender === 52) {
      setRenderCard(cardShuffler(deck));
      return;
    }

    if (renderCards.length === 0) {
      setRenderCard(renderedCards);
    } else {
      setRenderCard([...renderCards, ...renderedCards]);
    }
    setIsCut(false);
    setShuffled(newDeck);
  };

  const shuffle = (init: boolean = false) => {
    if (init) {
      setActionText('Initiliazed');
      setNumberOfCuts(0);
      setShuffled(cardShuffler(deck));
      setRenderCard([]);

      return;
    }

    if (shuffledDeck.length <= 0) {
      setActionText('empty deck - reinitializing');
      setShuffled(cardShuffler(deck));
      setRenderCard(shuffledDeck);
    } else {
      setActionText('Shuffling...');
      setShuffled(cardShuffler(shuffledDeck));
    }

    setTimeout(() => {
      setActionText('Ready');
    }, 500);
  };

  useEffect(() => {
    setActionText('Initializing - shuffling');
    setShuffled(cardShuffler(deck));
    const timerId = setTimeout(() => {
      setActionText('Ready');
    }, 500);

    return () => clearTimeout(timerId);
  }, [deck]);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.numberOfCuts}>{numberOfCuts}</div>
      </div>
      <div className={styles.cardsContainer}>
        {actionText === 'Initiliazed' && <Extras cover="blue" />}
        {renderCards.map((card, index) => {
          return (
            <SingleCard
              key={`card-${index}`}
              suit={card.suit}
              rank={card.rank}
            />
          );
        })}
        {renderCards.length <= 0 && (
          <div className={styles.actionText}>{actionText}</div>
        )}
      </div>
      <ButtonContainer
        shuffle={shuffle}
        isCut={isCut}
        onRenderCards={renderCardsHandler}
        cutCard={cutCard}
      />
    </div>
  );
};

export default PokerTableView;
