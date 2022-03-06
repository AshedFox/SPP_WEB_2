import {Request, Router} from 'express';
import multer from 'multer';
import jwtMiddleware from "../middlewares/jwtMiddleware";
import filesController from "../controllers/filesController";
import {v4 as uuidv4} from 'uuid'
import filesValidation from "../validation/filesValidation";

type DestinationCallback = (error: Error | null, destination: string) => void;
type FilenameCallback = (error: Error | null, filename: string) => void;

const diskStorage = multer.diskStorage({
    destination: (req: Request, file: Express.Multer.File, callback: DestinationCallback) => {
        callback(null, "/uploads");
    },
    filename(req: Request, file: Express.Multer.File, callback: FilenameCallback) {
        callback(null, uuidv4());
    }
})

const upload = multer({storage: diskStorage});

const router = Router();

/* GET api/files/:name */
router.get("/:name", filesValidation.getFile, filesController.getFile)

/* POST api/files/ */
router.post('/', upload.array('files', 10), filesController.upload);

/* DELETE api/files/ */
router.delete('/:name', filesValidation.deleteFile, filesController.deleteFile)

export default router;
