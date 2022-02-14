import {Types} from "mongoose";

export interface TodoDto {
    id: Types.ObjectId,
    name: string,
    description?: string,
    user: any,
    createdAt: Date,
    plannedTo?: Date
}
