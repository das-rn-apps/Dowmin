import jwt from "jsonwebtoken";
import { ObjectId } from "mongoose";

const generateToken = (id: ObjectId) => {
  return jwt.sign({ id }, process.env.JWT_SECRET!, {
    expiresIn: "30d",
  });
};

export default generateToken;
