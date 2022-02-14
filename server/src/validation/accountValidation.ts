import {NextFunction, Request, Response} from "express";
import {body, cookie, validationResult} from "express-validator";

const validate = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).send({errors: errors.array()});
    }

    next();
}

const signUp = [
    body('email').exists({checkNull: true}).isEmail().isLength({min: 4, max: 320}),
    body('passwordHash').exists({checkNull: true}).isHash("sha512"),
    body('name').trim().isString().isLength({min: 1, max: 200}),
    validate
]

const login = [
    body('email').exists({checkNull: true}).isEmail().isLength({min: 4, max: 320}),
    body('passwordHash').exists({checkNull: true}).isHash("sha512"),
    validate
]

const accountValidation = {
    signUp,
    login
}

export default accountValidation;
