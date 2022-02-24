const routes = {
    home: {
        path: "/",
        pathnameBase: "/"
    },
    todos: {
        path: "/todos",
        pathnameBase: "/todos"
    },
    todo: {
        path: "/todo/:id",
        pathnameBase: "/todo"
    },
    createTodo: {
        path: "/create",
        pathnameBase: "/create"
    }
}

export default routes;
