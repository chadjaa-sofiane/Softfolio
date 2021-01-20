import { useState } from "react";
import { useHistory } from "react-router-dom";
import {
  Card,
  FormControl,
  makeStyles,
  Typography,
  withStyles,
  Input,
  Avatar,
  CardHeader,
  Button,
} from "@material-ui/core";
import { useMyInfo } from "../../util/hooks";
import { useMutation } from "@apollo/client";
import { CREATE_POST } from "../../graphql/mutations";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    marginBottom: 30,
  },
}));

const PostField = withStyles((theme) => ({
  root: {
    width: "95%",
    margin: "auto",
    fontSize: "1.2em",
    padding: "10px 0px",
  },
}))(Input);

const UserAvatar = withStyles((theme) => ({
  root: {
    width: theme.spacing(7),
    height: theme.spacing(7),
    cursor: "pointer",
    background: theme.palette.primary.light,
  },
}))(Avatar);

function CreatePost() {
  const classes = useStyles();
  const history = useHistory();
  const [body, setbody] = useState("");
  const { username, profileImage } = useMyInfo();
  const [createPost] = useMutation(CREATE_POST);
  return (
    <Card variant="outlined" className={classes.root}>
      <CardHeader
        avatar={
          <UserAvatar
            onClick={() => history.push(`/profile/${username}`)}
            src={profileImage.path || ""}
            color="primary"
          >
            {username.substr(0, 1)}
          </UserAvatar>
        }
        title={<Typography color="primary">CREATE NEW POST</Typography>}
      />
      <FormControl style={{ width: "100%" }}>
        <PostField
          value={body}
          onChange={(e) => setbody(e.target.value)}
          multiline
          placeholder="create a post"
        />
      </FormControl>
      <Button
        color="primary"
        variant="contained"
        disabled={body.trim() === ""}
        onClick={async () => {
          await createPost({
            variables: { body },
          });
          setbody("");
        }}
        style={{ float: "right", margin: 15 }}
      >
        send
      </Button>
      <Button
        color="secondary"
        variant="contained"
        disabled={true}
        style={{ float: "right", margin: "15px 0px" }}
      >
        files
      </Button>
    </Card>
  );
}

export default CreatePost;
