import {Types} from "mongoose";

export interface TodoToAddDto {
    name: string,
    description?: string,
    userId?: Types.ObjectId,
    createdAt: Date,
    plannedTo?: Date
}
