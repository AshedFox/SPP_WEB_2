import React from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import NotFound from "../NotFound/NotFound";
import routes from "../../constants/routes";
import Page from "../Page/Page";
import {observer} from "mobx-react-lite";
import TodosPage from "../TodosPage/TodosPage";

const AppRouter = observer (() => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={routes.home.path} element={<Page/>}/>
                <Route path={routes.todos.path} element={<TodosPage/>}/>
                <Route path={routes.todo.path} element={<Page/>}/>
                <Route path="*" element={<NotFound/>}/>
            </Routes>
        </BrowserRouter>
    );
});

export default AppRouter;
