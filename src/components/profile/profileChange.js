import {
  Paper,
  makeStyles,
  IconButton,
  withStyles,
  Avatar,
  Button,
} from "@material-ui/core";
import React from "react";
import FlyingDiv from "../../containers/flyingDiv";
import { useSrc } from "../../util/hooks";
import CloseRoundedIcon from "@material-ui/icons/CloseRounded";
import { useMutation } from "@apollo/client";
import { UPLOAD_FILE } from "../../graphql/mutations";

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "relative",
    margin: "auto",
    marginTop: "20vh",
    width: "40%",
    padding: 15,
    [theme.breakpoints.only("sm")]: {
      width: "55%",
    },
    [theme.breakpoints.only("xs")]: {
      width: "95%",
    },
  },
  btn: {
    position: "absolute",
    bottom: 10,
    right: 10,
  },
}));

const ProfileAvatar = withStyles((theme) => ({
  root: {
    width: theme.spacing(40),
    height: theme.spacing(40),
    margin: "auto",
  },
}))(Avatar);

const DeleteIcon = withStyles((theme) => ({
  root: {
    position: "absolute",
    top: 0,
    right: 0,
  },
}))(IconButton);

function ProfileChange({ file = "" ,userId}) {
  const classes = useStyles();
  const [open, handleOpen] = React.useState(true);
  const { src } = useSrc(file);
  const [upoadFile] = useMutation(UPLOAD_FILE, {
    update(cache, { data: { uploadImages } }) {
      cache.modify({
        id: cache.identify({
          __typename: "User",
          _id: userId,
        }),
        fields: {
          profileImage() {
            return uploadImages;
          },
        },
      });
    },
  });
  function changeProfile() {
    if (!file) return;
    upoadFile({
      variables: {
        file,
        status: "profile",
      },
    });
  }
  React.useEffect(() => {
    handleOpen(true);
  }, [file]);
  return (
    <FlyingDiv open={open} handleOpen={handleOpen}>
      <Paper className={classes.paper}>
        <ProfileAvatar src={src} />
        <DeleteIcon onClick={() => handleOpen(false)}>
          <CloseRoundedIcon fontSize="large" />
        </DeleteIcon>
        <Button
          onClick={async () => {
            await changeProfile();
            handleOpen(false);
          }}
          color="primary"
          variant="contained"
          className={classes.btn}
        >
          Accept
        </Button>
      </Paper>
    </FlyingDiv>
  );
}

export default ProfileChange;
