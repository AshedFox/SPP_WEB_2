import {createContext, useContext} from "react";
import featureBarStore from "./featuresBarStore";

const context = createContext(featureBarStore);

const useFeaturesBar = () => {
    return useContext(context);
}

export default useFeaturesBar;
