import { IncomingMessage, OutgoingMessage } from './Message';

export type Events = 'message:received' | 'message:ack';

interface ChatProtocol {
  on(
    event: 'message:received',
    listener: (message: IncomingMessage) => void,
  ): this;

  send(message: string): OutgoingMessage;
  dispose(): void;
}

export default ChatProtocol;
