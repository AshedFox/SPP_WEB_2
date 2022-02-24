import {TodoToAddDto} from "../dtos/TodoToAddDto";
import {TodoToEditDto} from "../dtos/TodoToEditDto";

const apiUrl = 'http://localhost:3000/api/todos';

const getTodos = () => {
    const options: RequestInit = {
        method: "GET",
        credentials: "include"
    }

    const request = new Request(apiUrl, options);

    return fetch(request);
}

const getTodo = (id: string) => {
    const options: RequestInit = {
        method: "GET",
        credentials: "include"
    }

    const request = new Request(`${apiUrl}/${id}`, options);

    return fetch(request);
}

const createTodo = (todoToAddDto: TodoToAddDto) => {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");

    const options: RequestInit = {
        method: "POST",
        headers,
        credentials: "include",
        body: JSON.stringify(todoToAddDto)
    }

    const request = new Request(apiUrl, options);

    return fetch(request);
}

const updateTodo = (id: string, todoToEditDto: TodoToEditDto) => {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");

    const options: RequestInit = {
        method: "PUT",
        headers,
        credentials: "include",
        body: JSON.stringify(todoToEditDto)
    }

    const request = new Request(`${apiUrl}/${id}`, options);

    return fetch(request);
}

const deleteTodo = (id: string) => {
    const options: RequestInit = {
        method: "DELETE",
        credentials: "include",
    }

    const request = new Request(`${apiUrl}/${id}`, options);

    return fetch(request);
}

const todosService = {
    getTodos,
    getTodo,
    createTodo,
    updateTodo,
    deleteTodo
}

export default todosService;
