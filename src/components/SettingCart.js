import React from "react";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Avatar,
  makeStyles,
  Paper,
  Typography,
  ButtonBase,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import FacebookIcon from "@material-ui/icons/Facebook";
import TwitterIcon from "@material-ui/icons/Twitter";
import EmailIcon from "@material-ui/icons/Email";
import TelegramIcon from "@material-ui/icons/Telegram";
import ChangeTheme from "../containers/changeTheme";
import Logout from "../containers/Logout";
import Login from "../containers/login";
import { useQuery } from "@apollo/client";
import { GET_MY_INFO } from "../graphql/querys";
import { useLogged } from "../util/hooks";

const useStyle = makeStyles((theme) => ({
  root: {
    width: "100%",
    height: "70vh",
    padding: "10px",
    boxSizing: "border-box",
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  profileAvatar: {
    width: theme.spacing(10),
    height: theme.spacing(10),
    border: "2px solid red",
    color: theme.palette.primary.dark,
    margin: "auto",
  },
}));

function SettingCart() {
  const classes = useStyle();
  return <Paper variant="outlined" className={classes.root}>
    <SettingList/>
  </Paper>;
}

export const SettingList = ()=> {
  const isLoggedIn = useLogged();
  return (
    <>
      {isLoggedIn && <InfoCart />} 
      <List component="nav" variant="outlined" style={{width:"100%"}}>
        <ListItem button>
          <ChangeTheme />
        </ListItem>
        {isLoggedIn ? (
          <Logout>
            <ListItem button>
              <ListItemIcon>
                <ExitToAppIcon color="secondary" />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItem>
          </Logout>
        ) : (
          <Login>
            <ListItem button>
              <ListItemIcon>
                <AccountBoxIcon color="primary" />
              </ListItemIcon>
              <ListItemText primary="Login" />
            </ListItem>
          </Login>
        )}
        <a href="https://www.facebook.com/profile.php?id=100044256948808">
          <ListItem button>
            <ListItemIcon>
              <FacebookIcon style={{ color: "blue" }} />
            </ListItemIcon>
            <ListItemText primary="facebook" />
          </ListItem>
        </a>

        <a href="https://twitter.com/CSofianne">
          <ListItem button>
            <ListItemIcon>
              <TwitterIcon style={{ color: "lightblue" }} />
            </ListItemIcon>

            <ListItemText primary="twitter" />
          </ListItem>
        </a>
        <a href="mailto:sofianne012@gmail.com">
          <ListItem button>
            <ListItemIcon>
              <EmailIcon />
            </ListItemIcon>
            <ListItemText primary="Gmail" />
          </ListItem>
        </a>
        <ListItem button>
          <ListItemIcon>
            <TelegramIcon style={{ color: "lightblue" }} />
          </ListItemIcon>
          <ListItemText primary="telegram" />
        </ListItem>
      </List>
    </>
  );
}

const InfoCart = () => {
  const classes = useStyle();
  const history = useHistory();
  const { data, loading } = useQuery(GET_MY_INFO);
  if (loading) return "loading....";
  if (!data) return "";
  const {
    getMyInfo: { username, profileImage },
  } = data;
  return (
    <ButtonBase
      style={{ width: "100%" }}
      onClick={() => history.push(`/profile/${username}`)}
    >
      <Paper variant="outlined" square elevation={4} style={{ width: "100%" }}>
        <Avatar
          className={classes.profileAvatar}
          src={profileImage.path || ""}
        />
        <Typography variant="h5">{username}</Typography>
      </Paper>
    </ButtonBase>
  );
};
export default SettingCart;
