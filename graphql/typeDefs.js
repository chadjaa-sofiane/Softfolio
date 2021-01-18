import { gql } from "apollo-server-express";

export default gql`
  type User {
    _id: ID!
    username: String
    email: String
    createdAt: String
    BorthDay: String
    gender: String
    isActive: Boolean
    token: String
    description: String
    images: [Image]
    backgroundImage: Image
    profileImage: Image
    blogs: [Blog]
  }
  type Image {
    _id: ID
    profile: Boolean
    background: Boolean
    path: String
    createdAt: String
    description: String
  }
  type Blog {
    _id: ID!
    title: String
    body: String
    createdAt: String
  }
  type Post {
    _id: ID
    body: String
    user: ID
    username: String
    getProfileUser: Image
    createdAt: String
    Comments_Closed: Boolean
    modifings: [Modifing]!
    comments: [Comment]!
    likes: [Like]!
    likesCount: Int!
    commentsCount: Int!
    files: [files]
    IlikedIt: Boolean
  }
  type Modifing {
    body: String
    updated_at: String
  }
  type Comment {
    _id: ID
    body: String
    user: ID
    username: String
    getProfileUser: Image
    createdAt: String
    modifings: [Modifing]
    likes: [Like]!
    isActive: Boolean
    IlikedIt: Boolean
  }
  type Like {
    user: ID
    username: String
    createdAt: String
    isActive: Boolean
  }
  type files {
    path: String
    filename: String
    createdAt: String
    description: String
  }
  input SiginInput {
    username: String!
    email: String!
    BorthDay: String!
    gender: Gender!
    password: String!
    description: String
  }
  input loginInput {
    userInput: String!
    password: String!
  }
  input postinput {
    body: String!
    files: [Upload]
  }
  input filesinput {
    file: Upload!
    status: Status!
    description: String
  }
  enum Gender {
    MALE
    FEMALE
  }
  enum Status {
    background
    profile
  }
  type Query {
    getAllUsers(username: String, id: ID, limit: Int, skip: Int): [User]
    getOneUser(username: String, id: ID): User
    getMyInfo: User
    getPosts(body: String, postId: ID, limit: Int, skip: Int): [Post]
    getUsersCount: Int
  }
  type Mutation {
    sigup(SiginInput: SiginInput): User!
    login(loginInput: loginInput): User!
    createBlog(title: String!, body: String!): Blog!
    createPost(postinput: postinput): Post
    deletePost(postId: ID!): String
    likePost(postId: ID!): Post!
    modifyPost(postId: ID!, body: String!): String
    createComment(postId: ID!, body: String): Comment
    deleteComment(postId: ID!, commentId: ID!): String
    likeComment(postId: ID!, commentId: ID): String
    modifyComment(postId: ID!, commentId: ID!, body: String!): String
    uploadImages(image: filesinput): Image
    deleteImages(image_path: String): String
  }
  type Subscription {
    newPost: Post!
  }
`;
