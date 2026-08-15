import { wsClient } from '#lib';
import { ChartConfig, KlineEvent } from './kline-types';
import { BehaviorSubject, map, switchMap } from 'rxjs';

class KlineWs {
  klineConfig$ = new BehaviorSubject<ChartConfig>({
    symbol: 'btcusdt',
    interval: '1m',
  });

  klineData$ = this.klineConfig$.pipe(
    switchMap(({ symbol, interval }) =>
      wsClient
        .on<KlineEvent>(`${symbol}@kline_${interval}`)
        .pipe(map((data) => this.#mapKlineData(data))),
    ),
  );

  #mapKlineData = (data: KlineEvent) => ({
    time: data.k.t,
    open: data.k.o,
    high: data.k.h,
    low: data.k.l,
    close: data.k.c,
  });
}

export const klineWs = new KlineWs();
