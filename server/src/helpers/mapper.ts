import {User} from "../models/UserModel";
import {HydratedDocument, Types} from "mongoose";
import {TodoDto} from "../dtos/TodoDto";
import {Todo} from "../models/TodoModel";
import {UserDto} from "../dtos/UserDto";

class Mapper {
    toTodoDto = (todo: HydratedDocument<Todo>): TodoDto => ({
        id: todo._id.toString(),
        name: todo.name,
        description: todo.description,
        user: todo.user,
        plannedTo: todo.plannedTo,
        createdAt: todo.createdAt,
        isCompleted: todo.isCompleted
    })

    toUserDto = (user: HydratedDocument<User>): UserDto => ({
        id: user._id.toString(),
        name: user.name,
        email: user.email
    })
}

export default new Mapper();
