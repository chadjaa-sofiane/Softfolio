import React from "react";
import {
  Avatar,
  CardMedia,
  Card,
  makeStyles,
  withStyles,
  IconButton,
  Paper,
  CardActions,
  Menu,
  Button,
  CardActionArea,
  MenuItem,
  Typography,
  Badge,
} from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { GET_USER, GET_MY_INFO } from "../../graphql/querys";
import { useQuery } from "@apollo/client";
import { useFile, useLogged } from "../../util/hooks";
import BackroundChange from "./backroundChange";
import ProfileChange from "./profileChange";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import { Redirect, useParams } from "react-router-dom";
import Blogs from "./Blogs";
import CreateBlogs from "./createBlogs";
import Skeleton from "@material-ui/lab/Skeleton";
const useStyle = makeStyles((theme) => ({
  root: {
    position: "relative",
    overflow: "visible",
    marginBottom: "50px",
  },
  profileHeader: {
    position: "absolute",
    bottom: -theme.spacing(6),
    width: "100%",
  },
  title: {
    position: "relative",
    bottom: "15px",
    color: "white",
    textShadow: "1px 1px 1px black",
    fontWeight: "bold",
    fontSize: "1.4em",
  },
  media: {
    height: "0",
    paddingTop: "40%", // 16:9
    objectFit: "cover",
    width: "100%",
  },
  settingBtn: {
    position: "absolute",
    top: "0",
    right: "15px",
    color: "white",
  },
  paper: {
    marginRight: theme.spacing(2),
  },
  bgImageBotton: {
    position: "absolute",
    right: 25,
    fontSize: ".8em",
    top: 15,
  },
  input: {
    display: "none",
  },
}));

const ProfileAvatar = withStyles((theme) => ({
  root: {
    width: theme.spacing(12),
    height: theme.spacing(12),
    border: "1px solid red",
    color: theme.palette.primary.dark,
  },
}))(Avatar);
const ProfilePhoto = withStyles((theme) => ({
  root: {
    position: "relative",
    top: -15,
    left: -15,
  },
}))(IconButton);

function ProfileCard() {
  const classes = useStyle();
  const { username } = useParams();
  const LoggedIn = useLogged();
  const { data: me } = useQuery(GET_MY_INFO);
  const { data: user, error, loading } = useQuery(GET_USER, {
    variables: { username },
  });
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClose = () => {
    setAnchorEl(null);
  };
  const [background, changeBackgound] = useFile("");
  const [profile, changeProfile] = useFile("");
  if (loading)
    return (
      <div>
        <Skeleton variant="rect" animation="wave" width="100%" height={300} />
        <Skeleton variant="circle" animation="wave" width={100} height={100} />
      </div>
    );
  if (error) return <Redirect to="/Error" />;
  const itsMe =
    (me ? me.getMyInfo.username === user.getOneUser.username : false) &&
    LoggedIn;
  return (
    <>
      <Paper>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={handleClose}>Profile</MenuItem>
          <MenuItem onClick={handleClose}>Setting</MenuItem>
          <MenuItem onClick={handleClose}>
            <ExitToAppIcon />
            Logout
          </MenuItem>
        </Menu>
      </Paper>
      <Card className={classes.root}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image={
              user.getOneUser.backgroundImage.path ||
              `${process.env.PUBLIC_URL}/assets/red_background_blur.jpg`
            }
            title="Paella dish"
          />
        </CardActionArea>
        {itsMe && (
          <IconButton
            aria-controls="simple-menu"
            aria-haspopup="true"
            onClick={() => {}}
            className={classes.settingBtn}
          >
            <MoreVertIcon fontSize="large" />
          </IconButton>
        )}
        <CardActions className={classes.profileHeader}>
          <Badge
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            badgeContent={
              itsMe && (
                <label htmlFor="profile">
                  <ProfilePhoto
                    color="primary"
                    aria-label="upload picture"
                    component="span"
                  >
                    <PhotoCamera fontSize="large" color="primary" />
                  </ProfilePhoto>
                </label>
              )
            }
          >
            <ProfileAvatar src={user.getOneUser.profileImage.path || ""} />
          </Badge>
          <Typography component="h1" variant="body1" className={classes.title}>
            {user.getOneUser.username}
          </Typography>
          {itsMe && (
            <label htmlFor="background">
              <Button
                className={classes.bgImageBotton}
                variant="contained"
                color="secondary"
                component="span"
              >
                change
              </Button>
            </label>
          )}
          <input
            accept="image/*"
            className={classes.input}
            id="background"
            multiple
            onChange={changeBackgound}
            type="file"
          />
          <input
            accept="image/*"
            className={classes.input}
            id="profile"
            onChange={changeProfile}
            type="file"
          />
        </CardActions>
      </Card>
      {itsMe && <CreateBlogs userId={me.getMyInfo._id} />}
      <Paper style={{ padding: 15, margin: "25px 0" }}>
        <Typography variant="h4" color="secondary">
          {user.getOneUser.description}
        </Typography>
      </Paper>
      {user.getOneUser.blogs.length > 0 && (
        <Blogs blogs={user.getOneUser.blogs} />
      )}
      {/* TODO: I Have to unite these later besause there is no big deffrent Between them  */}
      {background && (
        <BackroundChange file={background} userId={me.getMyInfo._id} />
      )}
      {profile && <ProfileChange file={profile} userId={me.getMyInfo._id} />}
      <br />
      <br /> <br />
    </>
  );
}

export default ProfileCard;
