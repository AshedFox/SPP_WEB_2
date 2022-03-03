import {model, Schema} from "mongoose";
import {ObjectId} from "mongodb";
import {Todo} from "../interfaces/Todo";

const schema = new Schema<Todo>({
    name: {type: String, required: true, minlength: 1, maxlength: 200, trim: true},
    description: {type: String, required: false, trim: true},
    createdAt: {type: Date, required: true, default: Date.now},
    plannedTo: {type: Date, required: false},
    isCompleted: {type: Boolean, required: true, default: false},
    user: {type: ObjectId, required: true, ref: 'User'},
    files: [{name: String, url: String, size: Number, mimetype: String, required: false}]
})

export default model<Todo>('Todo', schema);
