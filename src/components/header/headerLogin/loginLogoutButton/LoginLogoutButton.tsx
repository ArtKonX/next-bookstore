import Link from 'next/link';
import { dmSerifDisplay400 } from '@/styles/fonts-project/fonts';
import { signOut, useSession } from "next-auth/react";
import styles from './LoginLogoutButton.module.scss';

export default function LoginLogoutButton() {
    const { data: session } = useSession();

    const handleLogout = async () => {
        await signOut();
    };

    return (
        <div className={styles['login-logout']}>
            <Link
                className={`${dmSerifDisplay400.className} ${styles['log-or-reg-link']}`}
                href={!session ? "/login" : "/home"}
                onClick={session ? handleLogout : undefined}
            >
                {!session ? 'Войти' : 'Выйти'}
            </Link>
        </div>

    );
}