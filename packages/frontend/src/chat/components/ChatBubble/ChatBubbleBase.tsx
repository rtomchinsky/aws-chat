import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { DateTime } from 'luxon';
import React from 'react';
import Typography from '@material-ui/core/Typography';

export type ChatBubbleBaseProps = React.PropsWithChildren<{
  timestamp: DateTime;
  isSelfMessage: boolean;
}>;

const useStyles = makeStyles((theme) => ({
  paper: ({ isSelfMessage }: ChatBubbleBaseProps) => ({
    position: 'relative',
    margin: theme.spacing(1),
    marginBottom: 0,
    backgroundColor: isSelfMessage
      ? theme.palette.primary.light
      : theme.palette.background.default,
    color: isSelfMessage
      ? theme.palette.primary.contrastText
      : theme.palette.text.primary,
    alignSelf: isSelfMessage ? 'flex-end' : 'flex-start',
    '&:not(:first-child)': {
      marginTop: theme.spacing(1),
    },
  }),
  footer: {
    position: 'absolute',
    bottom: 0,
    right: theme.spacing(0.5),
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    '& $timestamp': {
      alignSelf: 'flex-end',
    },
  },
  timestamp: {
    padding: 2,
    fontSize: '0.65rem',
  },
}));

const ChatBubbleBase = (props: ChatBubbleBaseProps) => {
  const { children, timestamp } = props;
  const styles = useStyles(props);

  return (
    <Paper className={styles.paper}>
      {children}
      <footer className={styles.footer}>
        <Typography
          variant="caption"
          component="span"
          className={styles.timestamp}
        >
          {timestamp.toFormat('hh:mm')}
        </Typography>
      </footer>
    </Paper>
  );
};

export default ChatBubbleBase;
