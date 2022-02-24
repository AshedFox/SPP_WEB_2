import React from 'react';
import styles from './Header.module.css'
import {Link} from 'react-router-dom';
import {observer} from "mobx-react-lite";
import useAccountStore from "../../../stores/account/useAccountStore";
import routes from "../../../constants/routes";
import BurgerMenu from "./BurgerMenu/BurgerMenu";


const Header = observer(() => {
    const {account} = useAccountStore();

    return (
        <div className={styles.header}>
            <div className={styles.container}>
                <div className={styles.body}>
                    <nav className={styles.navigation}>
                        <div className={styles.links_list}>
                            <Link className={styles.link} to={routes.todos.pathnameBase}>Заметки</Link>
                        </div>
                    </nav>
                    <BurgerMenu isAuth={account !== undefined}/>
                </div>
            </div>
        </div>
    );
});

export default Header;
