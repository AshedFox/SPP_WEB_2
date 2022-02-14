import React, {createContext, FC, useContext, useState} from 'react';

export enum AuthModalStatus {
    Closed = "Closed",
    Closing = "Closing",
    Opened = "Opened",
}

type ContextParams = {
    status: AuthModalStatus,
    setStatus: (status: AuthModalStatus) => void
}

export const AuthModalContext = createContext<ContextParams>({
    status: AuthModalStatus.Closed,
    setStatus: () => {}
});

export const AuthModalProvider: FC = ({children}) => {
    const [status, setStatus] = useState<AuthModalStatus>(AuthModalStatus.Closed)

    return (
        <AuthModalContext.Provider value={{
            status, setStatus
        }}>
            {children}
        </AuthModalContext.Provider>
    );
};

export const useAuthModal = () => {
    return useContext(AuthModalContext);
}