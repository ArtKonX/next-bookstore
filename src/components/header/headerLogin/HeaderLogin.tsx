'use client';

import styles from './HeaderLogin.module.scss';
import LoginLogoutButton from './loginLogoutButton/LoginLogoutButton';
import UserLoginName from './userLoginName/UserLoginName';
import { useSession } from 'next-auth/react';
import UserNumberReminders from '@/components/header/headerLogin/userNumberReminders/UserNumberReminders';

import UserBalance from './userBalance/UserBalance';

export default function HeaderAccount() {

    const { data: session } = useSession();

    return (
        <div className={styles['header']}>
            {session && (<><UserLoginName /><UserNumberReminders/> <UserBalance/></>)}
            <LoginLogoutButton />
        </div>
    )
}