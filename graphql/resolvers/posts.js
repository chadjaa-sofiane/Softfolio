import Post from "../../models/post";
import checkAuth from "../../util/check_Auth";
import User from "../../models/user";
import { UserInputError, AuthenticationError } from "apollo-server-express";
import { processUpload, deleteFile } from "../../util/upload";
import mongoose from "mongoose";
const ObjectId = mongoose.Types.ObjectId;

export default {
  Query: {
    async getPosts(_, { body, postId, limit, skip }) {
      try {
        const inputs = {};
        if (body) inputs.body = new RegExp(body);
        if (postId) inputs._id = postId.trim();
        const posts = await Post.find(inputs).skip(skip).limit(limit);
        return posts;
      } catch (err) {
        throw new Error(err);
      }
    },
  },
  Mutation: {
    async createPost(_, { postinput: { body, files } }, context) {
      const { id, username } = checkAuth(context);
      if (!body.trim()) {
        throw new UserInputError("post most not be empty!!");
      }
      const newpost = new Post({
        body,
        user: id,
        username: username,
      });
      await newpost.save();

      const uploadFiles = async () => {
        return await Promise.all(
          files.map((file) => processUpload(file, "posts", username))
        );
      };
      if (files) {
        await Post.updateOne(
          {
            _id: ObjectId(newpost.id),
          },
          {
            $push: {
              files: await uploadFiles(),
            },
          }
        );
      }
      context.pubsub.publish("NEW_POST", {
        newpost,
      });

      return newpost;
    },
    async deletePost(_, { postId }, context) {
      const { id } = checkAuth(context);
      const post = await Post.findById(postId.trim());
      if (!post) throw new UserInputError("post not found");
      if (post.user != id.trim())
        throw new AuthenticationError("Action not Allowed");
      if (post.files)
        await Promise.all(
          post.files.map((file) => {
            deleteFile(file.path);
          })
        );
      await Post.deleteOne({ _id: postId.trim() });
      return "delete post succefuly";
    },
    async likePost(_, { postId }, context) {
      const { username, id } = checkAuth(context);
      await Post.updateOne(
        {
          _id: ObjectId(postId),
          "likes.username": { $ne: username },
        },
        {
          $push: {
            likes: {
              username,
              user: id,
            },
          },
        }
      );
      await Post.findByIdAndUpdate(
        postId,
        {
          $set: {
            "likes.$[true].isActive": false,
            "likes.$[false].isActive": true,
          },
        },
        {
          multi: true,
          arrayFilters: [
            { "true.isActive": true, "true.username": username },
            { "false.isActive": false, "false.username": username },
          ],
        }
      );
      return {
        username,
        _id: postId,
        user: id,
      };
    },
    modifyPost: async (_, { postId, body }, context) => {
      const { id } = checkAuth(context);
      const post = await Post.findOne(
        { _id: ObjectId(postId) },
        { body: 1, user: 1 }
      );
      if (!post) throw new UserInputError("post not found");
      if (post.user != id) throw new AuthenticationError("Action not Alowed");
      await Post.updateOne(
        { _id: ObjectId(postId) },
        {
          $push: {
            modifings: {
              body: post.body,
            },
          },
          $set: {
            body,
          },
        }
      );
      return "succefuly";
    },
  },
  Post: {
    async getProfileUser({ user }, _, context) {
      const {
        headers: { host },
        protocol,
      } = context.req;
      const { images } = await User.findOne(
        { _id: user },
        { _id: 0, images: 1 }
      );
      const profileImage = images.find((I) => I.profile == true);
      if (!profileImage) return {};
      profileImage.path = `${protocol}://${host}/${profileImage.path}`;
      return profileImage;
    },
    likesCount: async ({ _id }) => {
      const likes = await Post.aggregate([
        {
          $match: {
            _id: ObjectId(_id),
            likes: { $exists: true },
          },
        },
        {
          $project: {
            _id: 0,
            likesCount: {
              $size: {
                $filter: {
                  input: "$likes",
                  as: "like",
                  cond: { $eq: ["$$like.isActive", true] },
                },
              },
            },
          },
        },
      ]);
      if (likes.length === 0) return 0;
      return likes[0].likesCount;
    },
    commentsCount: async ({ _id }) => {
      const comments = await Post.aggregate([
        { $match: { _id: ObjectId(_id) } },
        {
          $project: {
            _id: 0,
            commentsCount: {
              $size: "$comments",
            },
          },
        },
      ]);
      return comments[0].commentsCount;
    },
    IlikedIt: async ({ _id }, _, context) => {
      try {
        const { username } = checkAuth(context);
        const post = await Post.findOne(
          {
            _id: ObjectId(_id),
            likes: {
              $elemMatch: {
                username,
                isActive: true,
              },
            },
          },
          { _id: 1 }
        );
        if (!post) return false;
        return true;
      } catch {
        return false;
      }
    },
  },
  Subscription: {
    newPost: {
      subscribe: () => pubsub.asyncIterator("NEW_POST"),
    },
  },
};
