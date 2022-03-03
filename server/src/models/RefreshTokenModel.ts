import {model, Schema, Types} from "mongoose";
import {v4 as uuidv4} from "uuid";
import UserModel from "./UserModel";
import {ObjectId} from "mongodb";
import {RefreshToken} from "../interfaces/RefreshToken";



const scheme = new Schema<RefreshToken>({
    value: {type: String, required: true, default: uuidv4(), unique: true },
    user: {type: ObjectId, required: true, ref: UserModel}

})

export default model<RefreshToken>('RefreshToken', scheme);
