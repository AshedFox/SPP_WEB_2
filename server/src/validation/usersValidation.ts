import {NextFunction, Request, Response} from "express";
import {body, param, validationResult} from "express-validator";
import {Types} from "mongoose";

const validate = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).send({errors: errors.array()});
    }

    next();
}

const getUser = [
    param('id').exists({checkNull: true}).custom(input => Types.ObjectId.isValid(input)),
    validate
]

const updateUser = [
    param('id').exists({checkNull: true}).custom(input => Types.ObjectId.isValid(input)),
    body('email').exists({checkNull: true}).isEmail().isLength({min: 4, max: 320}),
    body('name').trim().isString().isLength({min: 1, max: 200}),
    validate
]

const deleteUser = [
    param('id').exists({checkNull: true}).custom(input => Types.ObjectId.isValid(input)),
    validate
]

const usersValidation = {
    getUser,
    updateUser,
    deleteUser
}

export default usersValidation;
