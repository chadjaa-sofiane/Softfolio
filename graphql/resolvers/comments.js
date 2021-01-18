import { UserInputError, AuthenticationError } from "apollo-server-express";
import Post from "../../models/post";
import User from "../../models/user";
import checkAuth from "../../util/check_auth";
import mongoose from "mongoose";

const ObjectId = mongoose.Types.ObjectId;

const findComment = async (postId, commentId) => {
  const res = await Post.aggregate([
    { $match: { _id: ObjectId(postId) } },
    {
      $project: {
        _id: 0,
        comment: {
          $filter: {
            input: "$comments",
            as: "comment",
            cond: { $eq: ["$$comment._id", ObjectId(commentId)] },
          },
        },
      },
    },
    {
      $project: {
        "comment.likes": 0,
        "comment.responses": 0,
        "comment.modifings:": 0,
      },
    },
  ]);
  if (res[0].comment.length === 0)
    throw new UserInputError("comment not found");
  return res[0].comment[0];
};

export default {
  Mutation: {
    async createComment(_, { postId, body }, context) {
      const { username, id } = checkAuth(context);
      if (!body.trim()) {
        throw new UserInputError("comment empty", {
          errors: {
            body: "comment body most not be empty",
          },
        });
      }
      const user = await User.findOne({ _id: ObjectId(id) }, { id: 1 });
      if (!user) throw new UserInputError("user not found !!!");
      const post = await Post.findOne({ _id: ObjectId(postId) }, { _id: 1 });
      if (!post) throw new UserInputError("post not found !!!");
      const newComment = {
        _id: ObjectId(),
        user: id,
        body,
        username,
        createdAt: new Date(),
        isActive: true,
      };
      const res = await Post.updateOne(
        { _id: ObjectId(postId) },
        {
          $push: {
            comments: newComment,
          },
        }
      );
      return newComment;
    },
    async deleteComment(_, { postId, commentId }, context) {
      const { username } = checkAuth(context);
      await findComment(postId, commentId);
      await Post.updateOne(
        {
          _id: ObjectId(postId),
          comments: {
            $elemMatch: {
              _id: ObjectId(commentId),
              username,
            },
          },
        },
        {
          $pull: {
            comments: {
              _id: ObjectId(commentId),
            },
          },
        }
      );
      return "succefuly!";
    },
    async likeComment(_, { postId, commentId }, context) {
      const { username, id } = checkAuth(context);
      await Post.updateOne(
        {
          _id: ObjectId(postId),
          comments: {
            $elemMatch: {
              _id: ObjectId(commentId),
              "likes.username": { $ne: username },
            },
          },
        },
        {
          $push: {
            "comments.$.likes": {
              user: id,
              username,
            },
          },
        }
      );
      await Post.updateOne(
        {
          _id: ObjectId(postId),
          comments: {
            $elemMatch: {
              _id: ObjectId(commentId),
            },
          },
        },
        {
          $set: {
            "comments.$.likes.$[true].isActive": false,
            "comments.$.likes.$[false].isActive": true,
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
      return "liking comment succefully!!";
    },
    modifyComment: async (_, { postId, commentId, body }, context) => {
      const { id } = checkAuth(context);
      const comment = await findComment(postId, commentId);
      if (comment.user != id)
        throw new AuthenticationError("Action not Alowed !");
      await Post.updateOne(
        {
          _id: ObjectId(postId),
          comments: {
            $elemMatch: {
              _id: ObjectId(commentId),
            },
          },
        },
        {
          $push: {
            "comments.$.modifings": {
              body: comment.body,
            },
          },
          $set: {
            "comments.$.body": body,
          },
        }
      );
      return "modifing comment succefuly";
    },
  },
  Comment: {
    IlikedIt: async ({ _id }, _, context) => {
      try {
        const { username } = checkAuth(context);
        const comment = await Post.findOne(
          {
            comments: {
              $elemMatch: {
                _id: ObjectId(_id),
                likes: {
                  $elemMatch: {
                    username,
                    isActive: true,
                  },
                },
              },
            },
          },
          { _id: 1 }
        );
        if (comment) return true;
        return false;
      } catch {
        return false;
      }
    },
    getProfileUser: async ({ user }, _, context) => {
      const {
        headers: { host },
        protocol,
      } = context.req;
      const { images } = await User.findOne(
        { _id: ObjectId(user) },
        { _id: 0, images: 1 }
      );
      const profileImage = images.find((I) => I.profile == true);
      if (!profileImage) return {};
      profileImage.path = `${protocol}://${host}/${profileImage.path}`;
      return profileImage;
    },
  },
};
