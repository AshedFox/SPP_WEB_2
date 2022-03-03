import {NextFunction, Request, Response} from "express";
import {param, validationResult} from "express-validator";

const validate = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).send({errors: errors.array()});
    }

    next();
}

const getFile = [
    param('name').exists({checkNull: true}).withMessage('name must exists')
        .isUUID("4").withMessage('name must be correct uuidv4'),
    validate
];

const deleteFile = [
    param('name').exists({checkNull: true}).withMessage('name must exists')
        .isUUID("4").withMessage('name must be correct uuidv4'),
    validate
]

const filesValidation = {
    getFile,
    deleteFile
};

export default filesValidation;
