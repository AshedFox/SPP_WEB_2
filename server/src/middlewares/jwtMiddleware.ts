import {NextFunction, Request, Response} from "express";
import jwt, {JwtPayload, TokenExpiredError} from "jsonwebtoken";
import accountService from "../services/accountService";
import cookieManager from "../helpers/cookieManager";

const authorizeToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const accessToken = cookieManager.getAccessTokenFromCookies(req);

        if (!accessToken) {
            await tryRefreshTokens(req, res, next);
        }
        else {
            req.body.user = (jwt.verify(accessToken, process.env.SECRET as string, {
                audience: process.env.AUDIENCE,
                issuer: process.env.ISSUER
            }) as JwtPayload).sub;

            next();
        }
    } catch (e) {
        if (e instanceof TokenExpiredError) {
            await tryRefreshTokens(req, res, next);
        } else {
            return res.sendStatus(401);
        }
    }
}

const tryRefreshTokens = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const refreshToken = cookieManager.getRefreshTokenFromCookies(req);

        if (refreshToken) {
            const newTokens = await accountService.refresh(refreshToken)

            if (newTokens) {
                cookieManager.createTokensCookies(res, newTokens.accessToken, newTokens.refreshToken)
                return next();
            }
        }

        return res.sendStatus(401);
    } catch (e) {
        return res.sendStatus(401);
    }
}

const jwtMiddleware = {
    authorizeToken
}
export default jwtMiddleware;
