import {Request, Response} from "express";
import {validationResult} from "express-validator";
import todosService from "../services/todosService";
import {TodoToAddDto} from "../dtos/TodoToAddDto";
import {TodoToEditDto} from "../dtos/TodoToEditDto";
import {Types} from "mongoose";

class TodosController {
    getTodos = async (req: Request, res: Response) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).send({errors: errors.array()});
        }

        try {
            const result = await todosService.getTodos();
            return res.status(200).json(result);
        } catch (e) {
            return res.sendStatus(500);
        }
    }
    getTodo = async (req: Request, res: Response) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).send({errors: errors.array()});
        }

        try {
            const result = await todosService.getTodo(new Types.ObjectId(req.params.id));

            if (!result) {
                return res.sendStatus(400);
            }

            return res.status(200).json(result);
        } catch (e) {
            return res.sendStatus(500);
        }
    }
    createTodo = async (req: Request, res: Response) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).send({errors: errors.array()});
        }

        try {
            const todo: TodoToAddDto = req.body as TodoToAddDto;

            const result = await todosService.createTodo(todo);

            if (result) {
                return res.send(201).json(result);
            } else {
                return res.sendStatus(500);
            }
        } catch (e) {
            return res.sendStatus(500);
        }
    }
    updateTodo = async (req: Request, res: Response) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).send({errors: errors.array()});
        }

        if (req.params.id !== req.body.id) {
            return res.status(400).send({errors: {id: 'params and body id must be equal'}});
        }

        try {
            const newTodo = req.body as TodoToEditDto;

            const result = await todosService.getTodo(new Types.ObjectId(req.params.id));

            if (!result) {
                return res.sendStatus(404);
            }

            await todosService.updateTodo(newTodo);

            return res.sendStatus(204);
        } catch (e) {
            return res.sendStatus(500);
        }
    }
    deleteTodo = async (req: Request, res: Response) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).send({errors: errors.array()});
        }

        try {
            const todo = await todosService.getTodo(new Types.ObjectId(req.params.id));

            if (!todo) {
                return res.sendStatus(404);
            }

            await todosService.deleteTodo(new Types.ObjectId(req.params.id));

            return res.sendStatus(204);
        } catch (e) {
            return res.sendStatus(500);
        }
    }
}

export default new TodosController();
