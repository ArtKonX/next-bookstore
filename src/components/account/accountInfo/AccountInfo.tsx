import { useContext, useEffect, useState } from 'react';
import styles from './AccountInfo.module.scss';
import { useSession } from "next-auth/react";

import { AccountContext } from '../../../providers/accountContext/AccountContext';


export default function AccountInfo() {

    const { data: session } = useSession();

    const infoAccount = useContext(AccountContext);

    return (
        <div className={styles['account-info']}>
            <h1 className={styles['account-info__title']}>Информация о Вашем аккаунте:</h1>
            <span className={styles['account-info__info-about-user']}>Ваше имя: {session?.user?.name}</span>
            <span className={styles['account-info__info-about-user']}>Ваша электронная почта: {session?.user?.email}</span>
            {!infoAccount ? <span>loading...</span> : (<><span className={styles['account-info__info-about-user']}>Ваша роль: {infoAccount?.role}</span>
                <span className={styles['account-info__info-about-user']}>Ваш баланс: {infoAccount?.role !== 'admin' ? infoAccount?.balance.toFixed(2) : infoAccount?.balance} руб.</span></>)}
        </div>
    );
}