import React, {ChangeEvent, FC, useEffect, useRef, useState} from 'react';
import {TodoModel} from "../../../models/TodoModel";
import styles from './Todo.module.css';
import {observer} from "mobx-react-lite";
import useAccountStore from "../../../stores/account/useAccountStore";
import useTodosStore from "../../../stores/todos/useTodosStore";
import {TodoToEditDto} from "../../../dtos/TodoToEditDto";
import useFeaturesBar from "../../../stores/featuresBar/useFeaturesBar";

type Props = {
    todo: TodoModel
}

const Todo: FC<Props> = observer(({todo}) => {
    const {isInEditMode} = useFeaturesBar();
    const {updateInCurrentTodo} = useTodosStore();
    const [todoToEdit, setTodoToEdit] = useState<TodoToEditDto>({
        id: todo.id,
        name: todo.name,
        description: todo.description,
        createdAt: todo.createdAt,
        plannedTo: todo.plannedTo
    });

    useEffect(() => {
        replaceTodoValues();
        updateInCurrentTodo(todoToEdit)
    }, [todoToEdit])

    const handleChange = (e: ChangeEvent<HTMLInputElement|HTMLTextAreaElement>) => {
        setTodoToEdit(prev => ({...prev, [e.target.name]: e.target.value}))
    }

    const replaceTodoValues = () => {
        if (!todoToEdit.plannedTo) {
            todoToEdit.plannedTo = undefined;
        }
        if (!todoToEdit.description) {
            todoToEdit.description = undefined;
        }
    }

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <input className={styles.name} name={'name'} type={"text"} value={todoToEdit.name}
                       readOnly={!isInEditMode} onChange={handleChange}
                />
            </div>
            <div className={styles.main}>
                <textarea className={styles.desc} name={'description'} value={todoToEdit.description}
                          readOnly={!isInEditMode} onChange={handleChange}
                />
            </div>
            <div className={styles.footer}>
                <div className={styles.datetime}>
                    <span className={styles.param_name}>Создано:</span>
                    <span>{new Date(todo.createdAt).toLocaleString()}</span>
                </div>
                <div className={styles.datetime}>
                    <span className={styles.param_name}>Запланировано на:</span>
                    {isInEditMode ?
                        <input className={styles.value} name={'plannedTo'} type={"datetime-local"}
                               value={todoToEdit.plannedTo} onChange={handleChange}
                        /> :
                        <span>{todo.plannedTo ? new Date(todo.plannedTo).toLocaleString() : 'не определено'}</span>
                    }
                </div>
            </div>
        </div>
    );
});

export default Todo;
