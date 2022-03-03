import React, {FC} from 'react';
import {FileModel} from "../../../../models/FileModel";
import {FileToEditDto} from "../../../../dtos/FileToEditDto";
import styles from './File.module.css';

type Props = {
    file: FileModel | FileToEditDto,
    handleDeletion?: () => void
}

const File: FC<Props> = ({file, handleDeletion}) => {
    const renderFile = () => {
        if (file.mimetype.startsWith('image/')) {
            return (
                <div className={styles.container}>
                    {handleDeletion &&
                        <div className={styles.delete} title={'Удалить файл'} onClick={handleDeletion}>{'×'}</div>
                    }
                    <img className={styles.image} src={file.url} alt={'file'}/>
                </div>
            );
        } else if (file.mimetype.startsWith('video/')) {
            return (
                <div className={styles.container}>
                    {handleDeletion &&
                        <div className={styles.delete} title={'Удалить файл'} onClick={handleDeletion}>{'×'}</div>
                    }
                    <video className={styles.video} controls src={file.url}/>
                </div>
            );

        } else if (file.mimetype.startsWith('audio/')) {
            return (
                <div className={styles.container}>
                    {handleDeletion &&
                        <div className={styles.delete} title={'Удалить файл'} onClick={handleDeletion}>{'×'}</div>
                    }
                    <audio className={styles.audio} controls src={file.url}/>
                </div>
            );
        } else {
            return (
                <div className={styles.container}>
                    {handleDeletion &&
                        <div className={styles.delete} title={'Удалить файл'} onClick={handleDeletion}>{'×'}</div>
                    }
                    <a className={styles.file} href={file.url}>{file.name}</a>
                </div>
            );
        }
    }

    return renderFile();
};

export default File;
