import {model, Schema, Types} from "mongoose";
import {v4 as uuidv4} from "uuid";
import UserModel from "./UserModel";

export interface RefreshToken {
    value: string,
    user: Types.ObjectId
}

const scheme = new Schema<RefreshToken>({
    value: {type: Schema.Types.String, required: true, default: uuidv4(), unique: true },
    user: {type: Schema.Types.ObjectId, required: true, ref: UserModel}

})

export default model<RefreshToken>('RefreshToken', scheme);
