import React, {ChangeEvent, SyntheticEvent, useState} from 'react';
import styles from "./Options.module.css";
import {observer} from "mobx-react-lite";
import useTodosStore from "../../../stores/todos/useTodosStore";

type FormParams = {
    name?: string,
    description?: string,
    createdAtMin?: string,
    createdAtMax?: string,
    plannedToMin?: string,
    plannedToMax?: string,
    hideExpired?: boolean,
    hideCompleted?: boolean
}

const initialFormData: FormParams = {
    name: '',
    description: '',
    createdAtMin: '',
    createdAtMax: '',
    plannedToMin: '',
    plannedToMax: '',
    hideExpired: false,
    hideCompleted: false
}

const Options = observer(() => {
    const {filteredTodos, filterTodos, resetFilter} = useTodosStore()
    const [formData, setFormData] = useState<FormParams>(initialFormData);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({...prev, [e.target.name]: e.target.value}));
    }

    const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({...prev, [e.target.name]: e.target.checked }))
    }

    const handleFormSubmit = (e: SyntheticEvent) => {
        e.preventDefault();

        if (formData.name || formData.description || formData.createdAtMin || formData.createdAtMax ||
            formData.plannedToMin || formData.plannedToMax || formData.hideExpired || formData.hideCompleted)
        {
            filterTodos(formData.name, formData.description, formData.createdAtMin, formData.createdAtMax,
                formData.plannedToMin, formData.plannedToMax, formData.hideExpired, formData.hideCompleted);
        }
    }

    const handleFormReset = () => {
        setFormData(initialFormData);
        resetFilter();
    }

    return (
        <div className={styles.container}>
            <div className={styles.title}>
                <div className={styles.text}>Поиск</div>
                {filteredTodos &&
                    <div className={styles.reset} onClick={handleFormReset}>Сбросить</div>
                }
            </div>
            <form className={styles.form} onSubmit={handleFormSubmit}>
                <div className={styles.fields}>
                    <label className={styles.label}>Название:
                        <input className={styles.input} name={'name'} type={'text'} value={formData.name}
                               onChange={handleChange}
                        />
                    </label>
                    <label className={styles.label}>Содержание:
                        <input className={styles.input} name={'description'} type={'text'} value={formData.description}
                               onChange={handleChange}
                        />
                    </label>
                    <label className={styles.label}>Дата создания(мин. - макс.):
                        <input className={styles.input} name={'createdAtMin'} type={'datetime-local'}
                               value={formData.createdAtMin} onChange={handleChange}
                        />
                        <input className={styles.input} name={'createdAtMax'} type={'datetime-local'}
                               value={formData.createdAtMax} onChange={handleChange}
                        />
                    </label>
                    <label className={styles.label}>Планируемая дата(мин. - макс.):
                        <input className={styles.input} name={'plannedToMin'} type={'datetime-local'}
                               value={formData.plannedToMin} onChange={handleChange}
                        />
                        <input className={styles.input} name={'plannedToMax'} type={'datetime-local'}
                               value={formData.plannedToMax} onChange={handleChange}
                        />
                    </label>
                    <label className={styles.checkbox_label}>Скрыть прошедшие?
                        <input className={styles.checkbox} name={'hideExpired'} type={'checkbox'}
                               checked={formData.hideExpired}
                               onChange={handleCheckboxChange}
                        />
                    </label>
                    <label className={styles.checkbox_label}>Скрыть выполненные?
                        <input className={styles.checkbox} name={'hideCompleted'} type={'checkbox'}
                               checked={formData.hideCompleted}
                               onChange={handleCheckboxChange}
                        />
                    </label>
                </div>
                <button className={styles.button} type={"submit"}>Искать</button>
            </form>
        </div>
    );
});

export default Options;
