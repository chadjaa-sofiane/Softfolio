import React from "react";
import { Grid, Button, makeStyles, TextField } from "@material-ui/core";
import { useMutation, gql } from "@apollo/client";

const useStyles = makeStyles((theme) => ({
  input: {
    display: "none",
  },
}));

const CREATE_POST = gql`
  mutation createP($body: String!, $files: [Upload]) {
    createPost(postinput: { body: $body, files: $files }) {
      body
      _id
    }
  }
`;

export default function Footer() {
  const classes = useStyles();
  const [files, setFiles] = React.useState([]);
  const [body, setbody] = React.useState([]);
  const handlechange = (e) => {
    const { files: inpufiles } = e.target;
    setFiles(inpufiles);
  };
  const [createPost] = useMutation(CREATE_POST, {
    update: (_, result) => {
      console.log(result);
    },
    onerror: (err) => {
      console.log(err.graphQLErrors[0].extensions.errors);
    },
  });
  return (
    <>
      <Grid item xs={12}>
        <label htmlFor="files">
          <Button
            className={classes.bgImageBotton}
            variant="contained"
            color="secondary"
            component="span"
          >
            change
          </Button>
        </label>
        <input
          accept="image/*"
          className={classes.input}
          id="files"
          multiple
          onChange={handlechange}
          type="file"
        />
        <br />
        <TextField
          onChange={(e) => {
            setbody(e.target.value);
          }}
        />
        <h1>{body}</h1>
        <Button
          variant="outlined"
          onClick={() => {
            createPost({
              variables: {
                body,
                files,
              },
            });
          }}
        >
          create Post
        </Button>
      </Grid>
    </>
  );
}
