import {TodoToAddDto} from "../dtos/TodoToAddDto";
import {TodoToEditDto} from "../dtos/TodoToEditDto";
import {TodoDto} from "../dtos/TodoDto";
import TodoModel from "../models/TodoModel";
import {Types} from "mongoose";
import mapper from "../helpers/mapper";

class TodosService {

    getTodos = async (): Promise<TodoDto[]> => {
        try {
            const todos = await TodoModel.find().sort({plannedTo: -1}).exec();

            return todos.map((item) => mapper.toTodoDto(item));
        } catch (e) {
            throw e;
        }
    }

    getTodo = async (id: Types.ObjectId): Promise<TodoDto | null> => {
        try {
            const todo = await TodoModel.findById(id).exec();

            return todo ? mapper.toTodoDto(todo) : null;
        } catch (e) {
            throw e;
        }
    }

    createTodo = async (todoToAddDto: TodoToAddDto): Promise<TodoDto | null> => {
        try {
            const todo = new TodoModel(todoToAddDto);
            await todo.save();

            return mapper.toTodoDto(todo);
        } catch (e) {
            throw e;
        }
    }

    updateTodo = async (todoToEditDto: TodoToEditDto) => {
        try {
            await TodoModel.findByIdAndUpdate(todoToEditDto.id, todoToEditDto).exec();
        } catch (e) {
            throw e;
        }
    }

    deleteTodo = async (id: Types.ObjectId) => {
        try {
            await TodoModel.findByIdAndDelete(id).exec();
        } catch (e) {
            throw e;
        }
    }
}

export default new TodosService();
