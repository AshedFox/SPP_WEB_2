import {HydratedDocument, Types} from "mongoose";
import {TodoDto} from "../dtos/TodoDto";
import {UserDto} from "../dtos/UserDto";
import {Todo} from "../interfaces/Todo";
import {User} from "../interfaces/User";
import {FileDto} from "../dtos/FileDto";

class Mapper {
    toTodoDto = (todo: HydratedDocument<Todo>): TodoDto => ({
        id: todo._id.toString(),
        name: todo.name,
        description: todo.description,
        user: todo.user,
        plannedTo: todo.plannedTo,
        createdAt: todo.createdAt,
        isCompleted: todo.isCompleted,
        files: todo.files
    })

    toUserDto = (user: HydratedDocument<User>): UserDto => ({
        id: user._id.toString(),
        name: user.name,
        email: user.email
    })

    toFileDto = (file: Express.Multer.File): FileDto => ({
        name: file.filename,
        size: file.size,
        mimetype: file.mimetype,
        url: `http://localhost:3000/api/files/${file.filename}`
    });
}

export default new Mapper();
