import {Request, Response} from "express";
import todosService from "../services/todosService";
import {TodoToAddDto} from "../dtos/TodoToAddDto";
import {TodoToEditDto} from "../dtos/TodoToEditDto";
import {Types} from "mongoose";

class TodosController {
    getTodos = async (req: Request, res: Response) => {
        try {
            const result = await todosService.getTodos(req.body.user);
            return res.status(200).json(result);
        } catch (e) {
            return res.sendStatus(500);
        }
    }
    getTodo = async (req: Request, res: Response) => {
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
        try {
            const todo: TodoToAddDto = {
                name: req.body.name,
                description: req.body.description,
                plannedTo: req.body.plannedTo,
                user: req.body.user,
            };

            const result = await todosService.createTodo(todo);

            if (result) {
                return res.status(201).json(result);
            } else {
                return res.sendStatus(500);
            }
        } catch (e) {
            return res.sendStatus(500);
        }
    }
    updateTodo = async (req: Request, res: Response) => {
        try {
            const newTodo: TodoToEditDto = {
                id: req.body.id,
                name: req.body.name,
                description: req.body.description,
                plannedTo: req.body.plannedTo,
                createdAt: req.body.createdAt,
                isCompleted: req.body.isCompleted
            };

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
        try {
            const todo = await todosService.getTodo(new Types.ObjectId(req.params.id));

            if (!todo || todo.user.toString() !== req.body.user) {
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
