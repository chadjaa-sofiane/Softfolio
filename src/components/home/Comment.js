import {
  Card,
  CardContent,
  CardHeader,
  Avatar,
  Typography,
  IconButton,
  makeStyles,
  withStyles,
  Checkbox,
  FormControlLabel,
  CardActions,
} from "@material-ui/core";
import React from "react";
import ChatBubbleOutlineOutlinedIcon from "@material-ui/icons/ChatBubbleOutlineOutlined";
import ChatBubbleOutlinedIcon from "@material-ui/icons/ChatBubbleOutlined";
import moment from "moment";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Like from "./like";
import { useHistory } from "react-router-dom";

const useStyle = makeStyles((theme) => ({
  commentCard: {
    padding: "0 15px",
  },
  CardHeader: {
    padding: "15px",
  },
  contect: {
    padding: "0 15px",
  },
  body: {
    color: theme.palette.primary.main,
    fontWeight: "500",
    margin: "0",
  },
  action: {
    padding: "0 15px",
  },
}));

const CommentAvatar = withStyles((theme) => ({
  root: {
    cursor: "pointer",
    background: theme.palette.secondary.main,
    width: theme.spacing(5),
    height: theme.spacing(5),
  },
}))(Avatar);

const Comment = ({
  postId,
  comment: { _id, username, createdAt, IlikedIt, getProfileUser },
  children,
}) => {
  const history = useHistory();
  const [openCommens, hanleOpenComments] = React.useState(false);
  const date = new Date(parseInt(createdAt)).toISOString();
  const classes = useStyle();
  return (
    <Card
      className={classes.commentCard}
      style={{ padding: 0, background: "transparent" }}
    >
      <CardHeader
        className={classes.CardHeader}
        avatar={
          <CommentAvatar
            onClick={() => history.push(`profile/${username}`)}
            src={getProfileUser.path || ""}
            aria-label="recipe"
          >
            {username.substr(0, 1)}
          </CommentAvatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        subheader={moment(date).fromNow(true)}
        title={username}
      />
      <CardContent className={classes.contect}>
        <Typography className={classes.body} variant="h6">
          {children}
        </Typography>
      </CardContent>
      <CardActions className={classes.action}>
        <Like IlikedIt={IlikedIt} postId={postId} commentId={_id} />
        <FormControlLabel
          control={
            <Checkbox
              style={{display:"none"}}
              icon={<ChatBubbleOutlineOutlinedIcon color="secondary" />}
              checkedIcon={<ChatBubbleOutlinedIcon color="secondary" />}
              name="comment"
              color="primary"
              onChange={() => hanleOpenComments(!openCommens)}
            />
          }
        />
      </CardActions>
    </Card>
  );
};

export default Comment;
