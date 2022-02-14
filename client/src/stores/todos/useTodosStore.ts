import {createContext, useContext} from "react";
import todosStore from "./todosStore";

const todosStoreContext = createContext(todosStore);

const useTodosStore = () => {
    return useContext(todosStoreContext);
}

export default useTodosStore;
