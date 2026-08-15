import { klineWs } from '../services';
import { useObservableState } from 'observable-hooks';

function App() {
  const marketData = useObservableState(klineWs.klineData$, null);

  console.log(marketData);

  return <div></div>;
}

export default App;
