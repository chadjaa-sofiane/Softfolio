import React from "react";
import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Grid,
  CardActionArea,
  Typography,
  makeStyles,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
const useStyles = makeStyles((theme) => ({
  root: {
    height: 300,
    width: "100%",
    padding: 0,
  },
  media: {
    height: 140,
    "& > img":{
      objectFit: "contain"
    }
  },
  avatar: {
    background: "red",
    color: "#FFF",
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
  username: {
    fontSize: "1.2em",
    fontWeight: "bold",
  },
  description: {
    fontSize: "1.2em",
    fontWeight: "bold",
    color: theme.palette.primary.main,
  },
  body: {
    height: 40,
  },
  CardHeader: {
    padding: "0 15px",
  },
}));

function AboutCart({
  user: { username, _id, description, backgroundImage, profileImage },
}) {
  const classes = useStyles();
  const history = useHistory();
  const image =
    backgroundImage.path ||
    `${process.env.PUBLIC_URL}/assets/red_background_blur.jpg`;
  description =
    description.length > 70 ? `${description.slice(0, 70)}...` : description;
  return (
    <>
      <Grid item xs={12} sm={6} key={_id}>
        <Card className={classes.root}>
          <CardMedia image={image} className={classes.media} title="fuck you" />
          <CardContent className={classes.body}>
            <Typography
              variant="body2"
              component="h1"
              className={classes.description}
            >
              {description}
            </Typography>
          </CardContent>
          <CardActionArea onClick={() => history.push(`/profile/${username}`)}>
            <CardHeader
              className={classes.CardHeader}
              avatar={
                <Avatar
                  className={classes.avatar}
                  src={profileImage.path || ""}
                >
                  {username.substr(0, 1)}
                </Avatar>
              }
              title={username}
              classes={{ title: classes.username }}
            />
          </CardActionArea>
        </Card>
      </Grid>
    </>
  );
}

export default AboutCart;
