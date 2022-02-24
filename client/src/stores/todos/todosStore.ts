import {makeAutoObservable, runInAction} from "mobx";
import {TodosStoreStatus} from "./TodosStoreStatus";
import {TodoModel} from "../../models/TodoModel";
import todosService from "../../services/todosService";
import {TodoToAddDto} from "../../dtos/TodoToAddDto";
import accountStore from "../account/accountStore";
import {v4 as uuidv4} from 'uuid';
import {TodoToEditDto} from "../../dtos/TodoToEditDto";
import {TodosSortType} from "./TodosSortType";

class TodosStore {
    constructor() {
        makeAutoObservable(this);
    }

    status: TodosStoreStatus = TodosStoreStatus.None;

    todos?: TodoModel[];
    filteredTodos?: TodoModel[];
    currentSortType: TodosSortType = TodosSortType.CreatedAtAsc;
    currentTodo?: TodoModel;

    resetTodos = () => this.todos = undefined;

    resetCurrentTodo = () => this.currentTodo = undefined;

    changeSortType = (type: TodosSortType) => {
        this.currentSortType = type;
        this.sortTodos();
    }

    private sort = (array: TodoModel[]) => {
        switch (this.currentSortType) {
            case TodosSortType.CreatedAtAsc: {
                return array.sort((todo1, todo2) => {
                    return new Date(todo1.createdAt).valueOf() - new Date(todo2.createdAt).valueOf();
                })
            }
            case TodosSortType.CreatedAtDesc: {
                return array.sort((todo1, todo2) => {
                    return new Date(todo2.createdAt).valueOf() - new Date(todo1.createdAt).valueOf();
                })
            }
            case TodosSortType.PlannedToAsc: {
                return array.sort((todo1, todo2) => {
                    if (!todo1.plannedTo && !todo2.plannedTo) {
                        return 0;
                    } else if (!todo1.plannedTo) {
                        return 1;
                    } else if (!todo2.plannedTo) {
                        return -1;
                    }

                    return new Date(todo1.plannedTo).valueOf() - new Date(todo2.plannedTo).valueOf();
                })
            }
            case TodosSortType.PlannedToDesc: {
                return array.sort((todo1, todo2) => {
                    if (!todo1.plannedTo && !todo2.plannedTo) {
                        return 0;
                    } else if (!todo1.plannedTo) {
                        return 1;
                    } else if (!todo2.plannedTo) {
                        return -1;
                    }

                    return new Date(todo2.plannedTo).valueOf() - new Date(todo1.plannedTo).valueOf();
                })
            }
        }
    }

    private sortTodos = () => {
        if (this.todos) {
            this.todos = this.sort(this.todos);

            if (this.filteredTodos) {
                this.filteredTodos = this.sort(this.filteredTodos);
            }
        }
    }

    filterTodos = (name?: string, description?: string, createdAtMin?: string, createdAtMax?: string,
                   plannedToMin?: string, plannedToMax?: string, hideExpired?: boolean, hideCompleted?: boolean) =>
    {
        if (this.todos) {
            this.filteredTodos = this.todos;

            if (name) {
                this.filteredTodos = this.filteredTodos.filter((todo) => todo.name.includes(name))
            }
            if (description) {
                this.filteredTodos = this.filteredTodos.filter((todo) => todo.description?.includes(description))
            }
            if (createdAtMin) {
                this.filteredTodos = this.filteredTodos.filter((todo) =>
                    new Date(todo.createdAt) >= new Date(createdAtMin)
                )
            }
            if (createdAtMax) {
                this.filteredTodos = this.filteredTodos.filter((todo) =>
                    new Date(todo.createdAt) <= new Date(createdAtMax)
                )
            }
            if (plannedToMin) {
                this.filteredTodos = this.filteredTodos.filter((todo) =>
                    todo.plannedTo && new Date(todo.plannedTo) >= new Date(plannedToMin)
                )
            }
            if (plannedToMax) {
                this.filteredTodos = this.filteredTodos.filter((todo) =>
                    todo.plannedTo && new Date(todo.plannedTo) <= new Date(plannedToMax)
                )
            }
            if (hideExpired) {
                this.filteredTodos = this.filteredTodos.filter((todo) =>
                    !(todo.plannedTo && new Date(todo.plannedTo) < new Date())
                )
            }
            if (hideCompleted) {
                this.filteredTodos = this.filteredTodos.filter((todo) => !todo.isCompleted)
            }
        }
    }

    resetFilter = () => {
        this.filteredTodos = undefined;
        this.sortTodos();
    }

    getTodos = async () => {
        this.status = TodosStoreStatus.GetTodosFetching;
        this.todos = undefined;

        try {
            const res = await todosService.getTodos();

            if (res.status === 200) {
                const todos = await res.json() as TodoModel[];

                runInAction(() => {
                    this.todos = todos;
                    this.status = TodosStoreStatus.GetTodosSuccess;
                })
                return todos;
            } else {
                if (res.status === 401) {
                    accountStore.clearAccount();
                }
                runInAction(() => this.status = TodosStoreStatus.GetTodosError);
            }
        } catch (e) {
            runInAction(() => this.status = TodosStoreStatus.GetTodosError);
        }
    }

