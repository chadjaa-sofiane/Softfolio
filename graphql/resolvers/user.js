import User from "../../models/user";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import checkAuth from "../../util/check_auth";
import { AuthenticationError, UserInputError } from "apollo-server-express";
import mongoose from "mongoose";
import {
  validateSiginInput,
  validateLoginInput,
} from "../../util/user_validate";
require("dotenv").config();
import { processUpload, deleteFile } from "../../util/upload";

const ObjectId = mongoose.Types.ObjectId;

function prepareToken(user) {
  return jwt.sign(
    {
      id: user._id,
      email: user.email,
      username: user.username,
    },
    process.env.SERCRET_TOKEN_KEY,
    { expiresIn: "24h" }
  );
}

export default {
  Query: {
    async getAllUsers(_, { username, id, limit, skip }) {
      try {
        const inputs = {};
        if (username) inputs.username = new RegExp(username);
        if (id) inputs._id = id;
        const Users = await User.find(inputs).skip(skip).limit(limit);
        if (Users.length == 0) {
          throw new UserInputError("users not found", {
            errors: { user: "users not found " },
          });
        }
        return Users;
      } catch (err) {
        throw new Error(err);
      }
    },
    async getOneUser(_, { username, id }) {
      const inputs = {};
      if (username) inputs.username = username;
      if (id) inputs.id = ObjectId(id);
      const user = await User.findOne(inputs);
      if (!user) throw new UserInputError("user not found !!");
      return user;
    },
    getMyInfo: async (_, __, context) => {
      const { id } = checkAuth(context);
      const user = await User.findOne({ _id: id.trim() });
      return user;
    },
    async getUsersCount() {
      const usersCount = await User.find().count();
      return usersCount;
    },
  },
  Mutation: {
    async sigup(
      _,
      {
        SiginInput: {
          username,
          email,
          BorthDay,
          description = " ",
          gender,
          password,
        },
      }
    ) {
      const { errors, valid } = validateSiginInput(
        username,
        email,
        gender,
        password
      );
      if (!valid) {
        throw new UserInputError("errors", { errors });
      }
      const user = await User.findOne({ username });
      if (user) {
        throw new UserInputError("user alredy exist", {
          errors: {
            username: "alredy exists",
          },
        });
      }
      const salt = Math.floor(Math.random() * password.length);
      password = await bcrypt.hash(password, salt);
      const newuser = new User({
        username,
        email,
        BorthDay,
        gender,
        description,
        password,
        salt,
      });
      const res = await newuser.save();
      const token = prepareToken(res);
      return {
        ...res._doc,
        token,
      };
    },
    async login(_, { loginInput: { userInput, password } }) {
      const { valid, errors } = validateLoginInput(userInput, password);
      if (!valid) {
        throw new UserInputError("errors", { errors });
      }
      const inputs = {};
      const regExp = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-.\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{3,9})$/;
      if (regExp.test(userInput)) inputs.email = userInput;
      else inputs.username = userInput;
      const res = await User.findOne(inputs);
      if (!res) {
        errors.userInput = "user not found !";
        throw new UserInputError("Wrong credentials", { errors });
      }
      const passwordValid = await bcrypt.compare(password, res.password);
      if (!passwordValid) {
        errors.password = "password is incorrect !";
        throw new UserInputError("Wrong credentials", { errors });
      }
      const token = prepareToken(res);
      return {
        ...res._doc,
        token,
      };
    },
    uploadImages: async (_, { image }, context) => {
      const { file, status, description = "" } = image;
      if (!file) throw new UserInputError("file most not be empty");
      if (!status) throw new AuthenticationError("status most not be empty");
      const { id, username } = checkAuth(context);
      const user = await User.findById(id, { _id: 1 });
      if (!user) {
        throw new userInput("user not found");
      }
      const upload = await processUpload(file, "users", username);
      const newImage = {
        _id: ObjectId(),
        path: upload.path,
        filename: upload.filename,
        description,
        createdAt: new Date(),
        [status]: true,
      };
      await User.findByIdAndUpdate(user._id, {
        $push: {
          images: newImage,
        },
      });
      await User.findByIdAndUpdate(
        user._id,
        {
          [`images.$[elem].${status}`]: false,
        },
        {
          multi: true,
          arrayFilters: [
            {
              [`elem.${status}`]: true,
              "elem.path": { $ne: upload.path },
            },
          ],
        }
      );
      return newImage;
    },
    deleteImages: async (_, { image_path }, context) => {
      const { id } = checkAuth(context);
      const user = await User.findOne(
        {
          "images.path": image_path.trim(),
        },
        { _id: 1, "images.path": 1, "images._id": 1 }
      );
      if (!user) throw new AuthenticationError("image not found");
      if (user._id != id) throw new AuthenticationError("Action not Allowed");
      deleteFile(image_path);
      await User.findByIdAndUpdate(user._id, {
        $pull: {
          images: { path: image_path },
        },
      });
    },
    createBlog: async (_, { title, body }, context) => {
      const { id } = checkAuth(context);
      const newBlog = {
        _id: ObjectId(),
        title,
        body,
        createdAt: new Date(),
      };
      await User.updateOne(
        {
          _id: ObjectId(id),
        },
        {
          $push: {
            blogs: newBlog,
          },
        }
      );
      return newBlog;
    },
  },
  User: {
    backgroundImage: ({ images }, __, context) => {
      if (images.length === 0) return {};
      const {
        headers: { host },
        protocol,
      } = context.req;
      const backgroundImage = images.find((I) => I.background == true);
      if (!backgroundImage) return {};
      backgroundImage.path = `${protocol}://${host}/${backgroundImage.path}`;
      return backgroundImage;
    },
    profileImage: ({ images }, __, context) => {
      if (images.length === 0) return {};
      const {
        headers: { host },
        protocol,
      } = context.req;
      const profileImage = images.find((I) => I.profile == true);
      if (!profileImage) return {};
      profileImage.path = `${protocol}://${host}/${profileImage.path}`;
      return profileImage;
    },
  },
};
