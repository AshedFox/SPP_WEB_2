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
    param('id').exists({checkNull: true}).withMessage('id must exists')
        .isMongoId().withMessage('id must be correct mongodb id'),
    validate
];

const createTodo = [
    body('name')
        .exists({checkNull: true}).withMessage('name must exists')
        .isString().withMessage('name must be string')
        .trim().isLength({min: 1, max: 200}).withMessage('name must have length between 1 and 200'),
    body('description').optional({checkFalsy: true})
        .isString().withMessage('description must be string')
        .trim().isLength({max: 2000}).withMessage('description must have length between 0 and 2000'),
    body('plannedTo').optional({checkFalsy: true})
        .isISO8601().withMessage('plannedTo must be correct ISO8601 date')
        .toDate(),
    validate
]

const updateTodo = [
    param('id').exists({checkNull: true}).withMessage('id must exists')
        .isMongoId().withMessage('id must be correct mongodb id'),
    body('id').exists({checkNull: true}).withMessage('id must exists')
        .isMongoId().withMessage('id must be correct mongodb id'),
    body('name')
        .exists({checkNull: true}).withMessage('name must exists')
        .isString().withMessage('name must be string')
        .trim().isLength({min: 1, max: 200}).withMessage('name must have length between 1 and 200'),
    body('description').optional({checkFalsy: true})
        .isString().withMessage('description must be string')
        .trim().isLength({max: 2000}).withMessage('description must have length between 0 and 2000'),
    body('createdAt').optional({checkFalsy: true})
        .isISO8601().withMessage('createdAt must be correct ISO8601 date')
        .toDate(),
    body('plannedTo').optional({checkFalsy: true})
        .isISO8601().withMessage('plannedTo must be correct ISO8601 date')
        .toDate(),
    body('isCompleted').isBoolean().withMessage('isCompleted must be boolean'),
    body('files').optional()
        .isArray().withMessage('files must be array'),
    validate
]

const deleteTodo = [
    param('id').exists({checkNull: true}).withMessage('id must exists')
        .isMongoId().withMessage('id must be correct mongodb id'),
    validate
]

const todosValidation = {
    getTodo,
    createTodo,
    updateTodo,
    deleteTodo
};

export default todosValidation;
