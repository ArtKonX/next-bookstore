'use client'

import styles from './LoginInput.module.scss';

type LoginInputType = {
    id: string,
    label: string,
    placeholder: string,
    type: string
}

const LoginInput = ({ id, label, placeholder, type }: LoginInputType) => {

    return (
        <div className={styles['input-block']}>
            <label className={styles['input-block__label']} htmlFor={id}>
                {label}
            </label>
            <input
                type={type}
                id={id}
                className={styles['input-block__input']}
                placeholder={placeholder}
                required
            />
        </div>
    )
}

export default LoginInput;
