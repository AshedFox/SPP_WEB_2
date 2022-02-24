import {makeAutoObservable} from "mobx";
import {SideBarStatus} from "../../components/SideBar/SideBar";

class OptionsSideBarStore {
    constructor() {
        makeAutoObservable(this)
    }

    status: SideBarStatus = SideBarStatus.Closed;

    setStatus = (status: SideBarStatus) => {
        this.status = status;
    }
}

const optionsSideBarStore = new OptionsSideBarStore();

export default optionsSideBarStore;
