import {createContext, useContext} from "react";
import todosStore from "./todosStore";

const context = createContext(todosStore);

const useTodosStore = () => {
    return useContext(context);
}

export default useTodosStore;
