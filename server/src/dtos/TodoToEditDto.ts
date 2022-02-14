import {Types} from "mongoose";

export interface TodoToEditDto {
    id: Types.ObjectId,
    name: string,
    description?: string,
    createdAt: Date,
    plannedTo?: Date
}