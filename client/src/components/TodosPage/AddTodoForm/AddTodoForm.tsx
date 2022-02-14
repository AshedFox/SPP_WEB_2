import React, {SyntheticEvent, useState} from 'react';
import useTodosStore from "../../../stores/todos/useTodosStore";
import useAccountStore from "../../../stores/account/useAccountStore";
import {TodoToAddDto} from "../../../dtos/TodoToAddDto";
import {TodosStoreStatus} from "../../../stores/todos/TodosStoreStatus";

type FormParams = {
    name: string,
    description: string,
    plannedTo: string
};

const initialFormValue: FormParams = {
    name: '',
    description: '',
    plannedTo: ''
}

const AddTodoForm = () => {
    const [formValue, setFormValue] = useState<FormParams>(initialFormValue);
    const {status, createTodo, createLocalTodo} = useTodosStore();
    const {account} = useAccountStore();

    const handleAddTodo = (e: SyntheticEvent) => {
        e.preventDefault();

        const todoToAdd: TodoToAddDto = formValue;

        if (account) {
            createTodo(todoToAdd).then(() => {
                setFormValue(initialFormValue);
            })
        } else {
            createLocalTodo(todoToAdd);
            setFormValue(initialFormValue);
        }
    }

    return (
        <form onSubmit={(e) => handleAddTodo(e)}>
            <input type={"text"} value={formValue.name} minLength={1} maxLength={200} required
                   onChange={(e) => setFormValue(prev => ({...prev, name: e.target.value}))}
            />
            <input type={"text"} value={formValue.description}
                   onChange={(e) => setFormValue(prev => ({...prev, description: e.target.value}))}
            />
            <input type={"datetime-local"} value={formValue.plannedTo} required
                   onChange={(e) => setFormValue(prev => ({...prev, plannedTo: e.target.value}))}
            />
            <button type={"submit"} disabled={status === TodosStoreStatus.CreateTodoFetching}>Создать</button>
        </form>
    );
};

export default AddTodoForm;
