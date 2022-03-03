import {FileToEditDto} from "./FileToEditDto";

export interface TodoToEditDto {
    id: string,
    name: string,
    description?: string,
    createdAt: string,
    plannedTo?: string,
    isCompleted: boolean,
    files?: FileToEditDto[]
}
