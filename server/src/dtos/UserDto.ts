import {Types} from "mongoose";

export interface UserDto {
    id: Types.ObjectId,
    email: string,
    name?: string
}
