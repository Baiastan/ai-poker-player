import PokerTableView from './components/poker-table/PokerTableView';
import './App.less';
import { cards } from './components/cards/cardsData';
import { useEffect, useState } from 'react';
import { Card } from './types/card';

function App() {
  const [deck, setDeck] = useState<Card[]>([]);

  useEffect(() => {
    setDeck(cards);
  }, []);

  return <PokerTableView deck={deck} />;
}

export default App;
