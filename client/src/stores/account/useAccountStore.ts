import {createContext, useContext} from "react";
import usersStore from "./accountStore";

const context = createContext(usersStore);

const useAccountStore = () => {
    return useContext(context);
}

export default useAccountStore;
