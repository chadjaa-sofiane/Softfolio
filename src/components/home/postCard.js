import React from "react";
import { useHistory } from "react-router-dom";
import {
  Card,
  Collapse,
  CardContent,
  CardHeader,
  Avatar,
  Typography,
  IconButton,
  makeStyles,
  withStyles,
  Checkbox,
  FormControlLabel,
  CardMedia,
  CardActions,
} from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import ChatBubbleOutlineOutlinedIcon from "@material-ui/icons/ChatBubbleOutlineOutlined";
import ChatBubbleOutlinedIcon from "@material-ui/icons/ChatBubbleOutlined";
import BookmarkBorderOutlinedIcon from "@material-ui/icons/BookmarkBorderOutlined";
import moment from "moment";
import Comment from "./Comment";
import Like from "./like";
import CreateComment from "./createComment";
import { useLogged } from "../../util/hooks";

const useStyle = makeStyles((theme) => ({
  root: {
    width: "100%",
    marginBottom: "15px",
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  body: {
    color: theme.palette.primary.main,
    fontWeight: "500",
    margin: "0",
  },
  contect: {
    padding: "0 15px",
  },
  action: {
    padding: "0 0 0 15px",
  },
  bookmarkbtn: {
    marginLeft: "auto",
  },
  CardHeader: {
    padding: "15px",
  },
}));

const ProfileAvatar = withStyles((theme) => ({
  root: {
    cursor: "pointer",
    background: theme.palette.primary.dark,
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
}))(Avatar);

const Count = withStyles((theme) => ({
  root: {
    width: 50,
    maxWidth: 50,
    fontWeight: "bold",
  },
}))(Typography);

function PostCard({ postData = {} }) {
  const {
    _id,
    username,
    body,
    files,
    createdAt,
    comments,
    likesCount,
    IlikedIt,
    getProfileUser,
    commentsCount,
  } = postData;
  const classes = useStyle();
  const isLoggedIn = useLogged();
  const history = useHistory();
  const [openCommens, hanleOpenComments] = React.useState(false);
  const date = new Date(parseInt(createdAt)).toISOString();
  return (
    <>
      <Card className={classes.root} variant="outlined">
        <CardHeader
          className={classes.CardHeader}
          avatar={
            <ProfileAvatar
              src={getProfileUser.path || ""}
              onClick={() => history.push(`/profile/${username}`)}
              aria-label="recipe"
            >
              {username.substr(0, 1)}
            </ProfileAvatar>
          }
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
          title={username}
          subheader={moment(date).fromNow(true)}
        />
        <PostCardMedia sources={files} />
        <CardContent className={classes.contect}>
          <Typography className={classes.body} variant="h6">
            {body}
          </Typography>
        </CardContent>
        <CardActions className={classes.action} disableSpacing>
          <Like postId={_id} IlikedIt={IlikedIt} largeSize>
            {likesCount}
          </Like>
          <FormControlLabel
            control={
              <Checkbox
                disabled={comments.length === 0}
                checked={openCommens}
                icon={
                  <ChatBubbleOutlineOutlinedIcon
                    fontSize="large"
                    color="secondary"
                  />
                }
                checkedIcon={
                  <ChatBubbleOutlinedIcon fontSize="large" color="secondary" />
                }
                name="comment"
                color="secondary"
                onChange={() => hanleOpenComments(!openCommens)}
              />
            }
            label={<Count>{commentsCount}</Count>}
          />
          <IconButton className={classes.bookmarkbtn}>
            <BookmarkBorderOutlinedIcon fontSize="large" />
          </IconButton>
        </CardActions>
        <Collapse in={openCommens}>
          {comments.map((comment) => (
            <Comment postId={_id} key={comment._id} comment={comment}>
              {comment.body}
            </Comment>
          ))}
        </Collapse>
        {isLoggedIn && (
          <CreateComment onClick={hanleOpenComments} postId={_id} />
        )}
      </Card>
    </>
  );
}

const PostCardMedia = ({ sources }) => {
  const classes = useStyle();
  if (sources.length === 0) return "";
  return (
    <>
      <CardMedia
        className={classes.media}
        image="https://i.ytimg.com/vi/Eet1n2NFN3E/maxresdefault.jpg"
        title="Paella dish"
      />
    </>
  );
};

export default PostCard;
