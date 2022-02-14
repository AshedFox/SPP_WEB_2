import React, {useEffect} from 'react';
import {observer} from "mobx-react-lite";
import styles from "./TodosPage.module.css"
import {TodosStoreStatus} from "../../stores/todos/TodosStoreStatus";
import useTodosStore from "../../stores/todos/useTodosStore";
import {MoonLoader} from "react-spinners";
import TodoMini from "./TodoMini/TodoMini";
import Page from "../Page/Page";
import useAccountStore from "../../stores/account/useAccountStore";


const TodosPage = observer(() => {
    const {status, todos, getTodos, getLocalTodos, resetTodos} = useTodosStore();
    const {account} = useAccountStore();

    useEffect(() => {
        if (account) {
            getTodos().then()
        } else {
            getLocalTodos();
        }

        return () => {
            resetTodos();
        }
    }, [account])


    const renderContent = () => {
        switch (status) {
            case TodosStoreStatus.GetTodosFetching: {
                return (
                    <div className={styles.overlay}>
                        <MoonLoader size={60}/>
                    </div>
                )
            }
            case TodosStoreStatus.GetTodosError: {
                return <div className={styles.message}>Возникла ошибка при загрузке данных статей!</div>
            }
            case TodosStoreStatus.GetTodosSuccess: {
                return (
                    <>
                        {renderTodosList()}
                    </>
                )
            }
        }
    }

    const renderTodosList = () => {
        if (todos) {
            if (todos.length === 0) {
                return <div className={styles.message}>Упс! Не найдено ни одной статьи!</div>
            } else {
                return (
                    <div className={styles.todos_list}>
                        {todos.map((todo) => <TodoMini key={todo.id} todo={todo}/>)}
                    </div>
                );
            }
        }

        return <></>
    }

    return (
        <Page>
            <div className={styles.container}>
                <div className={styles.content_container}>
                    {renderContent()}
                </div>
            </div>
        </Page>
    );
});

export default TodosPage;
