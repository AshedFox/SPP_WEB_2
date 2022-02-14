import {makeAutoObservable, runInAction} from "mobx";
import {TodosStoreStatus} from "./TodosStoreStatus";
import {TodoModel} from "../../models/TodoModel";
import todosService from "../../services/todosService";
import {TodoToAddDto} from "../../dtos/TodoToAddDto";
import accountStore from "../account/accountStore";
import {v4 as uuidv4} from 'uuid';

class TodosStore {
    constructor() {
        makeAutoObservable(this);
    }

    status: TodosStoreStatus = TodosStoreStatus.None;

    todos?: TodoModel[];

    currentTodo?: TodoModel;

    resetTodos = () => this.todos = undefined;

    resetCurrentTodo = () => this.currentTodo = undefined;

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
            } else if (res.status === 401) {
                accountStore.clearAccount();
                runInAction(() => this.status = TodosStoreStatus.GetTodosError);
            } else {
                runInAction(() => this.status = TodosStoreStatus.GetTodosError);
            }
        } catch (e) {
            runInAction(() => this.status = TodosStoreStatus.GetTodosError);
        }
    }

    getLocalTodos = () => {
        const lsItem = localStorage.getItem('todos');

        if (lsItem !== null) {
            this.todos = JSON.parse(lsItem) as TodoModel[];
        } else {
            this.todos = [];
        }

        this.status = TodosStoreStatus.GetTodosSuccess;
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
            } else if (res.status === 401) {
                accountStore.clearAccount();
                runInAction(() => this.status = TodosStoreStatus.GetTodoError);
            }  else {
                runInAction(() => this.status = TodosStoreStatus.GetTodoError);
            }
        } catch (e) {
            runInAction(() => this.status = TodosStoreStatus.GetTodoError);
        }
    }

    getLocalTodo = (id: string) => {
        this.getLocalTodos();

        this.currentTodo = this.todos!.find(todo => todo.id === id);

        if (this.currentTodo) {
            this.status = TodosStoreStatus.CreateTodoSuccess;
        } else {
            this.status = TodosStoreStatus.CreateTodoError;
        }
    }

    createTodo = async (todoToAddDto: TodoToAddDto) => {
        this.status = TodosStoreStatus.CreateTodoFetching;

        try {
            const res = await todosService.createTodo(todoToAddDto);

            if (res.status === 201) {
                runInAction(() => this.status = TodosStoreStatus.CreateTodoSuccess);
            } else if (res.status === 401) {
                accountStore.clearAccount();
                runInAction(() => this.status = TodosStoreStatus.CreateTodoError);
            }  else {
                runInAction(() => this.status = TodosStoreStatus.CreateTodoError);
            }
        } catch (e) {
            runInAction(() => this.status = TodosStoreStatus.CreateTodoError);
        }
    }

    createLocalTodo = (todoToAddDto: TodoToAddDto) => {
        this.getLocalTodos();

        const todo: TodoModel = {
            id: uuidv4(),
            description: todoToAddDto.description,
            createdAt: new Date(Date.now()).toISOString(),
            plannedTo: todoToAddDto.plannedTo,
            name: todoToAddDto.name
        }

        this.todos!.push(todo);

        this.saveLocalTodos();
    }



    private saveLocalTodos = () => {
        if (this.todos !== undefined) {
            localStorage.setItem('todos', JSON.stringify(this.todos));
        }
    }
}

const todosStore = new TodosStore();

export default todosStore;
