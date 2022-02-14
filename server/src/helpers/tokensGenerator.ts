import jwt from 'jsonwebtoken';
import {v4 as uuidv4} from "uuid";

const generateAccessToken = (userId: string) =>
    jwt.sign({sub: userId}, process.env.SECRET as string, {
        audience: process.env.AUDIENCE,
        issuer: process.env.ISSUER,
        expiresIn: process.env.ACCESS_TOKEN_LIFETIME
    });

const generateRefreshToken = () => uuidv4();

const tokensGenerator = {
    generateAccessToken,
    generateRefreshToken
}
export default tokensGenerator;
