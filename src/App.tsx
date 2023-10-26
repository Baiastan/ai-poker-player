import './App.less';
import PokerTableView from './components/poker-table/PokerTableView';
import { useSelector } from 'react-redux';

function App() {
  const deck = useSelector((state) => state.deck.deck);
  //const [deck, setDeck] = useState<Card[]>([]);

  return <PokerTableView deck={deck} />;
}

export default App;
