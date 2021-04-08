// import Head from 'next/head';
import React from 'react';
import { useChat, ChatProvider, ChatScreen } from '../src/chat';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  container: {
    borderTop: 1,
  },
});

export default function Home() {
  return (
    <ChatProvider wsUrl={process.env.NEXT_PUBLIC_WEBSOCKET_ADDRESS}>
      <ChatScreen />
    </ChatProvider>
  );
}
