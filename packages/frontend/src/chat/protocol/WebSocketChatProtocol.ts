import EventEmitter from 'events';
import { IncomingMessage, OutgoingMessage } from './Message';
import ChatProtocol from './ChatProtocol';
import { DateTime } from 'luxon';

class WebSocketChatProtocol extends EventEmitter implements ChatProtocol {
  constructor(private socket: WebSocket) {
    super();
    socket.addEventListener('message', (event) => {
      const parsedMessage = JSON.parse(event.data);

      switch (parsedMessage.action) {
        case 'message':
          this.emit(
            'message:received',
            new IncomingMessage(parsedMessage.message, DateTime.now()),
          );
          break;
      }
    });
  }

  public send(message: string) {
    this.socket.send(
      JSON.stringify({
        action: 'sendMessage',
        message,
      }),
    );

    return new OutgoingMessage(message, DateTime.now());
  }

  public dispose() {
    this.removeAllListeners();
    this.socket.close();
  }
}

export default WebSocketChatProtocol;
