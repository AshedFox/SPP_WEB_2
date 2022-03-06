import React, {ChangeEvent, FC, useEffect, useState} from 'react';
import {TodoModel} from "../../../models/TodoModel";
import styles from './Todo.module.css';
import {observer} from "mobx-react-lite";
import useTodosStore from "../../../stores/todos/useTodosStore";
import {TodoToEditDto} from "../../../dtos/TodoToEditDto";
import useFeaturesBar from "../../../stores/featuresBar/useFeaturesBar";
import {FileRejection, useDropzone} from 'react-dropzone';
import File from './File/File';
import filesService from "../../../services/filesService";
import {FileModel} from "../../../models/FileModel";

type Props = {
    todo: TodoModel
}

const Todo: FC<Props> = observer(({todo}) => {
    const {isInEditMode} = useFeaturesBar();
    const {updateInCurrentTodo} = useTodosStore();
    const {getRootProps, getInputProps} = useDropzone({
        maxSize: Math.pow(2, 25),
        multiple: true,
        disabled: !isInEditMode,

        onDrop: async (acceptedFiles: File[]) => {
            if (acceptedFiles.length + (todoToEdit.files !== undefined ? todoToEdit.files.length : 0) <= 10) {
                const res = await filesService.upload(acceptedFiles);

                if (res.status === 200) {
                    const files: FileModel[] = res.data;

                    setTodoToEdit(prev => ({
                        ...prev,
                        files: prev.files !== undefined ? prev.files.concat(files) : files
                    }));
                }
            } else {
                window.alert('К заметке нельзя прикрепить более 10 файлов!');
            }
        }
    });
    const [todoToEdit, setTodoToEdit] = useState<TodoToEditDto>({
        id: todo.id,
        name: todo.name,
        description: todo.description,
        createdAt: todo.createdAt,
        plannedTo: todo.plannedTo,
        isCompleted: todo.isCompleted,
        files: todo.files
    });

    useEffect(() => {
        replaceTodoValues();
        updateInCurrentTodo(todoToEdit)
    }, [todoToEdit]);

    const handleChange = (e: ChangeEvent<HTMLInputElement|HTMLTextAreaElement>) => {
        setTodoToEdit(prev => ({...prev, [e.target.name]: e.target.value}))
    }

    const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
        setTodoToEdit(prev => ({...prev, [e.target.name]: e.target.checked}))
    }

    const handleFileDeletion = async (file: FileModel) => {
        const res = await filesService.deleteFile(file.name);

        if (res.status === 204) {
            setTodoToEdit(prev => ({
                ...prev,
                files: prev.files?.filter(item => item !== file)
            }))
        } else {
            window.alert('Не удалось удалить файл!');
        }
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
        <div className={`${styles.container} ${
            todo.isCompleted ? styles.completed :
                todo.plannedTo && new Date() > new Date(todo.plannedTo) ? styles.failed : ''
        }`}>
            <div className={styles.header}>
                <input className={styles.checkbox} name={'isCompleted'} type={"checkbox"} checked={todoToEdit.isCompleted}
                       disabled={!isInEditMode} onChange={handleCheckboxChange}
                />
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
                <div className={styles.files}>
                    <div {...getRootProps({className: styles.filesInput, style: {display: isInEditMode ? undefined : 'none'}})}>
                        <input {...getInputProps({name: 'files'})}/>
                        <div>+</div>
                    </div>
                    {todoToEdit.files?.map((file) =>
                        <File key={file.name} file={file}
                              handleDeletion={isInEditMode ? () => handleFileDeletion(file) : undefined}
                        />
                    )}
                </div>
                <div className={styles.datetime}>
                    <span className={styles.param_name}>Создано:</span>
                    <span>{new Date(todo.createdAt).toLocaleString()}</span>
                </div>
                <div className={styles.datetime}>
                    <span className={styles.param_name}>Запланировано на:</span>
                    {isInEditMode ?
                        <input className={styles.value} name={'plannedTo'} type={"datetime-local"}
                               value={todoToEdit.plannedTo ? new Date(todoToEdit.plannedTo).toLocaleString() : ""}
                               onChange={handleChange}
                        /> :
                        <span>{todo.plannedTo ? new Date(todo.plannedTo).toLocaleString() : "не определено"}</span>
                    }
                </div>
            </div>
        </div>
    );
});

export default Todo;
