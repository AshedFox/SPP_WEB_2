import React, {FC} from 'react';
import Header from "./Header/Header";
import styles from "./Page.module.css";
import AuthModal from "../AuthModal/AuthModal";
import {AuthModalProvider} from "../../contexts/AuthModalContext";

const Page:FC = ({children}) => {
    return (
        <AuthModalProvider>
            <AuthModal/>
            <Header/>
            <div className={styles.container}>
                {children}
            </div>
        </AuthModalProvider>
    );
};

export default Page;
