import React, {FC} from 'react';
import {TodoModel} from "../../../models/TodoModel";
import styles from "./TodoMini.module.css";
import {Link} from "react-router-dom";
import routes from "../../../constants/routes";

type Props = {
    todo: TodoModel
}

const TodoMini: FC<Props> = ({todo}) => {
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <Link to={`${routes.todo.pathnameBase}/${todo.id}`} className={styles.name}>{todo.name}</Link>
            </div>
            <div className={styles.main}>
                <div className={styles.desc}>{todo.description?.substring(0, 500)}</div>
            </div>
            <div className={styles.footer}>
                <div className={styles.datetime}>Запланировано на: {todo.plannedTo}</div>
                <div className={styles.datetime}>Создано: {todo.createdAt}</div>
            </div>
        </div>
    );
};

export default TodoMini;