    getLocalTodos = () => {
        try {
            const localStorageTodos = localStorage.getItem('todos');

            if (localStorageTodos !== null) {
                this.todos = JSON.parse(localStorageTodos) as TodoModel[];
                this.sortTodos();
            } else {
                this.todos = [];
            }

            this.status = TodosStoreStatus.GetTodosSuccess;
            return this.todos;
        } catch (e) {}
    }

    getTodo = async (id: string) => {
        this.status = TodosStoreStatus.GetTodoFetching;
        this.currentTodo = undefined;

        try {
            const res = await todosService.getTodo(id);

            if (res.status === 200) {
                const todo = await res.json() as TodoModel;
                runInAction(() => {
                    this.currentTodo = todo;
                    this.status = TodosStoreStatus.GetTodoSuccess;
                })
                return todo;
            } else {
                if (res.status === 401) {
                    accountStore.clearAccount();
                }
                runInAction(() => this.status = TodosStoreStatus.GetTodoError);
            }
        } catch (e) {
            runInAction(() => this.status = TodosStoreStatus.GetTodoError);
        }
    }

    getLocalTodo = (id: string) => {
        try {
            this.getLocalTodos();

            this.currentTodo = this.todos?.find(todo => todo.id === id);

            if (this.currentTodo) {
                this.status = TodosStoreStatus.GetTodoSuccess;
            } else {
                this.status = TodosStoreStatus.GetTodoError;
            }
            return this.currentTodo;
        } catch (e) {}
    }

    createTodo = async (todoToAddDto: TodoToAddDto) => {
        this.status = TodosStoreStatus.CreateTodoFetching;

        try {
            const res = await todosService.createTodo(todoToAddDto);

            if (res.status === 201) {
                runInAction(() => this.status = TodosStoreStatus.CreateTodoSuccess);
                return await res.json() as TodoModel;
            } else {
                if (res.status === 401) {
                    accountStore.clearAccount();
                }
                runInAction(() => this.status = TodosStoreStatus.CreateTodoError);
            }
        } catch (e) {
            runInAction(() => this.status = TodosStoreStatus.CreateTodoError);
        }
    }

    createLocalTodo = (todoToAddDto: TodoToAddDto) => {
        try {
            this.getLocalTodos();

            const todo: TodoModel = {
                id: uuidv4(),
                description: todoToAddDto.description,
                createdAt: new Date().toISOString(),
                plannedTo: todoToAddDto.plannedTo,
                name: todoToAddDto.name,
                isCompleted: false
            }

            this.todos?.push(todo);

            this.saveLocalTodos();
            return todo;
        } catch (e) {}
    }

    updateTodo = async (id: string, todoToEditDto: TodoToEditDto) => {
        this.status = TodosStoreStatus.UpdateTodoFetching;

        try {
            const res = await todosService.updateTodo(id, todoToEditDto);

            if (res.status === 204) {
                runInAction(() => this.status = TodosStoreStatus.UpdateTodoSuccess);
                return true;
            } else {
                if (res.status === 401) {
                    accountStore.clearAccount();
                }
                runInAction(() => this.status = TodosStoreStatus.UpdateTodoError);
                return false;
            }
        } catch (e) {
            runInAction(() => this.status = TodosStoreStatus.UpdateTodoError);
            return false;
        }
    }

    updateLocalTodo = (id: string, todoToEditDto: TodoToEditDto) => {
        try {
            this.getLocalTodos();

            this.todos = this.todos?.map((todo) => {
                if (todo.id === id) {
                    todo = {
                        ...todo,
                        name: todoToEditDto.name,
                        description: todoToEditDto.description,
                        plannedTo: todoToEditDto.plannedTo,
                        isCompleted: todoToEditDto.isCompleted
                    }
                }
                return todo;
            })

            this.saveLocalTodos();
            return true;
        } catch (e) {
            return false;
        }
    }

    updateInCurrentTodo = (todo: TodoToEditDto) => {
        if (this.currentTodo) {
            this.currentTodo = {...this.currentTodo, ...todo};
        }
    }

    updateTodos = (id: string, newTodo: TodoModel) => {
        if (this.todos) {
            this.todos = this.todos.map(todo => {
                if (todo.id === id) {
                    return {...todo, ...newTodo};
                }
                return todo;
            });

        }
    }

    deleteTodo = async (id: string) => {
        this.status = TodosStoreStatus.DeleteTodoFetching;

        try {
            const res = await todosService.deleteTodo(id);

            if (res.status === 204) {
                runInAction(() => this.status = TodosStoreStatus.DeleteTodoSuccess);
                return true;
            } else {
                if (res.status === 401) {
                    accountStore.clearAccount();
                }
                runInAction(() => this.status = TodosStoreStatus.DeleteTodoError);
                return false;
            }
        } catch (e) {
            runInAction(() => this.status = TodosStoreStatus.DeleteTodoError);
            return false;
        }
    }

    deleteLocalTodo = (id: string) => {
        try {
            this.getLocalTodos();

            this.todos = this.todos?.filter(todo => todo.id !== id);

            this.saveLocalTodos();
            return true;
        } catch (e) {
            return false;
        }
    }

    deleteFromTodos = (id: string) => {
        this.todos = this.todos?.filter((todo) => todo.id !== id);
    }

    private saveLocalTodos = () => {
        if (this.todos !== undefined) {
            localStorage.setItem('todos', JSON.stringify(this.todos));
        }
    }
}

const todosStore = new TodosStore();

export default todosStore;
