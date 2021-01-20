import { useState } from "react";
import {
  Card,
  Typography,
  withStyles,
  Input,
  FormControl,
  InputLabel,
  Button,
} from "@material-ui/core";
import { useMutation } from "@apollo/client";
import { CREATE_BLOG } from "../../graphql/mutations";

const BlogPaper = withStyles((theme) => ({
  root: {
    padding: 15,
    marginTop: 25,
  },
}))(Card);

const BlogTitleInput = withStyles((theme) => ({
  root: {
    width: "40%",
    fontSize: "1.5em",
    marginTop: 25,
  },
}))(Input);

const BlogFieldInput = withStyles((theme) => ({
  root: {
    width: "80%",
    fontSize: "1.2em",
    marginTop: 30,
  },
}))(Input);

function CreateBlogs({ userId }) {
  const [title, setTitle] = useState("");
  const [body, setbody] = useState("");
  const [createBlog] = useMutation(CREATE_BLOG, {
    update(cache, { data: { createBlog } }) {
      cache.modify({
        id: cache.identify({
          __typename: "User",
          _id: userId,
        }),
        fields: {
          blogs(existingBlogs = []) {
            return [...existingBlogs, createBlog];
          },
        },
      });
    },
  });
  return (
    <BlogPaper elevation={5}>
      <Typography variant="h4" color="primary">
        Create a Blog :
      </Typography>
      <FormControl style={{ width: "100%" }}>
        <InputLabel htmlFor="blog-title">
          <h3>Blog Title</h3>
        </InputLabel>
        <BlogTitleInput
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          id="blog-title"
        />
      </FormControl>
      <FormControl style={{ width: "100%" }}>
        <InputLabel htmlFor="blog-body">
          <h4>Blog Text</h4>
        </InputLabel>
        <BlogFieldInput
          value={body}
          onChange={(e) => setbody(e.target.value)}
          id="blog-body"
          multiline
        />
      </FormControl>
      <Button
        variant="contained"
        disabled={title.trim() === "" || body.trim() === ""}
        color="primary"
        style={{ float: "right", margin: "5px 0" }}
        onClick={async () => {
          await createBlog({
            variables: { title, body },
          });
          setbody("");
          setTitle("");
        }}
      >
        Send
      </Button>
    </BlogPaper>
  );
}

export default CreateBlogs;
