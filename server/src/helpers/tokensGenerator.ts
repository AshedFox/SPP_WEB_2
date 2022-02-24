import jwt from 'jsonwebtoken';
import {v4 as uuidv4} from "uuid";
import RefreshTokenModel from "../models/RefreshTokenModel";
import {ObjectId} from "mongodb";

const createAccessToken = (userId: string) =>
    jwt.sign({sub: userId}, process.env.SECRET as string, {
        audience: process.env.AUDIENCE,
        issuer: process.env.ISSUER,
        expiresIn: process.env.ACCESS_TOKEN_LIFETIME
    });

const createRefreshToken = async (userId: string) => {
    const token = uuidv4();

    const refreshToken = new RefreshTokenModel({
        value: token,
        user: new ObjectId(userId)
    })
    await refreshToken.save();

    return refreshToken;
}

const tokensGenerator = {
    createAccessToken,
    createRefreshToken
}
export default tokensGenerator;
