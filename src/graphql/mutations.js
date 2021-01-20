import { gql } from "@apollo/client";

export const LOGIN = gql`
  mutation login($userInput: String!, $password: String!) {
    login(loginInput: { userInput: $userInput, password: $password }) {
      _id
      username
      token
    }
  }
`;

export const UPLOAD_FILE = gql`
  mutation uploadImages(
    $file: Upload!
    $status: Status!
    $description: String
  ) {
    uploadImages(
      image: { file: $file, status: $status, description: $description }
    ) {
      _id
      profile
      background
      path
      createdAt
      description
    }
  }
`;

export const LIKE_POST = gql`
  mutation like($postId: ID!) {
    likePost(postId: $postId) {
      likesCount
    }
  }
`;
export const LIKE_COMMENT = gql`
  mutation likecomment($postId: ID!, $commentId: ID!) {
    likeComment(postId: $postId, commentId: $commentId)
  }
`;

export const CREATE_POST = gql`
  mutation createPost($body: String!) {
    createPost(postinput: { body: $body }) {
      _id
      username
      body
      commentsCount
      createdAt
      likesCount
      IlikedIt
      getProfileUser {
        _id
        path
      }
    }
  }
`;

export const CREATE_COMMENT = gql`
  mutation createcomment($postId: ID!, $body: String!) {
    createComment(postId: $postId, body: $body) {
      _id
      user
      username
      createdAt
      body
      IlikedIt
      getProfileUser {
        path
      }
    }
  }
`;

export const CREATE_BLOG = gql`
mutation createBlog($title:String!,$body:String!){
  createBlog(title:$title,body:$body){
    _id
    title
    body
    createdAt
  }
}
`;
