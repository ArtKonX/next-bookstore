import styles from './LoginForm.module.scss';
import LoginInput from '../loginInput/LoginInput';
import LoginButton from '../loginButton/LoginButton';

import authenticateUser from '@/utils/authUtils/authenticateUser';

export default function LoginForm() {
    return (
        <div className={styles['form-container']}>
            <form className={styles['form']} onSubmit={(e) => authenticateUser(e)}>
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
        </div>
    );
};