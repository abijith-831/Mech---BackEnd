import jwt from "jsonwebtoken";
import { IUser } from "../models/user/userModel";


export const generateAcessToken = async (user: IUser) => {

  const secret = process.env.JWT_ACCESSTOKEN;

  if (!secret) {
    throw new Error("access token not working");
  }

  const payload = { ...user };

  const res = await jwt.sign(payload, secret, { expiresIn: "24h" })

  return res;

};

export const generateRefreshToken = (user:IUser) => {
  const secret = process.env.JWT_REFRESHTOKEN;

  if (!secret) {
    throw new Error("refresh token not working");
  }

  const payload = { ...user };

  return jwt.sign(payload, secret, { expiresIn: "7d" });
};