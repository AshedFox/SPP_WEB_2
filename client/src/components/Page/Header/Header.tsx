import React from 'react';
import styles from './Header.module.css'
import {Link} from 'react-router-dom';
import {AuthModalStatus, useAuthModal} from "../../../contexts/AuthModalContext";
import routes from "../../../constants/routes";
import useAccountStore from "../../../stores/account/useAccountStore";
import {observer} from "mobx-react-lite";

const Header = observer(() => {
    const {account, logout} = useAccountStore();
    const {setStatus} = useAuthModal();

    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <nav className={styles.navigation}>
                    <div className={styles.links_list}>
                        <Link className={styles.link} to={routes.todos.path}>Задачи</Link>
                    </div>
                    {
                        account !== undefined ?
                            <div className={styles.link} onClick={logout}>Выход</div> :
                            <div className={styles.link} onClick={() => setStatus(AuthModalStatus.Opened)}>Войти</div>
                    }
                </nav>
            </div>
        </div>
    );
});

export default Header;
