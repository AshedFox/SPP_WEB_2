import {Types} from "mongoose";

export interface TodoToAddDto {
    name: string,
    description?: string,
    user: Types.ObjectId,
    plannedTo?: Date
}
