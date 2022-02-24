import React, {useEffect} from 'react';
import Page from "../Page/Page";
import styles from "./TodoPage.module.css";
import Todo from "./Todo/Todo";
import {observer} from "mobx-react-lite";
import useTodosStore from "../../stores/todos/useTodosStore";
import useAccountStore from "../../stores/account/useAccountStore";
import {useMatch} from "react-router-dom";
import routes from "../../constants/routes";
import {TodosStoreStatus} from "../../stores/todos/TodosStoreStatus";
import {MoonLoader} from "react-spinners";
import FeaturesBar from "./FeaturesBar/FeaturesBar";


const TodoPage = observer(() => {
    const {currentTodo, getTodo, getLocalTodo, resetCurrentTodo, status} = useTodosStore();
    const {account} = useAccountStore();
    const match = useMatch(routes.todo.path);

    useEffect(() => {
        const id = match?.params.id;

        if (id) {
            if (account) {
                getTodo(id).then()
            } else {
                getLocalTodo(id);
            }
        }

        return () => {
            resetCurrentTodo();
        }
    }, [match?.params.id, account])

    const renderTodo = () => {
        switch (status) {
            case TodosStoreStatus.GetTodoFetching: {
                return (
                    <div className={styles.overlay}>
                        <MoonLoader size={60}/>
                    </div>
                )
            }
            case TodosStoreStatus.GetTodoError: {
                return <div className={styles.message}>Возникла ошибка при загрузке заметки!</div>
            }
            case TodosStoreStatus.GetTodoSuccess:
            default: {
                if (currentTodo) {
                    return <Todo todo={currentTodo}/>
                } else {
                    return <></>
                }
            }
        }
    }

    return (
        <Page>
            <div className={styles.container}>
                <div className={styles.content_container}>
                    {renderTodo()}
                    <FeaturesBar/>
                </div>
            </div>
        </Page>
    );
});

export default TodoPage;
