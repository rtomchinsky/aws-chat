import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { IncomingMessage, OutgoingMessage } from '../../protocol/Message';
import ChatBubbleBase from './ChatBubbleBase';

const useStyles = makeStyles((theme) => ({
  text: {
    whiteSpace: 'pre-wrap',
    padding: theme.spacing(),
    paddingRight: theme.spacing(7),
  },
}));

export const createChatBubbleComponent = (message: IncomingMessage) => {
  return () => {
    const styles = useStyles();
    return (
      <ChatBubbleBase
        isSelfMessage={message instanceof OutgoingMessage}
        timestamp={message.timestamp}
      >
        <div className={styles.text}>{message.message}</div>
      </ChatBubbleBase>
    );
  };
};
