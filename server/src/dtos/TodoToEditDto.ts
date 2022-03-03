import {FileDto} from "./FileDto";

export interface TodoToEditDto {
    id: string,
    name: string,
    description?: string,
    createdAt: string,
    plannedTo?: string,
    isCompleted: boolean,
    files?: FileDto[]
}
