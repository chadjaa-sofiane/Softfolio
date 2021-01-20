import { useState } from "react";
import {
  withStyles,
  FormControl,
  InputAdornment,
  Input,
  IconButton,
} from "@material-ui/core";
import SendIcon from "@material-ui/icons/Send";
import { useMutation } from "@apollo/client";
import { CREATE_COMMENT } from "../../graphql/mutations";
const CommentField = withStyles((theme) => ({
  root: {
    padding: "10px 15px",
    width: "100%",
    fontSize: "1.2em",
    marginTop: "20px",
    margin: "auto",
    fontWeight: "bold",
  },
}))(Input);

function CreateComment({ postId = null, onClick = () => {} }) {
  const [body, setbody] = useState("");
  const [createComment] = useMutation(CREATE_COMMENT, {
    update: (cache, { data: { createComment } }) => {
      cache.modify({
        id: cache.identify({
          __typename: "Post",
          _id: postId,
        }),
        fields: {
          comments(existingComments = []) {
            return [...existingComments, createComment];
          },
        },
      });
    },
  });
  return (
    <>
      <FormControl style={{ width: "100%" }}>
        <CommentField
          value={body}
          onChange={(e) => setbody(e.target.value)}
          multiline
          placeholder="enter your comment here"
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                disabled={body.trim() === "" ? true : false}
                aria-label="send comment"
                color="primary"
                edge="end"
                onClick={async () => {
                  await createComment({
                    variables: {
                      body,
                      postId,
                    },
                  });
                  setbody("");
                  onClick(true);
                }}
              >
                <SendIcon fontSize="large" />
              </IconButton>
            </InputAdornment>
          }
        />
      </FormControl>
    </>
  );
}

export default CreateComment;
