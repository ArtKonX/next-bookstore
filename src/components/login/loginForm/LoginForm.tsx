import styles from './LoginForm.module.scss';
import LoginInput from '../loginInput/LoginInput';
import LoginButton from '../loginButton/LoginButton';

import authenticateUser from '@/utils/authUtils/authenticateUser';
import { useState } from 'react';
import { useSession } from 'next-auth/react';

export default function LoginForm() {

    const [error, setError] = useState('');

    const { status: sessionStatus } = useSession();

    const handleLogin = (e: any) => {
        e.preventDefault();
        authenticateUser(e);

        if (sessionStatus !== 'authenticated') {
            setError('Неверный email или пароль. Попробуйте снова.');
        }
    };

    return (
        <div className={styles['form-container']}>
            <form className={styles['form']} onSubmit={(e) => handleLogin(e)}>
                <LoginInput
                    id="email"
                    label="Электронная почта"
                    placeholder="Введите Email..."
                    type="text"
                />
                <LoginInput
                    id="password"
                    label="Пароль"
                    placeholder="Введите пароль..."
                    type="password"
                />
                <LoginButton text="Войти" />
            </form>
            <div className={styles['error']}>{error}</div>
        </div>
    );
};