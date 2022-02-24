import React, {ChangeEvent, useCallback, useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import styles from "./TodosPage.module.css"
import {TodosStoreStatus} from "../../stores/todos/TodosStoreStatus";
import useTodosStore from "../../stores/todos/useTodosStore";
import {MoonLoader} from "react-spinners";
import TodoMini from "./TodoMini/TodoMini";
import Page from "../Page/Page";
import useAccountStore from "../../stores/account/useAccountStore";
import OptionsSideBar from "./OptionsSideBar/OptionsSideBar";
import useOptionsSideBar from "../../stores/optionsSideBar/useOptionsSideBar";
import {SideBarStatus} from "../SideBar/SideBar";
import Options from "./Options/Options";
import sizes from "../../constants/sizes";
import {TodosSortType} from "../../stores/todos/TodosSortType";


const TodosPage = observer(() => {
    const {status, todos, filteredTodos, changeSortType, getTodos, getLocalTodos, resetTodos} = useTodosStore();
    const {account} = useAccountStore();
    const {setStatus} = useOptionsSideBar();
    const [isMatchMedia, setIsMatchMedia] = useState<boolean>();

    useEffect(() => {
        window.addEventListener('resize', handleResize)
        handleResize();

        return () => window.removeEventListener('resize', handleResize);
    }, [])

    const handleResize = () => {
        setIsMatchMedia(window.matchMedia(`(max-width: ${sizes.md3})`).matches)
    }

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

    const handleSortChange = (e: ChangeEvent<HTMLSelectElement>) => {
        if (Object.values(TodosSortType).includes(e.target.value as TodosSortType)) {
            changeSortType(e.target.value as TodosSortType);
        }
    }

    const renderTodosList = () => {
        switch (status) {
            case TodosStoreStatus.GetTodosFetching: {
                return (
                    <div className={styles.overlay}>
                        <MoonLoader size={60}/>
                    </div>
                )
            }
            case TodosStoreStatus.GetTodosError: {
                return <div className={styles.message}>Возникла ошибка при загрузке заметок!</div>
            }
            case TodosStoreStatus.GetTodosSuccess:
            default: {
                if (todos) {
                    if (filteredTodos) {
                        if (filteredTodos.length === 0) {
                            return <div className={styles.message}>Упс! Не найдено ни одной заметки!</div>
                        } else {
                            return (
                                <div className={styles.todos_list}>
                                    {filteredTodos.map((todo) => <TodoMini key={todo.id} todo={todo}/>)}
                                </div>
                            );
                        }
                    } else {
                        if (todos.length === 0) {
                            return <div className={styles.message}>Упс! Не найдено ни одной заметки!</div>
                        } else {
                            return (
                                <div className={styles.todos_list}>
                                    {todos.map((todo) => <TodoMini key={todo.id} todo={todo}/>)}
                                </div>
                            );
                        }
                    }
                }
                return <></>
            }
        }
    };

    return (
        <Page>
            <div className={styles.container}>
                <div className={styles.content_container}>
                    <div className={styles.content}>
                        <div className={styles.todos}>
                            <div className={styles.options}>
                                {isMatchMedia &&
                                    <>
                                        <button className={styles.button} onClick={() => setStatus(SideBarStatus.Opened)}>Фильтры</button>
                                    </>
                                }
                                <div className={styles.sort}>
                                    <select className={styles.select} onChange={handleSortChange}>
                                        <option value={TodosSortType.CreatedAtAsc}>Дата создания (возр.)</option>
                                        <option value={TodosSortType.CreatedAtDesc}>Дата создания (уб.)</option>
                                        <option value={TodosSortType.PlannedToAsc}>Планируемая дата (возр.)</option>
                                        <option value={TodosSortType.PlannedToDesc}>Планируемая дата (уб.)</option>
                                    </select>
                                </div>
                            </div>
                            {renderTodosList()}
                        </div>
                        {!isMatchMedia && <Options/> }
                    </div>
                </div>
            </div>
            {isMatchMedia && <OptionsSideBar/>}
        </Page>
    );
});

export default TodosPage;
