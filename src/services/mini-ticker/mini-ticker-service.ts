import { wsClient, apiClient } from '#lib';

class MiniTickerService {
  allMiniTickers$ = wsClient.on('!ticker_1h@arr');

  getAllMiniTickers$ = apiClient.get('v3/exchangeInfo', {
    params: {
      symbol: 'BTCUSDssT',
    },
  });
}

export const miniTickerService = new MiniTickerService();
