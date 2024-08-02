import Link from 'next/link';
import { signOut } from "next-auth/react";
import styles from './AccountActions.module.scss';

export default function AccountActions() {

    return (
        <div className={styles['account-actions']}>
            <button className={styles['account-actions__btn-signout']} onClick={() => signOut()}>Выйти из аккаунта</button>
            <Link className={styles['account-actions__link-homepage']} href={'/home'}>
                На главную
            </Link>
        </div>
    );
}