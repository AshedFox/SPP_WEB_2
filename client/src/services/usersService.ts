import {TodoToEditDto} from "../dtos/TodoToEditDto";
import {UserToEditDto} from "../dtos/UserToEditDto";
import {UserToAddDto} from "../dtos/UserToAddDto";

const apiUrl = "http://localhost:3000/api/users";

const getUsers = () => {
    const options: RequestInit = {
        method: "GET",
        credentials: "include"
    }

    const request = new Request(apiUrl, options);

    return fetch(request);
}

const getUser = (id: string) => {
    const options: RequestInit = {
        method: "GET",
        credentials: "include"
    }

    const request = new Request(`${apiUrl}/${id}`, options);

    return fetch(request);
}

const updateUser = (id: string, userToEditDto: UserToEditDto) => {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");

    const options: RequestInit = {
        method: "PUT",
        headers,
        credentials: "include",
        body: JSON.stringify(userToEditDto)
    }

    const request = new Request(`${apiUrl}/${id}`, options);

    return fetch(request);
}

const deleteUser = (id: string) => {
    const options: RequestInit = {
        method: "DELETE",
        credentials: "include",
    }

    const request = new Request(`${apiUrl}/${id}`, options);

    return fetch(request);
}

const usersService = {
    getUsers,
    getUser,
    updateUser,
    deleteUser
}

export default usersService;
