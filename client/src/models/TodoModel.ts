import {FileModel} from "./FileModel";

export interface TodoModel {
    id: string,
    name: string,
    description?: string,
    createdAt: string,
    plannedTo?: string,
    isCompleted: boolean,
    files?: FileModel[]
}
