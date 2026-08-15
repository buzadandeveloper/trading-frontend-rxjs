import { Observable } from 'rxjs';

class WsClient {
  private readonly url: string | undefined = process.env.WS_URL;

  on<T>(stream: string) {
    return new Observable<T>((subscriber) => {
      const socket = new WebSocket(`${this.url}${stream}`);

      socket.onmessage = (event: MessageEvent) => {
        const data: T = JSON.parse(event.data);

        subscriber.next(data);
      };

      socket.onerror = (error) => subscriber.error(error);

      socket.onclose = () => subscriber.complete();

      return () => socket.close();
    });
  }
}

export const wsClient = new WsClient();
