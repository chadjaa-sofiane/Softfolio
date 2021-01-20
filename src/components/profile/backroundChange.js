import { Button, IconButton, makeStyles, Paper } from "@material-ui/core";
import React from "react";
import FlyingDiv from "../../containers/flyingDiv";
import CloseRoundedIcon from "@material-ui/icons/CloseRounded";
import { useSrc } from "../../util/hooks";
import { useMutation } from "@apollo/client";
import { UPLOAD_FILE } from "../../graphql/mutations";
const useStyle = makeStyles((theme) => ({
  Paper: {
    position: "relative",
    width: "60%",
    marginTop: "70px",
    margin: "auto",
    [theme.breakpoints.only("sm")]: {
      width: "75%",
    },
    [theme.breakpoints.only("xs")]: {
      width: "95%",
    },
  },
  img: {
    width: "100%",
    objectFit: "container",
  },
  delete: {
    position: "absolute",
    top: 5,
    right: 5,
    textShadow: "1px 1px 1px black",
    color: "#FFF",
  },
  btn: {
    position: "absolute",
    bottom: 5,
    right: 5,
  },
}));

function BackroundChange({ file = "", userId = null }) {
  const classes = useStyle();
  const { src } = useSrc(file);
  const [open, handleOpen] = React.useState(true);
  const [upoadFile] = useMutation(UPLOAD_FILE, {
    update: (cache, { data: { uploadImages } }) => {
      cache.modify({
        id: cache.identify({
          __typename: "User",
          _id: userId,
        }),
        fields: {
          backgroundImage() {
            return uploadImages;
          },
        },
      });
    },
    onerror: (err) => {
      console.log(err.graphQLErrors[0]);
    },
  });
  function changeBackground() {
    if (!file) return;
    upoadFile({
      variables: {
        file,
        status: "background",
      },
    });
  }
  React.useEffect(() => {
    handleOpen(true);
  }, [file]);
  return (
    <FlyingDiv open={open} handleOpen={handleOpen}>
      <Paper className={classes.Paper}>
        <img className={classes.img} src={src} alt="backgroundImage" />
        <IconButton
          classes={{
            root: classes.delete,
          }}
          onClick={() => handleOpen(false)}
        >
          <CloseRoundedIcon color="secondary" fontSize="large" />
        </IconButton>

        <Button
          variant="contained"
          color="primary"
          className={classes.btn}
          onClick={async () => {
            await changeBackground();
            handleOpen(false);
          }}
        >
          Accept
        </Button>
      </Paper>
    </FlyingDiv>
  );
}
export default BackroundChange;
