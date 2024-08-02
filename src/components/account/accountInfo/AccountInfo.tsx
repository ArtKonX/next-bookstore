import { useEffect, useState } from 'react';
import styles from './AccountInfo.module.scss';
import { useSession } from "next-auth/react";
import { getRoleAndBalance } from '@/utils/apiUtils/apiRequests';

import IAccountInfo from '@/interfaces/account.interface';

export default function AccountInfo() {

    const { data: session } = useSession();

    const [infoAccount, setInfoAccount] = useState<IAccountInfo>();

    useEffect(() => {
        const fetchInfoAccount = async () => setInfoAccount(await getRoleAndBalance())
        if (fetchInfoAccount) fetchInfoAccount()
    }, []);

    return (
        <div className={styles['account-info']}>
            <h1 className={styles['account-info__title']}>Информация о Вашем аккаунте:</h1>
            <span className={styles['account-info__info-about-user']}>Ваше имя: {session?.user?.name}</span>
            <span className={styles['account-info__info-about-user']}>Ваша электронная почта: {session?.user?.email}</span>
            <span className={styles['account-info__info-about-user']}>Ваша роль: {infoAccount?.role}</span>
            <span className={styles['account-info__info-about-user']}>Ваш баланс: {infoAccount?.role !== 'admin' ? infoAccount?.balance.toFixed(2) : infoAccount?.balance} руб.</span>
        </div>
    );
}