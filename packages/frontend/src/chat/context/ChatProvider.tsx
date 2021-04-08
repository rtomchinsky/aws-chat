import React from 'react';
import ChatProtocol from '../protocol/ChatProtocol';
import WebSocketChatProtocol from '../protocol/WebSocketChatProtocol';
import { ChatContext } from './ChatContext';
import { IncomingMessage, OutgoingMessage } from '../protocol/Message';

export type ChatProviderProps = React.PropsWithChildren<{
  wsUrl: string;
}>;

export const ChatProvider = ({ children, wsUrl }: ChatProviderProps) => {
  const [messages, setMessages] = React.useState<
    (IncomingMessage | OutgoingMessage)[]
  >([]);
  const [protocol, setProtocol] = React.useState<ChatProtocol>(null);

  React.useEffect(() => {
    if (protocol === null) {
      const ws = new WebSocket(wsUrl);
      const protocol: ChatProtocol = new WebSocketChatProtocol(ws);

      protocol.on('message:received', (message) =>
        setMessages((old) => [...old, message]),
      );

      ws.addEventListener('close', (e) => {
        console.log('socket closed', e.reason);
        setProtocol(null);
      });

      setProtocol(protocol);
    } else {
      return () => {
        protocol.dispose();
      };
    }
  }, [protocol]);

  const sendMessage = React.useMemo(
    () => (message: string) => {
      if (protocol) {
        const outgoingMessage = protocol.send(message);
        setMessages((old) => [...old, outgoingMessage]);
      } else {
        throw new Error();
      }
    },
    [protocol],
  );

  const value = {
    messages,
    sendMessage,
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};
