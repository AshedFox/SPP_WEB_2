import React, {SyntheticEvent, useEffect, useState} from 'react';
import styles from "./AuthModal.module.css";
import CryptoJS from "crypto-js";
import {AuthModalStatus, useAuthModal} from "../../contexts/AuthModalContext";
import {LoginDto} from "../../dtos/LoginDto";
import useAccountStore from "../../stores/account/useAccountStore";
import {AccountStoreStatus} from "../../stores/account/AccountStoreStatus";
import {SignUpDto} from "../../dtos/SignUpDto";
import {MoonLoader} from "react-spinners";
import {observer} from "mobx-react-lite";

enum AuthType {
    Login,
    SignUp
}

type FormParams = {
    email: string,
    password: string,
    passwordRepeat: string,
    name: string
}

const initialFormValue: FormParams = {
    email: "",
    password: "",
    passwordRepeat: "",
    name: ""
}

const AuthModal = observer (() => {
    const [formData, setFormData] = useState<FormParams>(initialFormValue);
    const [currentType, setCurrentType] = useState<AuthType>(AuthType.Login);
    const {status, setStatus} = useAuthModal()
    const {login, status: storeStatus, signUp} = useAccountStore();

    useEffect(() => {
        if (storeStatus === AccountStoreStatus.LoginSuccess) {
            if (status === AuthModalStatus.Opened) {
                setStatus(AuthModalStatus.Closing)
            }
        } else if (storeStatus === AccountStoreStatus.SignUpSuccess) {
            setFormData(initialFormValue);
        }
    }, [storeStatus])

    const handleLogin = async (e: SyntheticEvent) => {
        e.preventDefault();

        let loginDto: LoginDto = {
            email: formData.email,
            passwordHash: CryptoJS.SHA512(formData.password).toString(CryptoJS.enc.Hex),
        }

        await login(loginDto);
    };

    const handleSignUp = async (e: SyntheticEvent) => {
        e.preventDefault();

        let signUpDto: SignUpDto = {
            email: formData.email,
            passwordHash: CryptoJS.SHA512(formData.password).toString(CryptoJS.enc.Hex),
            name: formData.name,
        }

        if (formData.password === formData.passwordRepeat) {
            await signUp(signUpDto);
        }
        else {
            alert("Значения в полях пароля не совпадают")
        }
    };

    if (status === AuthModalStatus.Closed) {
        return null;
    }

    return (
        <div className={`${styles.container} ${status === AuthModalStatus.Closing ? styles.closing : ""}`}
             onClick={() => {
                 if (storeStatus !== AccountStoreStatus.LoginFetching && storeStatus !== AccountStoreStatus.SignUpFetching) {
                     setStatus(AuthModalStatus.Closing)
                 }
             }}
        >
            <div className={`${styles.content} ${status === AuthModalStatus.Closing ? styles.closing : ""}`}
                 onAnimationEnd={() => {
                     if (status === AuthModalStatus.Closing) {
                         setStatus(AuthModalStatus.Closed)
                     }
                 }}
                 onClick={(e) => e.stopPropagation()}
            >
                <div className={styles.header}>
                    <div className={styles.switch}>
                        <div className={`${styles.title} ${currentType === AuthType.Login ? styles.selected : ""}`}
                             onClick={() => setCurrentType(AuthType.Login)}>Авторизация</div>
                        <div className={`${styles.title} ${currentType === AuthType.SignUp ? styles.selected : ""}`}
                             onClick={() => setCurrentType(AuthType.SignUp)}>Регистрация</div>
                    </div>
                    <div className={styles.close} onClick={() => setStatus(AuthModalStatus.Closing)}>✖</div>
                </div>
                {(storeStatus === AccountStoreStatus.LoginFetching || storeStatus === AccountStoreStatus.SignUpFetching) &&
                    <div className={styles.overlay}>
                        <MoonLoader size={90}/>
                    </div>
                }
                {
                    currentType === AuthType.Login ?
                        <form className={styles.form} onSubmit={(e: SyntheticEvent) => handleLogin(e)}>
                            <div className={styles.fields}>
                                <input className={styles.input} value={formData.email}
                                       name={"email"} type={"text"} required
                                       placeholder={"Email"} maxLength={320} minLength={5}
                                       onChange={e => setFormData(prev => ({...prev, email: e.target.value}))}
                                />
                                <input className={styles.input} value={formData.password} required
                                       name={"password"} type={"password"} maxLength={64} minLength={4}
                                       placeholder={"Пароль"} autoComplete={"currentPassword"}
                                       onChange={e => setFormData(prev => ({...prev, password: e.target.value}))}
                                />
                            </div>
                            {
                                storeStatus === AccountStoreStatus.LoginError &&
                                <div className={styles.error}>Возникла ошибка при попытке авторизации</div>
                            }
                            <button className={styles.button} type={"submit"}>Войти</button>
                        </form> :
                        <form className={styles.form} onSubmit={(e) => handleSignUp(e)}>
                            <div className={styles.fields}>
                                <input className={styles.input} name={"email"}
                                       type={"email"} value={formData.email} required
                                       placeholder={"Email"} maxLength={320} minLength={5}
                                       onChange={e => setFormData(prev => ({...prev, email: e.target.value}))}
                                />
                                <input className={styles.input} name={"password"}
                                       type={"password"} value={formData.password} required
                                       placeholder={"Пароль"} maxLength={64} minLength={4}
                                       onChange={e => setFormData(prev => ({...prev, password: e.target.value}))}
                                />
                                <input className={styles.input} name={"passwordRepeat"}
                                       type={"password"} value={formData.passwordRepeat} required
                                       placeholder={"Пароль (повторно)"} maxLength={64} minLength={4}
                                       onChange={e => setFormData(prev => ({...prev, passwordRepeat: e.target.value}))}
                                />
                                <input className={styles.input} name={"name"}
                                       type={"text"} value={formData.name} maxLength={100} required
                                       placeholder={"Имя пользователя"}
                                       onChange={e => setFormData(prev => ({...prev, name: e.target.value}))}
                                />
                            </div>
                            {
                                storeStatus === AccountStoreStatus.SignUpError &&
                                <div className={styles.error}>Возникла ошибка при попытке регистрации</div>
                            }
                            {
                                storeStatus === AccountStoreStatus.SignUpSuccess &&
                                <div className={styles.success}>Регистрация прошла успешно</div>
                            }
                            <button className={styles.button} type={"submit"}>Зарегистрироваться</button>
                        </form>
                }
            </div>
        </div>
    );
});

export default AuthModal;
