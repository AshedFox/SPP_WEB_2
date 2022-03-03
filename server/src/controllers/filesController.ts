import {Request, Response} from "express";
import mapper from "../helpers/mapper";
import * as path from "path";
import * as fs from "fs";
import filesService from "../services/filesService";

class FilesController {
    getFile = async (req: Request, res: Response) => {
        try {
            if (filesService.exists(req.params.name)) {
                return res.sendFile(`/uploads/${req.params.name}`);
            } else {
                return res.sendStatus(400);
            }
        } catch (e) {
            return res.sendStatus(500);
        }
    }
    upload = async (req: Request, res: Response) => {
        try {
            if (req.files) {
                const files = (req.files as Express.Multer.File[]).map((file) => mapper.toFileDto(file));

                return res.status(200).json(files);
            } else {
                return res.sendStatus(400);
            }
        } catch (e) {
            return res.sendStatus(500)
        }
    }

    deleteFile = async (req: Request, res: Response) => {
        try {
            if (filesService.deleteFile(req.params.name)) {
                return res.sendStatus(204);
            } else {
                return res.sendStatus(404);
            }
        } catch (e) {
            return res.sendStatus(500);
        }
    }
}

export default new FilesController();
