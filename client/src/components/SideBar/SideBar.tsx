import React, {FC, useEffect} from 'react';
import styles from './SideBar.module.css';

export enum SideBarStatus {
    Closed = "Closed",
    Closing = "Closing",
    Opened = "Opened",
}

type Props = {
    title: string,
    status: SideBarStatus,
    setStatus: (status: SideBarStatus) => void
}

const SideBar: FC<Props> = ({children, title, status, setStatus}) => {
    useEffect(() => {
        let overflow = document.body.style.overflow;

        if (status !== SideBarStatus.Closed) {
            document.body.style.overflow = 'hidden';
        }
        return () => {
            document.body.style.overflow = overflow;
        }
    }, [status])

    if (status === SideBarStatus.Closed) {
        return null;
    }

    return (
        <div className={`${styles.container} ${status === SideBarStatus.Closing ? styles.closing : ""}`}
             onClick={() => {
                 if (status === SideBarStatus.Opened) {
                     setStatus(SideBarStatus.Closing);
                 }
             }}
        >
            <div className={`${styles.content} ${status === SideBarStatus.Closing ? styles.closing : ""}`}
                 onAnimationEnd={() => {
                     if (status === SideBarStatus.Closing) {
                         setStatus(SideBarStatus.Closed)
                     }
                 }}
                 onClick={(e) => e.stopPropagation()}
            >
                <div className={styles.header}>
                    <div className={styles.title}>{title}</div>
                    <div className={styles.close}
                         onClick={() => {
                             if (status === SideBarStatus.Opened) {
                                 setStatus(SideBarStatus.Closing);
                             }
                         }}
                    >
                        {'×'}
                    </div>
                </div>
                {children}
            </div>
        </div>
    );
};

export default SideBar;
