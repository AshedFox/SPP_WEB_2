import React, {ChangeEvent, SyntheticEvent, useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import useAccountStore from "../../stores/account/useAccountStore";
import useTodosStore from "../../stores/todos/useTodosStore";
import {TodoToAddDto} from "../../dtos/TodoToAddDto";
import Page from "../Page/Page";
import {useNavigate} from "react-router-dom";
import routes from "../../constants/routes";
import styles from './CreateTodoPage.module.css';
import {TodosStoreStatus} from "../../stores/todos/TodosStoreStatus";

const initialFormData: FormParams = {
    name: "",
    description: "",
    plannedTo: ""
}

type FormParams = {
    name: string,
    description?: string,
    plannedTo?: string
}

const CreateTodoPage = observer(() => {
    const {account} = useAccountStore();
    const {createLocalTodo, createTodo, status} = useTodosStore();
    const [formData, setFormData] = useState<FormParams>(initialFormData)
    const navigate = useNavigate();

    const handleChange = (e: ChangeEvent<HTMLInputElement|HTMLTextAreaElement>) => {
        setFormData(prev => ({...prev, [e.target.name]: e.target.value}));
    }

    const handleTodoCreation = (e: SyntheticEvent) => {
        e.preventDefault();

        if (!formData.plannedTo || formData.plannedTo > new Date().toISOString()) {
            replaceTodoValues();
            const todoToAdd: TodoToAddDto = formData;

            if (account) {
                createTodo(todoToAdd).then((res) => {
                    if (res) {
                        resetForm();
                        navigate(`${routes.todo.pathnameBase}/${res.id}`);
                    }
                });
            } else {
                const res = createLocalTodo(todoToAdd)
                if (res) {
                    resetForm();
                    navigate(`${routes.todo.pathnameBase}/${res.id}`);
                }
            }
        } else {
            window.alert('Планируемая дата завершения должна быть позже текущего момента.')
        }
    }

    const replaceTodoValues = () => {
        if (!formData.plannedTo) {
            formData.plannedTo = undefined;
        }
        if (!formData.description) {
            formData.description = undefined;
        }
    }

    const resetForm = () => setFormData(initialFormData);

    return (
        <Page>
            <div className={styles.container}>
                <div className={styles.content_container}>
                    <div className={styles.content}>
                        <div className={styles.title}>Создание заметки</div>
                        <form className={styles.form} onSubmit={handleTodoCreation}>
                            <div className={styles.fields}>
                                <label className={styles.label}>Название:
                                    <input className={styles.input} name={'name'} type="text" value={formData.name} required
                                           minLength={1} maxLength={200}
                                           onChange={handleChange}
                                    />
                                </label>
                                <label className={styles.label}>Описание:
                                    <textarea className={styles.textarea} name={'description'} value={formData.description}
                                           onChange={handleChange}
                                    />
                                </label>
                                <label className={styles.label}>Планируемая дата:
                                    <input className={styles.input} name={'plannedTo'} type="datetime-local" value={formData.plannedTo}
                                           min={new Date().toISOString()}
                                           onChange={handleChange}
                                    />
                                </label>
                            </div>
                            <button className={styles.button} type={"submit"}>Создать</button>
                            {status === TodosStoreStatus.CreateTodoError &&
                                <small className={`${styles.message} ${styles.error}`}>Возникла ошибка при создании заметки</small>
                            }
                        </form>
                    </div>
                </div>
            </div>
        </Page>
    );
});

export default CreateTodoPage;
