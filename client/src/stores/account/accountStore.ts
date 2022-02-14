import {makeAutoObservable, reaction, runInAction} from "mobx";
import {AccountStoreStatus} from "./AccountStoreStatus";
import accountService from "../../services/accountService";
import {LoginDto} from "../../dtos/LoginDto";
import {AccountModel} from "../../models/AccountModel";
import {SignUpDto} from "../../dtos/SignUpDto";

class AccountStore {
    constructor() {
        makeAutoObservable(this);

        const account = localStorage.getItem('account');
        if (account) {
            this.account = JSON.parse(account) as AccountModel;
        }
    }

    status: AccountStoreStatus = AccountStoreStatus.None;
    account?: AccountModel;

    clearAccount = () => this.account = undefined;

    signUp = async (signUpDto: SignUpDto) => {
        this.status = AccountStoreStatus.SignUpFetching;

        try {
            const res = await accountService.signUp(signUpDto);

            if (res.status === 201) {
                runInAction(() => this.status = AccountStoreStatus.SignUpSuccess);
            } else if (res.status === 401) {
                this.clearAccount();
                runInAction(() => this.status = AccountStoreStatus.SignUpError);
            } else {
                runInAction(() => this.status = AccountStoreStatus.SignUpError);
            }
        } catch (e) {
            runInAction(() => this.status = AccountStoreStatus.SignUpError);
        }
    }

     login = async (loginDto: LoginDto) => {
        this.status = AccountStoreStatus.LoginFetching;
        this.account = undefined;

        try {
            const res = await accountService.login(loginDto);

            if (res.status === 200) {
                const account = await res.json() as AccountModel;

                runInAction(() => {
                    this.account = account;
                    this.status = AccountStoreStatus.LoginSuccess
                });
            } else if (res.status === 401) {
                this.clearAccount();
                runInAction(() => this.status = AccountStoreStatus.LoginError);
            } else {
                runInAction(() => this.status = AccountStoreStatus.LoginError);
            }
        } catch (e) {
            runInAction(() => this.status = AccountStoreStatus.LoginError);
        }
    }

    logout = async () => {
        this.status = AccountStoreStatus.LogoutFetching;

        try {
            const res = await accountService.logout();

            if (res.status === 204) {
                runInAction(() => {
                    this.account = undefined;
                    this.status = AccountStoreStatus.LogoutSuccess
                });
            } else if (res.status === 401) {
                this.clearAccount();
                runInAction(() => this.status = AccountStoreStatus.LogoutError);
            } else {
                runInAction(() => this.status = AccountStoreStatus.LogoutError);
            }
        } catch (e) {
            runInAction(() => this.status = AccountStoreStatus.LogoutError);
        }
    }
}

const accountStore = new AccountStore();

reaction<AccountModel | undefined>(
    () => accountStore.account,
    account => {
        if (account) {
            localStorage.setItem('account', JSON.stringify(account));
        } else {
            localStorage.removeItem('account');
        }
    }
)

export default accountStore;
