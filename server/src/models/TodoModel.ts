import {model, Schema, Types} from "mongoose";

export interface Todo {
    name: string,
    description?: string,
    user: Types.ObjectId,
    createdAt: Date,
    plannedTo?: Date,
    isCompleted: boolean
}

const schema = new Schema<Todo>({
    name: {type: Schema.Types.String, required: true, minlength: 1, maxlength: 200, trim: true},
    description: {type: Schema.Types.String, required: false, trim: true},
    createdAt: {type: Schema.Types.Date, required: true, default: Date.now},
    plannedTo: {type: Schema.Types.Date, required: false},
    isCompleted: {type: Schema.Types.Boolean, required: true, default: false},
    user: {type: Schema.Types.ObjectId, required: true, ref: 'User'}
})

export default model<Todo>('Todo', schema);
