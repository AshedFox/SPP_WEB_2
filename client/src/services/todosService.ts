import {TodoToAddDto} from "../dtos/TodoToAddDto";

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

const createTodo =  (todoToAddDto: TodoToAddDto) => {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");

    const options: RequestInit = {
        method: "POST",
        headers,
        body: JSON.stringify(todoToAddDto)
    }

    const request = new Request(apiUrl, options);

    return fetch(request);
}

const todosService = {
    getTodos,
    getTodo,
    createTodo,
}

export default todosService;
