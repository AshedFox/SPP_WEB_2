import React, {FC, useState} from 'react';
import styles from "./BurgerMenu.module.css"
import { Link } from 'react-router-dom';
import useAccountStore from "../../../../stores/account/useAccountStore";
import routes from "../../../../constants/routes";
import {AuthModalStatus, useAuthModal} from "../../../../contexts/AuthModalContext";

enum Status {
    Closed,
    Opened,
    Closing
}

type Props = {
    isAuth: boolean
}

const BurgerMenu: FC<Props> = ({isAuth}) => {
    const {logout} = useAccountStore();
    const [status, setStatus] = useState<Status>(Status.Closed);
    const {setStatus: setAuthModalStatus} = useAuthModal();

    return (
        <div className={`${styles.menu} ${status === Status.Opened ? styles.active : ""}`}>
            <div className={styles.button} onClick={() => {
                if (status === Status.Opened) {
                    setStatus(Status.Closing);
                }
                else {
                    setStatus(Status.Opened);
                }
            }}>
                <span/>
            </div>
            {
                status !== Status.Closed &&
                <div className={`${styles.list} ${status === Status.Closing ? styles.closing : ""}`}
                     onAnimationEnd={() => {
                         if (status === Status.Closing) {
                             setStatus(Status.Closed)
                         }
                     }}
                >
                    {!isAuth && <div className={styles.list_item} onClick={() => setAuthModalStatus(AuthModalStatus.Opened)}>Войти</div>}
                    <Link to={routes.createTodo.pathnameBase} className={styles.list_item}>Создать заметку</Link>
                    {isAuth && <div className={styles.list_item} onClick={logout}>Выйти из аккаунта</div>}
                </div>
            }
        </div>
    );
};

export default BurgerMenu;
