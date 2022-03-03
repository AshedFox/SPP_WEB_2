import {model, Schema} from 'mongoose';
import {User} from "../interfaces/User";

const schema = new Schema<User>({
    email: {type: String, required: true, unique: true, minlength: 4, maxlength: 320, trim: true},
    passwordHash: {type: String, required: true},
    name: {type: String, required: false, minlength: 1, maxlength: 200}
});

export default model<User>('User', schema);
