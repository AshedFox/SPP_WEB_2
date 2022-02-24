import {createContext, useContext} from "react";
import optionsSideBarStore from "./optionsSideBarStore";

const context = createContext(optionsSideBarStore);

const useOptionsSideBar = () => {
    return useContext(context);
}

export default useOptionsSideBar;
