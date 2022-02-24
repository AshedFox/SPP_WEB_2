import React, {SyntheticEvent, useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import useAccountStore from "../../stores/account/useAccountStore";
import useTodosStore from "../../stores/todos/useTodosStore";
import {TodoToAddDto} from "../../dtos/TodoToAddDto";
import Page from "../Page/Page";
import {useNavigate} from "react-router-dom";
import routes from "../../constants/routes";
import styles from './CreateTodoPage.module.css';

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

    useEffect(() => {

    }, [status])

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
                <form onSubmit={(e) => handleTodoCreation(e)}>
                    <input name={'name'} type="text" value={formData.name} required
                           minLength={1} maxLength={200}
                           onChange={e => setFormData(prev => ({...prev, name: e.target.value}))}
                    />
                    <input name={'description'} type="text" value={formData.description}
                           onChange={e => setFormData(prev => ({...prev, description: e.target.value}))}
                    />
                    <input name={'plannedTo'} type="datetime-local" value={formData.plannedTo}
                           min={new Date().toISOString()}
                           onChange={e => setFormData(prev => ({...prev, plannedTo: e.target.value}))}
                    />
                    <button type={"submit"}>Создать</button>
                    <small>...</small>
                </form>
                </div>
            </div>
        </Page>
    );
});

export default CreateTodoPage;
