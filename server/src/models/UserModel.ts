import {model, Schema} from 'mongoose';

export interface User {
    email: string,
    passwordHash: string,
    name?: string
}

const schema = new Schema<User>({
    email: {type: Schema.Types.String, required: true, unique: true, minlength: 4, maxlength: 320, trim: true},
    passwordHash: {type: Schema.Types.String, required: true},
    name: {type: Schema.Types.String, required: false, minlength: 1, maxlength: 200}
});

export default model<User>('User', schema);
