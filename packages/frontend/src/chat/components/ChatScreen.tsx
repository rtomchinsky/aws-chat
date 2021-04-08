import React from 'react';

import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';

import { useChat } from '../context/useChat';
import ChatMessages from './ChatMessages';
import ChatInput from './ChatInput';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(3),
  },
  paper: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  messages: {
    flex: 1,
  },
  input: {
    flex: 0,
  },
}));

const ChatScreen = () => {
  const { messages, sendMessage } = useChat();
  const styles = useStyles();

  return (
    <Box display="flex" flexDirection="column" height="100vh">
      <Container className={styles.container} maxWidth="lg">
        <Paper className={styles.paper}>
          <ChatMessages className={styles.messages} messages={messages} />
          <ChatInput className={styles.input} onSend={sendMessage} />
        </Paper>
      </Container>
    </Box>
  );
};

export default ChatScreen;
