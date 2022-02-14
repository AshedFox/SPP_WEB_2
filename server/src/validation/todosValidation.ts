import {body, param, validationResult} from "express-validator";
import {Types} from "mongoose";
import {NextFunction, Request, Response} from "express";

const validate = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).send({errors: errors.array()});
    }

    next();
}

const getTodo = [
    param('id').exists({checkNull: true}).custom(input => Types.ObjectId.isValid(input)),
    validate
];

const createTodo = [
    body('name', 'name must be string with length between 3 and 200').exists({checkNull: true})
        .isString().trim().isLength({min: 1, max: 200}),
    body('description', 'description must be string with length between 0 and 2000').isString(),
    body('userId').custom(input => Types.ObjectId.isValid(input)),
    body('createdAt', 'createdAt must be correct date').exists({checkNull: true}).isDate(),
    body('plannedTo', 'plannedTo must be correct date').isDate(),
    validate
]

const updateTodo = [
    param('id').custom(input => Types.ObjectId.isValid(input)),
    body('id').custom(input => Types.ObjectId.isValid(input)),
    body('name', 'name must be string with length between 3 and 200').exists({checkNull: true})
        .isString().trim().isLength({min: 1, max: 200}),
    body('description', 'description must be string with length between 0 and 2000').isString(),
    body('createdAt', 'createdAt must be correct date').exists({checkNull: true}).isDate(),
    body('plannedTo', 'plannedTo must be correct date').isDate(),
    validate
]

const deleteTodo = [
    param('id').custom(input => Types.ObjectId.isValid(input)),
    validate
]

const todosValidation = {
    getTodo,
    createTodo,
    updateTodo,
    deleteTodo
};

export default todosValidation;
