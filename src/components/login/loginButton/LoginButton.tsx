'use client'

import styles from './LoginButton.module.scss';

const LoginButton = ({ text }: {text: string}) => (
    <div className={styles['btn-singin-block']}>
        <button type="submit" className={styles['btn-singin-block__btn']}>
            {text}
        </button>
    </div>
);

export default LoginButton;