import {SignUpDto} from "../dtos/SignUpDto";
import {LoginDto} from "../dtos/LoginDto";

const apiUrl = 'http://localhost:3000/api/account';

const signUp = (signUpDto: SignUpDto) => {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");

    const options: RequestInit = {
        method: "POST",
        headers,
        body: JSON.stringify(signUpDto)
    }
    const request = new Request(`${apiUrl}/signUp`, options);

    return fetch(request);
}

const login = (loginDto: LoginDto) => {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");

    const options: RequestInit = {
        method: "POST",
        credentials: 'include',
        headers,
        body: JSON.stringify(loginDto)
    }
    const request = new Request(`${apiUrl}/login`, options);

    return fetch(request);
}

const logout = () => {
    const options: RequestInit = {
        method: "POST",
        credentials: "include"
    }
    const request = new Request(`${apiUrl}/logout`, options);

    return fetch(request);
}

const accountService = {
    signUp,
    login,
    logout
}

export default accountService;
