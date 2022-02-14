import {Request, Response} from "express";
import usersService from "../services/usersService";
import {Types} from "mongoose";
import {UserToEditDto} from "../dtos/UserToEditDto";

class UsersController {
    getUsers = async (req: Request, res: Response) => {
        try {
            return res.status(200).json(await usersService.getUsers());
        } catch (e) {
            return res.sendStatus(500);
        }
    }
    getUser = async (req: Request, res: Response) => {
        try {
            const user = await usersService.getUser(new Types.ObjectId(req.params.id));

            if (!user) {
                return res.sendStatus(404);
            }
            else {
                return res.status(200).json(user);
            }
        } catch (e) {
            return res.sendStatus(500);
        }
    }
    updateUser = async (req: Request, res: Response) => {
        try {
            await usersService.updateUser(req.body as UserToEditDto)

            return res.sendStatus(201);
        } catch (e) {
            return res.sendStatus(500);
        }
    }
    deleteUser = async (req: Request, res: Response) => {
        try {
            await usersService.deleteUser(new Types.ObjectId(req.body.id));

            return res.sendStatus(201);
        } catch (e) {
            return res.sendStatus(500);
        }
    }
}

export default new UsersController();
