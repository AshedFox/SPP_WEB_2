import {Request, Response} from "express";

const createTokensCookies = (res: Response, accessToken: string, refreshToken: string) => {
    const accessLifetime = process.env.ACCESS_TOKEN_LIFETIME as string;
    const refreshLifetime = process.env.REFRESH_TOKEN_LIFETIME as string;

    res.cookie('X-ACCESS-TOKEN', accessToken, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: Number.parseInt(accessLifetime.substring(0, accessLifetime.length - 1)) * 1000 * 60
    })
    res.cookie('X-REFRESH-TOKEN', refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: Number.parseInt(refreshLifetime.substring(0, refreshLifetime.length - 1)) * 1000 * 60 * 60 * 24
    })
}

const removeTokensCookies = (res: Response) => {
    res.clearCookie('X-ACCESS-TOKEN');
    res.clearCookie('X-REFRESH-TOKEN');
}

const getAccessTokenFromCookies = (req: Request) => {
    return req.cookies['X-ACCESS-TOKEN'];
}

const getRefreshTokenFromCookies = (req: Request) => {
    return req.cookies['X-REFRESH-TOKEN'];
}

export default {
    createTokensCookies,
    removeTokensCookies,
    getAccessTokenFromCookies,
    getRefreshTokenFromCookies
}
