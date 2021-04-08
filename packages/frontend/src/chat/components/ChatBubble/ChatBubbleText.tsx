import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
  paper: {
    margin: theme.spacing(1),
  },
}));

const ChatBubbleBase = ({ children }) => {
  const styles = useStyles();

  return <Paper className={styles.paper}>{children}</Paper>;
};

export default ChatBubbleBase;
