import { useState } from "react";
import {
  FormControlLabel,
  Checkbox,
  Typography,
  withStyles,
} from "@material-ui/core";
import { useMutation } from "@apollo/client";
import Favorite from "@material-ui/icons/Favorite";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";
import { LIKE_COMMENT, LIKE_POST } from "../../graphql/mutations";
import { useLogged } from "../../util/hooks";

const Count = withStyles(() => ({
  root: {
    width: 50,
    maxWidth: 50,
    fontWeight: "bold",
  },
}))(Typography);

function Like({
  largeSize = false,
  IlikedIt,
  children,
  postId = null,
  commentId = null,
}) {
  const isLogged = useLogged();
  const [likecheck, onchange] = useState(IlikedIt);
  const [likePost] = useMutation(LIKE_POST, {
    variables: { postId },
    update: (cache, result) => {
      cache.modify({
        id: cache.identify({
          __typename: "Post",
          id: postId,
        }),
        fields: {
          likesCount: result.data.likesCount,
        },
      });
    },
  });
  const [likeComment] = useMutation(LIKE_COMMENT, {
    variables: { postId, commentId },
    update: (_, result) => console.log(result),
  });
  const like = async () => {
    if (postId && commentId) return await likeComment();
    if (postId) return await likePost();
  };
  return (
    <>
      <FormControlLabel
        control={
          <Checkbox
            disabled={!isLogged}
            checked={likecheck}
            icon={
              <FavoriteBorder
                fontSize={largeSize ? "large" : "default"}
                color="primary"
              />
            }
            checkedIcon={
              <Favorite
                fontSize={largeSize ? "large" : "default"}
                color="primary"
              />
            }
            name="like"
            onChange={() => {
              like();
              onchange(!likecheck);
            }}
          />
        }
        label={<Count>{children}</Count>}
      />
    </>
  );
}

export default Like;
