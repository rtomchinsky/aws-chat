import React from 'react';
import { IncomingMessage, OutgoingMessage } from '../protocol/Message';

export type ChatContextValue = {
  sendMessage: (message: string) => void;
  messages: (IncomingMessage | OutgoingMessage)[];
};

export const ChatContext = React.createContext<ChatContextValue>({
  sendMessage: () => {
    throw new Error(
      'No ChatContext found. Did you forget to wrap your component with <ChatProvider />?',
    );
  },
  messages: [],
});
