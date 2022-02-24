import React from 'react';
import {BrowserRouter, Route, Routes, Navigate} from 'react-router-dom';
import NotFound from "../NotFound/NotFound";
import routes from "../../constants/routes";
import Page from "../Page/Page";
import {observer} from "mobx-react-lite";
import TodosPage from "../TodosPage/TodosPage";
import useAccountStore from "../../stores/account/useAccountStore";
import TodoPage from "../TodoPage/TodoPage";
import CreateTodoPage from "../CreateTodoPage/CreateTodoPage";

const AppRouter = observer(() => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={routes.home.path} element={<Navigate to={routes.todos.pathnameBase}/>}/>
                <Route path={routes.todos.path} element={<TodosPage/>}/>
                <Route path={routes.todo.path} element={<TodoPage/>}/>
                <Route path={routes.createTodo.path} element={<CreateTodoPage/>}/>
                <Route path="*" element={<NotFound/>}/>
            </Routes>
        </BrowserRouter>
    );
});

export default AppRouter;
