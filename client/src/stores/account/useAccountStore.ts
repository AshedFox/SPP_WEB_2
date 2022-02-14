import {createContext, useContext} from "react";
import usersStore from "./accountStore";

const usersStoreContext = createContext(usersStore);

const useAccountStore = () => {
    return useContext(usersStoreContext);
}

export default useAccountStore;
