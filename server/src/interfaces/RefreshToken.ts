import {Types} from "mongoose";

export interface RefreshToken {
    value: string,
    user: Types.ObjectId
}
