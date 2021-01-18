import { Schema, model } from "mongoose";
import user from "../graphql/resolvers/user";

const userInfo = {
  user: { type: Schema.Types.ObjectId, ref: "users", required: true },
  username: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  isActive: { type: Boolean, default: false },
};

const postSchema = Schema({
  ...userInfo,
  body: { type: String, required: true },
  Comments_Closed: { type: Boolean, default: false },
  files: [{
    path: { type: String, required:true },
    filename: { type: String, required:true },
    createdAt: { type: Date, default: Date.now },
    description: { type: String, default: "" },
  }],
  modifings: [
    {
      body: { type: String, required: true },
      updated_at: { type: Date, default: Date.now },
    },
  ],
  comments: [
    {
      ...userInfo,
      body: { type: String, required: true },
      modifings: [
        {
          body: String,
          updated_at: { type: Date, default: Date.now },
        },
      ],
      likes: [userInfo],
      responses: [
        {
          ...userInfo,
          body: { type: String, required: true },
          likes: [userInfo],
        },
      ],
    },
  ],
  likes: [userInfo],
});

export default model("Post", postSchema);
