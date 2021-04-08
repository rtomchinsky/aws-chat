import React from 'react';
import clsx from 'clsx';

import Toolbar from '@material-ui/core/Toolbar';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';

import SendIcon from '@material-ui/icons/Send';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  toolbar: {
    backgroundColor: theme.palette.grey[300],
    display: 'flex',
  },
  input: {
    backgroundColor: theme.palette.background.paper,
    padding: `${theme.spacing()}px ${theme.spacing(3)}px`,
    marginRight: theme.spacing(),
    borderRadius: theme.spacing(3),
    flex: 1,
  },
}));

export type ChatInputProps = {
  className?: string;
  onSend: (message: string) => void;
};

const ChatInput = ({ className, onSend }: ChatInputProps) => {
  const [message, setMessage] = React.useState('');
  const sendMessage = React.useMemo(
    () => (message: string) => {
      if (message.trim().length > 0) {
        onSend(message);
        setMessage('');
      }
    },
    [onSend],
  );

  const styles = useStyles();

  return (
    <Toolbar
      className={clsx(styles.toolbar, className)}
      component="form"
      onSubmit={(e: React.FormEvent) => {
        e.preventDefault();
        sendMessage(message);
      }}
    >
      <InputBase
        className={styles.input}
        value={message}
        onChange={(e) => setMessage(e.currentTarget.value)}
      />
      <IconButton disabled={message.trim().length === 0} type="submit">
        <SendIcon />
      </IconButton>
    </Toolbar>
  );
};

export default ChatInput;
