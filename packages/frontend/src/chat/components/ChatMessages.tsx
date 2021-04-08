import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { IncomingMessage } from '../protocol/Message';
import { createChatBubbleComponent } from './ChatBubble';

export type ChatMessagesProps = {
  className?: string;
  messages: IncomingMessage[];
};

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
  },
}));

const ChatMessages = ({ className, messages }: ChatMessagesProps) => {
  const styles = useStyles();

  const messageRenderers = React.useMemo(() => {
    return messages.map((incomingMessage) =>
      createChatBubbleComponent(incomingMessage),
    );
  }, [messages]);

  return (
    <div className={clsx(className, styles.root)}>
      {messageRenderers.map((Component, i) => (
        <Component key={i} />
      ))}
    </div>
  );
};

export default ChatMessages;
