import {Types} from "mongoose";
import {File} from "./File";

export interface Todo {
    name: string,
    description?: string,
    user: Types.ObjectId,
    createdAt: Date,
    plannedTo?: Date,
    isCompleted: boolean,
    files?: Array<File>
}
