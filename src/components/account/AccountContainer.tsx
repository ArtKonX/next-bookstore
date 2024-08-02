'use client';

import { dmSerifDisplay400 } from '@/styles/fonts-project/fonts';
import styles from './AccountContainer.module.scss';

import AccountInfo from './accountInfo/AccountInfo';
import AccountActions from './accountActions/AccountActions';
import { useAuthGuard } from '@/hooks/useAuthGuard';

import { useRouter } from 'next/navigation';

export default function AccountContainer() {

    const { isAuthenticated } = useAuthGuard();

    const router = useRouter();

    if (!isAuthenticated) router.push('/home')

    return (
        <div className={styles['account']}>
            <div className={`${dmSerifDisplay400.className} ${styles['account-block']}`}>
                <AccountInfo />
                <AccountActions />
            </div>
        </div>
    );
}