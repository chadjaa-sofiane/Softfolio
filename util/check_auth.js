import { AuthenticationError } from "apollo-server-express";
import jwt from "jsonwebtoken";
require("dotenv").config();

export default (context) => {
  const authHeader = context.req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split("bearer ")[1];
    if (token) {
      try {
        const user = jwt.verify(token, process.env.SERCRET_TOKEN_KEY);
        return user;
      } catch (err) {
        throw new AuthenticationError("invalid/Expired token");
      }
    }
    throw new Error("Authentication most be 'bearer [token]");
  }
  throw new Error("Authorization header most be provider ");
};
