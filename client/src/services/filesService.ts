import axios from "axios";

const apiUrl = 'http://localhost:3000/api/files';

const upload = (files: File[]) => {
    const formData = new FormData();

    for (const file of files) {
        console.log(file);
        formData.append(`files`, file);
    }

   return axios.post(apiUrl, formData, {withCredentials: true});
}

const deleteFile = (name: string) => {
    const options: RequestInit = {
        method: "DELETE",
        credentials: "include",
    }

    const request = new Request(`${apiUrl}/${name}`, options);

    return fetch(request);
}

const filesService = {
    upload,
    deleteFile
}

export default filesService;
