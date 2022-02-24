import {makeAutoObservable} from "mobx";

class FeaturesBarStore {
    constructor() {
        makeAutoObservable(this);
    }

    isInEditMode: boolean = false;

    changeEditMode = () => {
        this.isInEditMode = !this.isInEditMode;
    }

    setIsInEditMode = (value: boolean) => {
        this.isInEditMode = value;
    }
}

const featureBarStore = new FeaturesBarStore();

export default featureBarStore;
