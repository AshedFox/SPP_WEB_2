import {Request, Response} from "express";
import usersService from "../services/usersService";
import {SignUpDto} from "../dtos/SignUpDto";
import {LoginDto} from "../dtos/LoginDto";
import tokensGenerator from "../helpers/tokensGenerator";
import accountService from "../services/accountService";
import cookieManager from "../helpers/cookieManager";

class AccountController {
    signUp = async (req: Request, res: Response) => {
        try {
            const user = await usersService.getUserByEmail(req.body.email);
            if (user) {
                return res.sendStatus(409);
            }

            await accountService.signUpUser(req.body as SignUpDto);

            return res.sendStatus(201);
        } catch (e) {
            return res.sendStatus(500);
        }
    }
    login = async (req: Request, res: Response) => {
        try {
            const user = await usersService.getUserByEmail(req.body.email);
            if (!user) {
                return res.sendStatus(404);
            }

            const loginDto: LoginDto = {
                email: req.body.email,
                passwordHash: req.body.passwordHash
            }

            const result = await accountService.loginUser(loginDto);

            if (result) {
                const accessToken = tokensGenerator.generateAccessToken(result.id.toString());
                const refreshToken = tokensGenerator.generateRefreshToken();

                cookieManager.createTokensCookies(res, accessToken, refreshToken);

                return res.status(200).json(result);
            }
            else {
                return res.sendStatus(401);
            }
        } catch (e) {
            return res.sendStatus(500);
        }
    }
    refresh = async (req: Request, res: Response) => {
        try {

        } catch (e) {
            return res.sendStatus(500);
        }
    }
    logout = async (req: Request, res: Response) => {
        try {
            cookieManager.removeTokensCookies(res);

            return res.sendStatus(204);
        } catch (e) {
            return res.sendStatus(500);
        }
    }
}

export default new AccountController();
