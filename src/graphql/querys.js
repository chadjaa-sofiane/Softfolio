import { gql } from "@apollo/client";

export const GET_POSTS = gql`
  query getPosts {
    getPosts {
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
      comments {
        _id
        user
        username
        createdAt
        body
        IlikedIt
        getProfileUser {
          _id
          path
        }
      }
      files {
        path
      }
    }
  }
`;
export const GET_ALL_USERS = gql`
  query users($skip: Int, $limit: Int) {
    getAllUsers(limit: $limit, skip: $skip) {
      _id
      username
      description
      backgroundImage {
        _id
        path
      }
      profileImage {
        _id
        path
      }
    }
    getUsersCount
  }
`;

export const GET_USER = gql`
  query user($id: ID, $username: String) {
    getOneUser(id: $id, username: $username) {
      username
      description
      email
      backgroundImage {
        _id
        path
      }
      profileImage {
        _id
        path
      }
      blogs {
        _id
        title
        body
        createdAt
      }
    }
  }
`;

export const GET_MY_INFO = gql`
  query {
    getMyInfo {
      _id
      username
      email
      profileImage {
        _id
        path
      }
    }
  }
`;
